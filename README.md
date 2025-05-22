# ⚗️ Film Timer

![example workflow](https://github.com/stikoandreas/film-timer/actions/workflows/deploy_pages.yml/badge.svg)
![example workflow](https://github.com/stikoandreas/film-timer/actions/workflows/npm_test.yml/badge.svg)

An online timer for developing film.

You can find it here:
<https://stikoandreas.github.io/film-timer/>

✨ Features:

- Custom recipes
- Audio alerts for agitation
- Volume calculator

📱 Phone support:

- Touch friendly interface
- Screen wake lock
- Audio does not pause your current music or podcast

## Running locally

### npm scripts

### Build and dev scripts

- `dev` – start development server
- `build` – build production version of the app
- `preview` – locally preview production build

#### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `vitest` – runs vitest tests
- `vitest:watch` – starts vitest watch
- `test` – runs `vitest`, `prettier:check`, `lint` and `typecheck` scripts

#### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier
