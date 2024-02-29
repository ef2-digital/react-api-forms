import cx from "classnames";
import { useFormContext, get, FieldError, Controller } from "react-hook-form";
import { Input, Textarea } from "@nextui-org/input";
import { Radio, RadioGroup } from "@nextui-org/radio";
import { Checkbox, CheckboxGroup } from "@nextui-org/checkbox";
import { Select, SelectItem } from "@nextui-org/select";
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
  placeholder,
  labelPlacement,
  errors,
  messages,
  control,
  setValue,
}: DynamicFieldData) => {
  const { register } = useFormContext();

  const className = cx(
    classNames[type] ?? "",
    config?.ui?.classNames,
    "w-full"
  );

  const error = get(errors, name) as FieldError;
  const errorMessage = messages && error && sprintf(messages[error.type], name);

  const controlProps = {
    name: name,
    control: control,
    rules: {
      required: Boolean(config?.required),
    },
  };

  const inputProps = {
    isInvalid: Boolean(error),
    errorMessage: Boolean(error) && errorMessage,
    variant,
    radius,
    placeholder,
    labelPlacement: labelPlacement ?? LabelPlacementEnum.Outside,
    type,
    label,
  };

  const handleChange = ([selectedValue]: any) => {
    setValue(name, selectedValue);
  };

  switch (type) {
    case "text":
      return (
        <Input
          aria-label={label}
          {...inputProps}
          {...register(name, { required: config?.required })}
          defaultValue={defaultValue}
          classNames={{
            label: `${classNames?.label} ${
              config?.ui?.hideLabel ? "md:hidden md:mb-0" : ""
            } `,
            input: classNames?.text,
            inputWrapper: classNames?.inputWrapper,
            errorMessage: classNames?.error,
          }}
        />
      );

    case "email":
      return (
        <Input
          aria-label={label}
          {...inputProps}
          {...register(name, {
            required: config?.required,
          })}
          defaultValue={defaultValue}
          classNames={{
            label: `${classNames?.label} ${
              config?.ui?.hideLabel ? "md:hidden md:mb-0" : ""
            } `,
            input: classNames?.text,
            inputWrapper: classNames?.inputWrapper,
            errorMessage: classNames?.error,
          }}
        />
      );

    case "number":
      return (
        <Input
          aria-label={label}
          {...inputProps}
          {...register(name, { required: config?.required })}
          defaultValue={defaultValue}
          classNames={{
            label: `${classNames?.label} ${
              config?.ui?.hideLabel ? "md:hidden md:mb-0" : ""
            } `,
            input: classNames?.text,
            inputWrapper: classNames?.inputWrapper,
            errorMessage: classNames?.error,
          }}
        />
      );

    case "checkbox":
      return (
        <>
          <Controller
            {...controlProps}
            render={({ field: { onChange, onBlur, value } }) => (
              <CheckboxGroup
                aria-label={label}
                {...inputProps}
                onBlur={onBlur}
                onChange={onChange}
              >
                {options.map((o, index) => (
                  <Checkbox
                    key={`${name}-${index}`}
                    value={o.value}
                    isSelected={value}
                  >
                    {o.label}
                  </Checkbox>
                ))}
              </CheckboxGroup>
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
              <RadioGroup {...inputProps} onBlur={onBlur} onChange={onChange}>
                {options.map((o, index) => (
                  <Radio key={`${name}-${index}`} value={o.label}>
                    {o.label}
                  </Radio>
                ))}
              </RadioGroup>
            )}
          />
        </>
      );

    case "textarea":
      return (
        <Textarea
          aria-label={label}
          {...inputProps}
          {...register(name, config)}
          defaultValue={defaultValue}
          className={className}
          classNames={{
            label: classNames?.label,
            input: classNames?.text,
            inputWrapper: classNames?.inputWrapper,
            base: classNames?.textarea,
            errorMessage: classNames?.error,
          }}
        />
      );
    case "select": {
      return (
        <Controller
          {...controlProps}
          render={({ field: { onChange, onBlur, value } }) => (
            <Select
              aria-label={label}
              selectedKeys={value ? [value] : []}
              {...register(name, config)}
              {...inputProps}
              id={name}
              className={className}
              onBlur={onBlur}
              onSelectionChange={handleChange}
              onChange={onChange}
              classNames={{
                selectorIcon: classNames?.selectorIcon,
                trigger: `${Boolean(error) ? "border-danger" : ""} ${
                  classNames?.inputWrapper
                }`,
              }}
            >
              {options.map((o) => (
                <SelectItem key={o.label}>{o.label}</SelectItem>
              ))}
            </Select>
          )}
        />
      );
    }

    case "file":
      return (
        <input
          type="file"
          {...register(name, config)}
          defaultValue={defaultValue}
          className={className}
        />
      );
    default:
      return <></>;
  }
};
