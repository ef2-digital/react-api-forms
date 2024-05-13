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
  label?: string;
  error?: string;
  text?: string;
  email?: string;
  number?: string;
  select?: string;
  checkbox?: string;
  checkboxGroup?: string;
  checkboxLabel?: string;
  file?: string;
  radio?: string;
  radioWrapper?: string;
  radioLabel?: string;
  button?: string;
  textarea?: string;
  selectorIcon?: string;
  fileWrapper?: string;
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

export const enum ColorEnum {
  Default = "default",
  Primary = "primary",
  Secondary = "secondary",
  Success = "success",
  Warning = "warning",
  Danger = "danger",
}

export const enum VariantEnum {
  Flat = "flat",
  Bordered = "bordered",
  Underlined = "underlined",
  Faded = "faded",
}

export const enum RadiusEnum {
  Full = "full",
  Large = "lg",
  Medium = "md",
  Small = "sm",
  None = "none",
}

export const enum SizeEnum {
  Large = "lg",
  Medium = "md",
  Small = "sm",
}

export const enum LabelPlacementEnum {
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
  fields: DynamicFieldData[];
  classNames?: FieldClassNames;
  endpoint: string;
  SubmitButton?: ReactNode;
  nextUi?: UiSettingProps;
  renders?: Renders;
  icons?: Icons;
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
