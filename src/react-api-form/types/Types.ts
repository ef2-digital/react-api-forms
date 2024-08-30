import classNames from "classnames";
import { PropsWithChildren, ReactNode } from "react";
import {
  Control,
  FieldValues,
  RegisterOptions,
  SubmitHandler,
} from "react-hook-form";

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

export interface FieldClassNames {
  errorWrapper?: string;
  successWrapper?: string;
  fieldsWrapper?: string;
  fieldWrapper?: string;
  inputWrapper?: string;
  file?: string;
  fileWrapper?: string;
  button?: string;
  label?: string;
  uiClassNames?: {
    textarea?: {
      [K in
        | "base"
        | "label"
        | "inputWrapper"
        | "innerWrapper"
        | "input"
        | "description"
        | "errorMessage"]?: string;
    };
    itemClasses?: {
      [K in
        | "base"
        | "wrapper"
        | "title"
        | "description"
        | "selectedIcon"]?: string;
    };
    listBox?: {
      [K in "base" | "list" | "emptyContent"]?: string;
    };
    input?: {
      [K in
        | "base"
        | "label"
        | "inputWrapper"
        | "innerWrapper"
        | "mainWrapper"
        | "input"
        | "clearButton"
        | "helperWrapper"
        | "description"
        | "errorMessage"]?: string;
    };
    checkbox?: {
      [K in "base" | "wrapper" | "icon" | "label"]?: string;
    };
    radio?: {
      [K in
        | "base"
        | "wrapper"
        | "labelWrapper"
        | "label"
        | "control"
        | "description"]?: string;
    };
    radioGroup?: {
      [K in "base" | "wrapper" | "label"]?: string;
    };
    checkboxGroup?: {
      [K in "base" | "wrapper" | "label"]?: string;
    };
    select?: {
      [K in
        | "base"
        | "label"
        | "trigger"
        | "mainWrapper"
        | "innerWrapper"
        | "selectorIcon"
        | "value"
        | "listboxWrapper"
        | "listbox"
        | "popoverContent"
        | "helperWrapper"
        | "description"
        | "errorMessage"]?: string;
    };
  };
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
  variant?: VariantEnum;
  radius?: RadiusEnum;
  size?: SizeEnum;
  labelPlacement?: LabelPlacementEnum;
  color?: ColorEnum;
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

export enum ColorEnum {
  Default = "default",
  Primary = "primary",
  Secondary = "secondary",
  Success = "success",
  Warning = "warning",
  Danger = "danger",
}

export enum VariantEnum {
  Flat = "flat",
  Bordered = "bordered",
  Underlined = "underlined",
  Faded = "faded",
}

export enum RadiusEnum {
  Full = "full",
  Large = "lg",
  Medium = "md",
  Small = "sm",
  None = "none",
}

export enum SizeEnum {
  Large = "lg",
  Medium = "md",
  Small = "sm",
}

export enum LabelPlacementEnum {
  Inside = "inside",
  Outside = "outside",
  OutsideLeft = "outside-left",
}

export type UiSettingProps = {
  variant?: VariantEnum;
  radius?: RadiusEnum;
  labelPlacement?: LabelPlacementEnum;
  classNames?: string;
  color: ColorEnum;
  size: SizeEnum;
};

export interface FormProps extends PropsWithChildren {
  formId: string;
  locale?: string;
  classNames?: FieldClassNames;
  endpoint: string;
  SubmitButton?: ReactNode;
  nextUi?: UiSettingProps;
  renders?: Renders;
  icons?: Icons;
  givenFields?: string;
  givenMessages?: Messages;
}

export interface InputProps {
  size?: SizeEnum;
  isInvalid: boolean;
  errorMessage?: string | boolean;
  variant?: VariantEnum;
  radius?: RadiusEnum;
  color?: ColorEnum;
  placeholder?: string;
  labelPlacement?: LabelPlacementEnum;
  type: ControlType;
  label: string;
  control?: Control<any>;
  classNames?: FieldClassNames;
  name?: string;
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

export declare interface Renders {
  renderSubmitButton?: ({
    handleSubmit,
    isSubmitting,
  }: {
    handleSubmit: SubmitHandler<FieldValues>;
    isSubmitting: boolean;
  }) => ReactNode;
  renderSelect?: ({
    inputProps,
    classNames,
    label,
    controlProps,
    placeholder,
    errorMessage,
    options,
  }: {
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
    options: SelectOption[];
  }) => ReactNode;
  renderFileInput?: ({
    inputProps,
    classNames,
    label,
    controlProps,
    placeholder,
    errorMessage,
  }: {
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
  }) => ReactNode;
}
