# react-api-forms

A React form renderer, published to npm as `react-api-forms`. It reads a form definition from a
Strapi API-forms plugin and posts the submission back. The NAPA multidomain site
(`ef2-digital/napa`, `apps/web`, `components/strapi/StrapiFormChooser.tsx`) is the consumer we
know of.

## Run and test

Yarn 1 (`packageManager` in `package.json`).

```bash
yarn install
yarn dev
yarn build
yarn lint
```

`dev` serves `src/main.tsx`. `build` writes the library and its type declarations to `dist/`.

## How it talks to the CMS

- `GET <endpoint>/api/api-forms/fields/<formId>` returns the fields; a consumer can also pass them
  in as `givenFields`, which skips that request.
- `POST <endpoint>/api/api-forms/submission/post` sends `form`, `submission` (JSON) and any files as
  multipart form data. A hidden `honeypot` field is always rendered.
- Radio and select options submit their label, not their value, as earlier versions did.
- The built-in messages are de, en, fr and nl (`src/react-api-form/messages/`), loaded per locale.

## Styling

Since 2.0.0 the fields are HeroUI 3 components (`@heroui/react`) styled with Tailwind 4. One
`classNames` object styles every field type by part: `field`, `label`, `input`, `description`,
`error`, `option`, `control`, `optionLabel`, `popover`, `button` and the wrappers. The classes are
added to HeroUI's own; a Tailwind `!` wins over them. The field widths set in the CMS
(25 to 100 percent) are applied on the field wrapper.

A consumer has to generate those classes: its CSS needs
`@source '../node_modules/react-api-forms/dist';` and `@import '@heroui/styles';`. Without the
`@source` line the layout classes silently do not exist, which is how NAPA ran for years without
the CMS widths.

## Releases

Nothing publishes from CI; somebody with publish rights runs `npm publish` from a clean `build`
after the merge. The `version` on `main` has lagged behind npm (1.5.0 committed, 1.5.5
published), so read `npm view react-api-forms version` before picking the next one.

## Proving a change

Build here, then try it in the consumer before publishing. Copy `dist/` into the consumer's
`node_modules/react-api-forms/dist` and build the consumer. A `file:` tarball is less reliable:
Yarn 1 in the consumer reuses a cached tarball with the same name and version, so a rebuilt
package can install as the old one.

## Branches and pull requests

Open pull requests against `main`. Someone from CS reviews. No `Co-Authored-By` trailers and no
"Generated with" lines.
