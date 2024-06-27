import cx from "classnames";
import {
  useFormContext,
  get,
  FieldError,
  Controller,
  RegisterOptions,
} from "react-hook-form";
import { Radio, RadioGroup } from "@nextui-org/radio";
import { Checkbox, CheckboxGroup } from "@nextui-org/checkbox";
import { Select, SelectItem } from "@nextui-org/select";
import { FileInput, TextareaInput, TextInput } from "./fields";
import { sprintf } from "../utils/helpers";

import {
  DynamicFieldData,
  FieldClassNames,
  LabelPlacementEnum,
} from "../types/Types";

export const DynamicControl = ({
  type,
  name,
  label,
  defaultValue,
  options = [],
  config,
  classNames = {} as FieldClassNames,
  variant,
  radius,
  color,
  size,
  placeholder,
  labelPlacement,
  errors,
  messages,
  control,
  setValue,
  description,
  renders,
  icons,
}: DynamicFieldData) => {
  const { register } = useFormContext();

  const className = cx(config?.ui?.classNames, "w-full");

  const error = get(errors, name) as FieldError;
  //@ts-ignore
  const errorMessage = messages && error && sprintf(messages[error.type], name);

  const rules: RegisterOptions = {
    required: Boolean(config?.required),
  };

  if (type === "email") {
    rules.pattern = {
      value: /\S+@\S+\.\S+/,
      message: messages?.email!,
    };
  }

  const controlProps = {
    name,
    control,
    rules,
  };

  const inputProps = {
    isInvalid: Boolean(error),
    size,
    variant,
    radius,
    color,
    placeholder,
    type,
    label,
    description,
    name,
  };

  const handleChange = ([selectedValue]: any) => {
    setValue(name, selectedValue);
  };

  switch (type) {
    case "text":
    case "email":
    case "number":
      return (
        <TextInput
          {...inputProps}
          labelPlacement={labelPlacement ?? LabelPlacementEnum.Outside}
          {...controlProps}
          label={label}
          placeholder={placeholder}
          defaultValue={defaultValue}
          classNames={classNames}
          register={register}
          errorMessage={(Boolean(error) && errorMessage) ?? ""}
        />
      );

    case "textarea":
      return (
        <TextareaInput
          {...inputProps}
          {...controlProps}
          label={label}
          placeholder={placeholder}
          labelPlacement={labelPlacement ?? LabelPlacementEnum.Outside}
          defaultValue={defaultValue}
          classNames={classNames}
          register={register}
          errorMessage={(Boolean(error) && errorMessage) ?? ""}
        />
      );

    case "checkboxGroup":
      return (
        <>
          <Controller
            {...controlProps}
            render={({ field: { onChange, onBlur, value } }) => (
              <CheckboxGroup
                classNames={classNames.uiClassNames?.checkboxGroup}
                aria-label={label}
                {...inputProps}
                onBlur={onBlur}
                onChange={onChange}
                errorMessage={(Boolean(error) && errorMessage) ?? ""}
              >
                {options.map((o, index) => (
                  <Checkbox
                    key={`${name}-${index}`}
                    value={o.value}
                    isSelected={value}
                    classNames={classNames.uiClassNames?.checkbox}
                    icon={icons?.CheckboxSvg}
                  >
                    {o.label}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            )}
          />
        </>
      );

    case "checkbox":
      return (
        <>
          <Controller
            {...controlProps}
            render={({ field: { onChange, onBlur, value } }) => (
              <Checkbox
                key={`${name}-${value}`}
                value={value}
                isSelected={value}
                classNames={classNames.uiClassNames?.checkbox}
                aria-label={label}
                {...inputProps}
                onBlur={onBlur}
                onChange={onChange}
                icon={icons?.CheckboxSvg}
              >
                {label}
              </Checkbox>
            )}
          />
        </>
      );

    case "radio":
      return (
        <>
          <Controller
            {...controlProps}
            render={({ field: { onChange, onBlur, value } }) => (
              <RadioGroup
                {...inputProps}
                onBlur={onBlur}
                onChange={onChange}
                classNames={classNames.uiClassNames?.radioGroup}
              >
                {options.map((o, index) => (
                  <Radio
                    key={`${name}-${index}`}
                    value={o.label}
                    classNames={classNames.uiClassNames?.radio}
                  >
                    {o.label}
                  </Radio>
                ))}
              </RadioGroup>
            )}
          />
        </>
      );
    case "select": {
      return (
        (renders?.renderSelect &&
          renders.renderSelect({
            inputProps,
            classNames,
            label,
            controlProps,
            placeholder,
            errorMessage,
            options,
          })) ?? (
          <Controller
            {...controlProps}
            render={({ field: { onChange, onBlur, value } }) => (
              <Select
                aria-label={label}
                selectedKeys={value ? [value] : []}
                {...register(name, config)}
                {...inputProps}
                className={className}
                onBlur={onBlur}
                onSelectionChange={handleChange}
                onChange={onChange}
                classNames={classNames.uiClassNames?.select}
              >
                {options.map((o) => (
                  <SelectItem
                    classNames={classNames.uiClassNames?.listBox}
                    key={o.label}
                  >
                    {o.label}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
        )
      );
    }

    case "file":
      return (
        (renders?.renderFileInput &&
          renders.renderFileInput({
            inputProps,
            classNames,
            label,
            controlProps,
            placeholder,
            errorMessage,
          })) ?? (
          <FileInput
            {...inputProps}
            classNames={classNames}
            label={label}
            {...controlProps}
            placeholder={placeholder ?? messages?.file}
          />
        )
      );
    default:
      return <></>;
  }
};
