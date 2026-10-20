import cx from "classnames";
import {
  Controller,
  FieldError as FormFieldError,
  RegisterOptions,
  get,
} from "react-hook-form";
import {
  Checkbox,
  CheckboxGroup,
  FieldError,
  Label,
  ListBox,
  Radio,
  RadioGroup,
  Select,
} from "@heroui/react";
import { FileInput, TextareaInput, TextInput } from "./fields";
import { sprintf } from "../utils/helpers";
import { DynamicFieldData, FieldClassNames, InputProps } from "../types/Types";

const CheckboxOption = ({
  value,
  label,
  classNames,
  icon,
}: {
  value?: string;
  label: string;
  classNames: FieldClassNames;
  icon?: React.ReactNode;
}) => (
  <Checkbox value={value} className={classNames.option}>
    <Checkbox.Content>
      <Checkbox.Control className={classNames.control}>
        <Checkbox.Indicator>{icon}</Checkbox.Indicator>
      </Checkbox.Control>
      <Label className={classNames.optionLabel}>{label}</Label>
    </Checkbox.Content>
  </Checkbox>
);

export const DynamicControl = ({
  type,
  name,
  label,
  defaultValue,
  options = [],
  config,
  classNames = {} as FieldClassNames,
  placeholder,
  errors,
  messages,
  control,
  description,
  renders,
  icons,
}: DynamicFieldData) => {
  const error = get(errors, name) as FormFieldError | undefined;
  const errorMessage =
    (messages && error && sprintf(messages[error.type as keyof typeof messages] ?? "", name)) || "";

  const rules: RegisterOptions = {
    required: Boolean(config?.required),
  };

  if (type === "email") {
    rules.pattern = {
      value: /\S+@\S+\.\S+/,
      message: messages?.email!,
    };
  }

  const controlProps = { name, control, rules };

  const inputProps: InputProps = {
    isInvalid: Boolean(error),
    placeholder,
    type,
    label,
    description,
    name,
    control,
    rules,
    classNames,
    defaultValue,
    errorMessage,
  };

  const fieldClassName = cx("w-full", config?.ui?.classNames, classNames.field);
  const errorElement = <FieldError className={classNames.error}>{errorMessage}</FieldError>;

  switch (type) {
    case "text":
    case "email":
    case "number":
      return <TextInput {...inputProps} />;

    case "textarea":
      return <TextareaInput {...inputProps} />;

    case "checkboxGroup":
      return (
        <Controller
          {...controlProps}
          defaultValue={defaultValue ?? []}
          render={({ field: { onChange, onBlur, value } }) => (
            <CheckboxGroup
              name={name}
              value={value ?? []}
              onChange={onChange}
              onBlur={onBlur}
              isInvalid={Boolean(error)}
              validationBehavior="aria"
              className={fieldClassName}
            >
              <Label className={classNames.label}>{label}</Label>
              {options.map((o, index) => (
                <CheckboxOption
                  key={`${name}-${index}`}
                  value={o.value}
                  label={o.label}
                  classNames={classNames}
                  icon={icons?.CheckboxSvg}
                />
              ))}
              {errorElement}
            </CheckboxGroup>
          )}
        />
      );

    case "checkbox":
      return (
        <Controller
          {...controlProps}
          defaultValue={Boolean(defaultValue)}
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox
              name={name}
              isSelected={Boolean(value)}
              onChange={onChange}
              onBlur={onBlur}
              isInvalid={Boolean(error)}
              validationBehavior="aria"
              className={cx(fieldClassName, classNames.option)}
            >
              <Checkbox.Content>
                <Checkbox.Control className={classNames.control}>
                  <Checkbox.Indicator>{icons?.CheckboxSvg}</Checkbox.Indicator>
                </Checkbox.Control>
                <Label className={classNames.optionLabel}>{label}</Label>
              </Checkbox.Content>
              {errorElement}
            </Checkbox>
          )}
        />
      );

    case "radio":
      return (
        <Controller
          {...controlProps}
          render={({ field: { onChange, onBlur, value } }) => (
            <RadioGroup
              name={name}
              value={value ?? null}
              onChange={onChange}
              onBlur={onBlur}
              isInvalid={Boolean(error)}
              validationBehavior="aria"
              className={fieldClassName}
            >
              <Label className={classNames.label}>{label}</Label>
              {options.map((o, index) => (
                // The label is the submitted value, as in earlier versions of this package.
                <Radio key={`${name}-${index}`} value={o.label} className={classNames.option}>
                  <Radio.Content>
                    <Radio.Control className={classNames.control}>
                      <Radio.Indicator />
                    </Radio.Control>
                    <Label className={classNames.optionLabel}>{o.label}</Label>
                  </Radio.Content>
                </Radio>
              ))}
              {errorElement}
            </RadioGroup>
          )}
        />
      );

    case "select":
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
                name={name}
                aria-label={label}
                placeholder={placeholder}
                value={value ?? null}
                onChange={(key) => onChange(key)}
                onBlur={onBlur}
                isInvalid={Boolean(error)}
                validationBehavior="aria"
                className={fieldClassName}
              >
                <Label className={classNames.label}>{label}</Label>
                <Select.Trigger className={classNames.input}>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className={classNames.popover}>
                  <ListBox>
                    {options.map((o) => (
                      // The label is the submitted value, as in earlier versions of this package.
                      <ListBox.Item key={o.label} id={o.label} textValue={o.label} className={classNames.option}>
                        {o.label}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
                {errorElement}
              </Select>
            )}
          />
        )
      );

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
          })) ?? <FileInput {...inputProps} placeholder={placeholder ?? messages?.file} />
      );

    default:
      return <></>;
  }
};
