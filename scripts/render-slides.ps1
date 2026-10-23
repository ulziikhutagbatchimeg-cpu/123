# Renders every slide of the IGCSE deck files to JPG, so the Student area can show the slides without giving out the .pptx.
# Needs Microsoft PowerPoint on this computer. The .pptx files are opened read-only and are never changed.
# Run again after a teacher edits a deck: the previews of that deck are rebuilt from scratch.
param(
  [string]$DeckDir = (Join-Path $PSScriptRoot '..\public\slides\igcse-0620'),
  [int]$Width = 1280,
  [int]$Height = 720
)

$ErrorActionPreference = 'Stop'
$deckDir = (Resolve-Path -LiteralPath $DeckDir).Path
$previewRoot = Join-Path $deckDir 'previews'
New-Item -ItemType Directory -Path $previewRoot -Force | Out-Null

$app = New-Object -ComObject PowerPoint.Application
try {
  foreach ($deck in Get-ChildItem -LiteralPath $deckDir -Filter *.pptx | Sort-Object Name) {
    $name = [System.IO.Path]::GetFileNameWithoutExtension($deck.Name)
    $outDir = Join-Path $previewRoot $name
    if (Test-Path -LiteralPath $outDir) { Remove-Item -LiteralPath $outDir -Recurse -Force }
    New-Item -ItemType Directory -Path $outDir | Out-Null

    # Open(FileName, ReadOnly, Untitled, WithWindow): read-only, no window
    $pres = $app.Presentations.Open($deck.FullName, $true, $false, $false)
    try {
      for ($i = 1; $i -le $pres.Slides.Count; $i++) {
        $pres.Slides.Item($i).Export((Join-Path $outDir ('{0:D2}.jpg' -f $i)), 'JPG', $Width, $Height)
      }
      "${name}: $($pres.Slides.Count) slides"
    } finally {
      $pres.Close()
    }
  }
} finally {
  $app.Quit()
}
