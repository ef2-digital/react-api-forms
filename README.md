# react-api-forms

A React form renderer for the Strapi API-forms plugin. It reads a form definition from the CMS,
renders its fields and posts the submission back.

## Installation (2.x)

2.x runs on React 19 and HeroUI 3, styled with Tailwind 4. HeroUI's own peer dependencies have to
be installed by the consumer as well, because Yarn 1 does not install peers by itself:

```bash
yarn add react-api-forms@2 @heroui/react @heroui/styles \
  react-aria-components react-aria @internationalized/date @react-aria/ssr @react-aria/utils
```

In the Tailwind 4 stylesheet of the consumer:

```css
@import 'tailwindcss';
@import '@heroui/styles';
@source '../node_modules/react-api-forms/dist';
```

The `@source` path is relative to the stylesheet. Without that line the layout classes of this
package (field widths, the submit button) are never generated, and nothing reports an error.

## Usage

```tsx
import { ReactApiForm } from 'react-api-forms';

<ReactApiForm
    endpoint="https://cms.example.com"
    formId="3"
    locale="fr"
    classNames={{
        label: 'mb-2 block font-bold',
        input: 'w-full rounded-sm border border-black px-4 py-3',
        control: 'rounded-sm border border-black',
        error: 'mt-1 text-xs text-danger',
    }}
/>;
```

- `endpoint` is the CMS base URL. The fields come from `GET <endpoint>/api/api-forms/fields/<formId>`,
  unless they are passed in as `givenFields` (the JSON string the CMS stores).
- The submission goes to `POST <endpoint>/api/api-forms/submission/post` as multipart form data.
- `locale` picks the built-in messages: de, en, fr or nl, matched on the language part
  (`fr-BE` gets French), and English for any other language. `givenMessages` replaces them; set
  `error` there too, it is shown when the CMS refuses the submission.
- `renders.renderSubmitButton`, `renders.renderSelect` and `renders.renderFileInput` replace the
  default submit button, select and file field.

### classNames

One set of classes styles every field type, by part. The classes are added to HeroUI's own; a
Tailwind `!` wins over them.

| Key | Applies to |
| --- | --- |
| `fieldsWrapper`, `fieldWrapper` | the list of fields, and the wrapper around each field |
| `field` | the root of a field: text field, select, checkbox group, radio group |
| `label` | the label of a field |
| `input` | the control people type in or open: input, textarea, select trigger |
| `description`, `error` | the help text and the error message of a field |
| `option`, `control`, `optionLabel` | one checkbox or radio option, its box or circle, its text |
| `popover` | the popover with the options of a select |
| `fileWrapper`, `button` | the file field, and the submit button |
| `errorWrapper`, `successWrapper` | the message shown after a submission |

## Upgrading from 1.x

- `nextUi` (variant, radius, labelPlacement, color, size) and the enums behind it are gone; the
  look comes from HeroUI's styles plus `classNames`.
- `uiClassNames` is gone. Its per-component keys map onto the shared keys above:

| 1.x | 2.x |
| --- | --- |
| `uiClassNames.input.base`, `textarea.base`, `select.base`, `radioGroup.base`, `checkboxGroup.base` | `field` |
| `label`, `uiClassNames.*.label` of a field | `label` |
| `uiClassNames.input.inputWrapper`, `input.input`, `textarea.inputWrapper`, `textarea.input`, `select.trigger` | `input` |
| `uiClassNames.*.description` | `description` |
| `uiClassNames.*.errorMessage` | `error` |
| `uiClassNames.checkbox.base`, `radio.base`, `itemClasses.base` | `option` |
| `uiClassNames.checkbox.wrapper`, `radio.wrapper`, `radio.control` | `control` |
| `uiClassNames.checkbox.label`, `radio.label` | `optionLabel` |
| `uiClassNames.select.popoverContent`, `select.listbox`, `listBox.base` | `popover` |
| `inputWrapper`, `file` | removed; 1.x did not use them |

- The field widths set in the CMS (25 to 100 percent) only appear when the `@source` line is in
  place. A consumer that did not scan this package before never showed them; to keep every field
  on its own row, pass `fieldWrapper: 'w-full!'`.
- `renders.renderSubmitButton` receives `handleSubmit` already bound to the fields, typed as
  `(e?) => Promise<void>`.
