import { PropsWithChildren, ReactNode } from "react";
import { Control, RegisterOptions } from "react-hook-form";

export type ControlType =
  | "text"
  | "select"
  | "number"
  | "checkbox"
  | "file"
  | "email"
  | "radio"
  | "textarea";

export interface SelectOption {
  label: string;
  value: string;
}

export interface FieldClassNames {
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
  file?: string;
  radio?: string;
  radioWrapper?: string;
  button?: string;
  textarea?: string;
  selectorIcon?: string;
}

export interface DynamicFieldData {
  label: string;
  placeholder?: string;
  type: ControlType;
  name: string;
  defaultValue: any;
  classNames?: FieldClassNames;
  options?: SelectOption[];
  config?: RegisterOptions & { ui: { [key: string]: any } };
  variant?: VariantEnum;
  radius?: RadiusEnum;
  labelPlacement?: LabelPlacementEnum;
  errors?: any;
  messages?: any;
  control: Control<any>;
  setValue?: any;
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
};

export interface FormProps extends PropsWithChildren {
  messages: { [key: string]: string };
  formId: string;
  fields: DynamicFieldData[];
  classNames?: FieldClassNames;
  endpoint: string;
  SuccessMessage: ReactNode;
  ErrorMessage: ReactNode;
  nextUi: UiSettingProps;
}
