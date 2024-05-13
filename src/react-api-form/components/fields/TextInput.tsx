import { FieldValues, UseFormRegister } from "react-hook-form";
import { InputProps } from "../../types/Types";
import { Input } from "@nextui-org/input";

interface TextInputProps extends InputProps {
  register: UseFormRegister<FieldValues>;
  hideLabel?: boolean;
}

const TextInput = ({
  isInvalid,
  type,
  name,
  errorMessage,
  radius,
  variant,
  color,
  placeholder,
  labelPlacement,
  label,
  rules,
  classNames,
  defaultValue,
  hideLabel,
  register,
}: TextInputProps) => {
  return (
    <Input
      {...register(name!, rules)}
      type={type}
      aria-label={label}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      variant={variant}
      radius={radius}
      color={color}
      placeholder={placeholder}
      labelPlacement={labelPlacement}
      label={label}
      defaultValue={defaultValue}
      classNames={{
        label: `${classNames?.label} ${
          (hideLabel && "md:hidden md:mb-0") ?? ""
        } `,
        input: classNames?.text,
        mainWrapper: "flex grow",
        inputWrapper: `${classNames?.inputWrapper} data-[hover=true]:border-${color}`,
        errorMessage: classNames?.error,
      }}
    />
  );
};

export default TextInput;
