# Cambridge Chemistry Study Hub

One codebase builds three course sites:

| Site | Course | `VITE_SITE_COURSE` | Slide pictures in the build |
| --- | --- | --- | --- |
| IGCSE 0620 | Cambridge IGCSE Chemistry 0620 | `igcse` | `public/slides/igcse-0620` |
| AS Level 9701 | Cambridge AS Level Chemistry 9701 | `as` | `public/slides/alevel-9701` |
| A Level 9701 | Cambridge A Level Chemistry 9701 | `a` | `public/slides/alevel-9701` |

AS and A Level share the 9701 slide pictures. Each build keeps only its own course's folder (`courseSlides` in `vite.config.ts`). A site locked to one course opens that course straight away, and shows its course name without the switch.

Measured build output: about 263 MB for IGCSE, and about 191 MB each for AS and A Level.

## Build one site locally

PowerShell:

```powershell
$env:VITE_SITE_COURSE = 'igcse'
npm run build
```

Set `VITE_SITE_COURSE` to `as` or `a` for the other two sites. Without it, the build is the full app with the course switch. That is the local development setup (`npm run dev`).

Check the TypeScript types with `npm run lint`.

## Deploy the three sites

Each site is its own GitHub repository with its own GitHub Pages address. `.github/workflows/deploy-pages.yml` builds the course named in that repository's variables, then deploys it. The workflow stops with an error if `VITE_SITE_COURSE` is set to anything other than `igcse`, `as` or `a`.

For each site repository:

1. **Secrets** (Settings → Secrets and variables → Actions → Secrets): add `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID` and `VITE_TEACHER_EMAIL`. All three sites use the same Firebase project, so the values are the same. `VITE_TEACHER_EMAIL` must match the email in `firestore.rules`.
2. **Variable** (Settings → Secrets and variables → Actions → Variables): add `VITE_SITE_COURSE` with `igcse`, `as` or `a`.
3. **Pages** (Settings → Pages → Build and deployment → Source): choose GitHub Actions.
4. **Firebase sign-in** (Firebase console → Authentication → Settings → Authorized domains): add the site's host, for example `<user>.github.io`. Without this, sign-in fails on that site.
5. Push to `main`, or run the workflow from the Actions tab.

Which repository gets which course:

- `123` (this repository): `VITE_SITE_COURSE=igcse`. Setting the variable here makes the existing GitHub Pages address show the IGCSE site only.
- A new repository for AS Level: `VITE_SITE_COURSE=as`.
- A new repository for A Level: `VITE_SITE_COURSE=a`.

To send the same code to the other repositories, add each one as a remote and push `main`:

```bash
git remote add as-site https://github.com/<user>/<as-repository>.git
git push as-site main
```

## Keep the sites in step

The three sites are built from the same code, so a change is made once and pushed to every site repository. Each site's JavaScript still contains the lesson data for all three courses; `VITE_SITE_COURSE` only decides which course the site opens and whether the course switch is shown. The slide pictures are the part that is removed from the other sites' builds.

## Project layout

- `src/` the app. `src/lib/siteCourse.ts` reads `VITE_SITE_COURSE`.
- `src/data/` the lesson, quiz and syllabus content for each course.
- `public/slides/` the slide pictures, one folder per slide set.
- `public/lessons/`, `public/tests/` the lesson and test files.
- `firestore.rules`, `storage.rules` the Firebase security rules.
- `.env.example` the variables for local development. Copy it to `.env.local` and fill it in.
