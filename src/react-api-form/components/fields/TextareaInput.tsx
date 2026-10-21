import cx from "classnames";
import { Controller } from "react-hook-form";
import { Description, FieldError, Label, TextArea, TextField } from "@heroui/react";
import { InputProps } from "../../types/Types";

const TextareaInput = ({
  isInvalid,
  name,
  errorMessage,
  placeholder,
  label,
  rules,
  control,
  classNames,
  defaultValue,
  description,
}: InputProps) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    defaultValue={defaultValue ?? ""}
    render={({ field: { onChange, onBlur, value, ref } }) => (
      <TextField
        name={name}
        value={value ?? ""}
        onChange={onChange}
        onBlur={onBlur}
        isInvalid={isInvalid}
        isRequired={Boolean(rules?.required)}
        validationBehavior="aria"
        className={cx("w-full", classNames?.field)}
      >
        <Label className={classNames?.label}>{label}</Label>
        <TextArea ref={ref} placeholder={placeholder} className={classNames?.input} />
        {description && (
          <Description className={classNames?.description}>{description}</Description>
        )}
        <FieldError className={classNames?.error}>{errorMessage}</FieldError>
      </TextField>
    )}
  />
);

export default TextareaInput;
