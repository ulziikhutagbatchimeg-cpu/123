// The pictures of each slide deck (NN-KK.jpg and manifest.json) are the copies in public/slides, which the site serves
// as static files. The pictures are kept in git as plain files (not Git LFS), so they are shipped with the site.

// The address the browser loads a picture or the manifest from
export const previewUrl = (course: string, deckFolder: string, file: string): string =>
  `${import.meta.env.BASE_URL}slides/${course}/previews/${deckFolder}/${file}`;
