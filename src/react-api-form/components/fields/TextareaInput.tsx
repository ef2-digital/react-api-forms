import { FieldValues, UseFormRegister } from "react-hook-form";
import { InputProps } from "../../types/Types";
import { Textarea } from "@nextui-org/input";

interface TextareaInputProps extends InputProps {
  register: UseFormRegister<FieldValues>;
  hideLabel?: boolean;
  description?: string;
}

const TextareaInput = ({
  isInvalid,
  name,
  errorMessage,
  radius,
  variant,
  placeholder,
  labelPlacement,
  label,
  rules,
  classNames,
  defaultValue,
  description,
  register,
}: TextareaInputProps) => {
  return (
    <>
      <Textarea
        aria-label={label}
        {...register(name!, rules)}
        isInvalid={isInvalid}
        errorMessage={errorMessage}
        variant={variant}
        radius={radius}
        placeholder={placeholder}
        labelPlacement={labelPlacement}
        label={label}
        defaultValue={defaultValue}
        description={description}
        classNames={classNames?.uiClassNames?.textarea}
      />
    </>
  );
};

export default TextareaInput;
