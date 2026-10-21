import { BaseSyntheticEvent, PropsWithChildren, ReactNode } from "react";
import { Control, RegisterOptions } from "react-hook-form";

export type ControlType =
  | "text"
  | "select"
  | "number"
  | "checkbox"
  | "checkboxGroup"
  | "file"
  | "email"
  | "radio"
  | "textarea";

export interface SelectOption {
  label: string;
  value: string;
}

/**
 * Class names per part of the form. Every field is built from the same parts (a field root, a
 * label, the control itself, a description and an error), so one set of classes styles all field
 * types. The classes are added to HeroUI's own; use Tailwind's `!` prefix to override one.
 */
export interface FieldClassNames {
  errorWrapper?: string;
  successWrapper?: string;
  fieldsWrapper?: string;
  fieldWrapper?: string;
  /** Root of a field: text field, select, checkbox group or radio group. */
  field?: string;
  label?: string;
  /** The control people type in or open: input, textarea or select trigger. */
  input?: string;
  description?: string;
  error?: string;
  /** One checkbox or radio option. */
  option?: string;
  /** The box or circle of a checkbox or radio option. */
  control?: string;
  /** The text next to a checkbox or radio option. */
  optionLabel?: string;
  /** The popover with the options of a select. */
  popover?: string;
  fileWrapper?: string;
  button?: string;
}

export interface DynamicFieldData {
  label: string;
  placeholder?: string;
  type: ControlType;
  name: string;
  defaultValue?: any;
  classNames?: FieldClassNames;
  options?: SelectOption[];
  config?: RegisterOptions & { ui: { [key: string]: any } };
  errors?: any;
  messages?: Messages;
  control?: Control<any>;
  setValue?: any;
  description?: string;
  renders?: Renders;
  icons?: Icons;
}

export interface TranslatorProps {
  key: string;
  params?: { [key: string]: string | number } | undefined;
}

export interface FormProps extends PropsWithChildren {
  formId: string;
  locale?: string;
  classNames?: FieldClassNames;
  endpoint: string;
  renders?: Renders;
  icons?: Icons;
  givenFields?: string;
  givenMessages?: Messages;
}

export interface InputProps {
  isInvalid: boolean;
  errorMessage?: string;
  placeholder?: string;
  type: ControlType;
  label: string;
  control?: Control<any>;
  classNames?: FieldClassNames;
  name: string;
  rules?: RegisterOptions;
  defaultValue?: any;
  description?: string;
}

export interface Icons {
  SubmitSvg?: ReactNode;
  FileSvg?: ReactNode;
  CheckboxSvg?: ReactNode;
}

export type Messages = {
  submit?: string;
  email?: string;
  required?: string;
  invalid?: string;
  success?: string;
  error?: string;
  honeypot?: string;
  text?: string;
  number?: string;
  select?: string;
  checkbox?: string;
  checkboxGroup?: string;
  file?: string;
  radio?: string;
  textarea?: string;
  button?: string;
  pattern?: string;
};

interface RenderFieldArguments {
  inputProps: InputProps;
  classNames: FieldClassNames;
  label: string;
  controlProps?: {
    name?: string;
    control?: Control<any>;
    rules?: RegisterOptions;
  };
  placeholder?: string;
  errorMessage?: string;
}

export declare interface Renders {
  renderSubmitButton?: ({
    handleSubmit,
    isSubmitting,
  }: {
    /** The form's submit handler, already bound to the fields: call it from a button or a form event. */
    handleSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
    isSubmitting: boolean;
  }) => ReactNode;
  renderSelect?: (args: RenderFieldArguments & { options: SelectOption[] }) => ReactNode;
  renderFileInput?: (args: RenderFieldArguments) => ReactNode;
}
