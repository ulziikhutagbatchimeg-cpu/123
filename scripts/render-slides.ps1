# Renders the slides of each IGCSE deck to JPG, one picture per click step, so the Student area can step through the
# animations with clicks. Needs Microsoft PowerPoint on this computer. The .pptx files are opened read-only; every change
# made to a shape while rendering is undone before the file is closed.
# Writes previews\<deck>\NN-KK.jpg (slide NN, step KK, starting at 00) and previews\<deck>\manifest.json.
# Run again after a teacher edits a deck: the previews of that deck are rebuilt from scratch.
param(
  # The .pptx source files stay outside the website (decks\igcse-0620). The pictures go to public, so students can see them.
  [string]$DeckDir = (Join-Path $PSScriptRoot '..\decks\igcse-0620'),
  [string]$PreviewRoot = (Join-Path $PSScriptRoot '..\public\slides\igcse-0620\previews'),
  # Optional: render only the deck whose file name starts with this text, for example Ch01
  [string]$Only = '',
  [int]$Width = 1280,
  [int]$Height = 720
)

$ErrorActionPreference = 'Stop'
$deckDir = (Resolve-Path -LiteralPath $DeckDir).Path
New-Item -ItemType Directory -Path $PreviewRoot -Force | Out-Null
# PowerPoint resolves paths from its own folder, so the picture folder must be a full path
$PreviewRoot = (Resolve-Path -LiteralPath $PreviewRoot).Path

# Reads the on-click steps of a slide. A new step starts at each "on click" effect (trigger 1). Effects that start
# with the previous or after the previous one join the current step. Step 0 is the slide as it opens.
function Get-Effects($slide) {
  $seq = $slide.TimeLine.MainSequence
  $effects = @()
  $step = 0
  for ($j = 1; $j -le $seq.Count; $j++) {
    $e = $seq.Item($j)
    if ($e.Timing.TriggerType -eq 1) { $step++ }
    $effects += [pscustomobject]@{ ShapeId = $e.Shape.Id; Shape = $e.Shape; Step = $step; Exit = [bool]($e.Exit -ne 0) }
  }
  return ,$effects
}

# Which shapes are visible after a given step. An entrance effect shows its shape from its step on; an exit effect hides it.
function Get-Visibility($effects, $shapeIds, $enterIds, $k) {
  $vis = @{}
  foreach ($id in $shapeIds) { $vis[$id] = -not $enterIds.ContainsKey($id) }
  foreach ($ef in $effects) {
    if ($ef.Step -le $k) { $vis[$ef.ShapeId] = -not $ef.Exit }
  }
  return $vis
}

$app = New-Object -ComObject PowerPoint.Application
try {
  foreach ($deck in Get-ChildItem -LiteralPath $deckDir -Filter *.pptx | Sort-Object Name) {
    $name = [System.IO.Path]::GetFileNameWithoutExtension($deck.Name)
    if ($Only -ne '' -and -not $name.StartsWith($Only)) { continue }
    $outDir = Join-Path $PreviewRoot $name
    if (Test-Path -LiteralPath $outDir) { Remove-Item -LiteralPath $outDir -Recurse -Force }
    New-Item -ItemType Directory -Path $outDir | Out-Null

    # Open(FileName, ReadOnly, Untitled, WithWindow): read-only, no window
    $pres = $app.Presentations.Open($deck.FullName, $true, $false, $false)
    $slideSteps = @()
    try {
      for ($i = 1; $i -le $pres.Slides.Count; $i++) {
        $slide = $pres.Slides.Item($i)
        $effects = Get-Effects $slide
        $shapeMap = @{}
        $enterIds = @{}
        foreach ($ef in $effects) {
          $shapeMap[$ef.ShapeId] = $ef.Shape
          if (-not $ef.Exit) { $enterIds[$ef.ShapeId] = $true }
        }
        $original = @{}
        foreach ($id in $shapeMap.Keys) { $original[$id] = $shapeMap[$id].Visible }
        $maxStep = 0
        foreach ($ef in $effects) { if ($ef.Step -gt $maxStep) { $maxStep = $ef.Step } }

        try {
          for ($k = 0; $k -le $maxStep; $k++) {
            $vis = Get-Visibility $effects @($shapeMap.Keys) $enterIds $k
            foreach ($id in $shapeMap.Keys) { $shapeMap[$id].Visible = $(if ($vis[$id]) { -1 } else { 0 }) }
            $file = '{0:D2}-{1:D2}.jpg' -f $i, $k
            $slide.Export((Join-Path $outDir $file), 'JPG', $Width, $Height)
          }
        } finally {
          foreach ($id in $shapeMap.Keys) { $shapeMap[$id].Visible = $original[$id] }
        }
        $slideSteps += [ordered]@{ slide = $i; steps = $maxStep + 1 }
      }
      $manifest = [ordered]@{ deck = $name; slides = $slideSteps }
      $manifest | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath (Join-Path $outDir 'manifest.json') -Encoding utf8
      $pictures = 0
      foreach ($s in $slideSteps) { $pictures += $s.steps }
      "${name}: $($pres.Slides.Count) slides, $pictures pictures"
    } finally {
      $pres.Close()
    }
  }
} finally {
  $app.Quit()
}
