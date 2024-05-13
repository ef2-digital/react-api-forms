import cx from "classnames";
import { InputProps } from "../../types/Types";
import { Controller } from "react-hook-form";
import { Button } from "@nextui-org/button";

const FileInput = ({
  isInvalid,
  name,
  control,
  errorMessage,
  radius,
  placeholder,
  label,
  rules,
  classNames,
}: InputProps) => {
  return (
    <div>
      <label
        className={cx(
          "flex flex-col shadow-sm transition-all duration-200 items-center border-2 border-dashed bg-white p-4 hover:cursor-pointer",
          `rounded-${radius} ${classNames?.fileWrapper}`,
          "hover:border-primary-500",
          { "border-danger": !!isInvalid }
        )}
      >
        <span
          className={`${
            classNames?.label ?? "text-sm  text-primary/40"
          } self-start`}
        >
          {label}
        </span>
        <Button
          className="mt-auto self-center data-[focus=true]:shadow-none p-4"
          color="primary"
          as="span"
          radius={radius}
          startContent={
            <span className="group-hover:translate-x- inline-flex h-8 w-8 flex-none items-center justify-center rounded-full transition-[colors,transform] duration-200 group-data-[hover=true]:-translate-x-1 bg-primary-500 group-data-[hover=true]:bg-primary-400 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                className="h-4 w-4 fill-white"
                viewBox="0 0 48 48"
              >
                <path d="M12.65 41.25q-4.85 0-8.325-3.4Q.85 34.45.85 29.55q0-4.2 2.55-7.525T10.05 18q1.2-5 5.1-8.125 3.9-3.125 8.95-3.125 5.8 0 9.9 4.125Q38.1 15 38.5 20.85v1.2q3.75.35 6.2 3.025t2.45 6.575q0 4-2.8 6.8t-6.8 2.8H25.8v-15.3l3.2 3.2q.5.55 1.275.525.775-.025 1.275-.525.55-.55.55-1.3t-.55-1.3l-5.9-5.8q-.7-.65-1.65-.65t-1.65.65l-5.9 5.85q-.55.55-.5 1.3.05.75.55 1.25.55.55 1.3.525.75-.025 1.3-.575l3.1-3.15v15.3Z"></path>
              </svg>
            </span>
          }
        >
          {placeholder || "Upload"}
        </Button>

        <Controller
          name={name!}
          control={control}
          rules={rules}
          render={({ field }) => {
            return (
              <>
                <span className="text-sm my-2">{field.value?.name}</span>
                <input
                  className="hidden"
                  type="file"
                  onChange={(e) =>
                    field.onChange({
                      target: { value: e.target.files?.[0], name },
                    })
                  }
                />
              </>
            );
          }}
        />
      </label>
      {isInvalid && (
        <span className="mt-2 block text-xs text-danger">{errorMessage}</span>
      )}
    </div>
  );
};

export default FileInput;
