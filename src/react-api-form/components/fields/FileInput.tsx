import cx from "classnames";
import { Controller } from "react-hook-form";
import { buttonVariants } from "@heroui/react";
import { InputProps } from "../../types/Types";

const UploadIcon = (
  <span className="mr-2 inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-accent transition-transform duration-200 group-hover:-translate-x-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      className="h-4 w-4 fill-white"
      viewBox="0 0 48 48"
      aria-hidden
    >
      <path d="M12.65 41.25q-4.85 0-8.325-3.4Q.85 34.45.85 29.55q0-4.2 2.55-7.525T10.05 18q1.2-5 5.1-8.125 3.9-3.125 8.95-3.125 5.8 0 9.9 4.125Q38.1 15 38.5 20.85v1.2q3.75.35 6.2 3.025t2.45 6.575q0 4-2.8 6.8t-6.8 2.8H25.8v-15.3l3.2 3.2q.5.55 1.275.525.775-.025 1.275-.525.55-.55.55-1.3t-.55-1.3l-5.9-5.8q-.7-.65-1.65-.65t-1.65.65l-5.9 5.85q-.55.55-.5 1.3.05.75.55 1.25.55.55 1.3.525.75-.025 1.3-.575l3.1-3.15v15.3Z"></path>
    </svg>
  </span>
);

const FileInput = ({
  isInvalid,
  name,
  control,
  errorMessage,
  placeholder,
  label,
  rules,
  classNames,
}: InputProps) => (
  <div className={classNames?.field}>
    <label
      className={cx(
        "group flex flex-col items-center border-2 border-dashed bg-white p-4 shadow-sm transition-all duration-200 hover:cursor-pointer hover:border-accent",
        classNames?.fileWrapper,
        { "border-danger": isInvalid }
      )}
    >
      <span className={cx("self-start text-sm", classNames?.label)}>{label}</span>
      <span className={cx(buttonVariants(), "mt-auto self-center p-4")}>
        {UploadIcon}
        {placeholder || "Upload"}
      </span>

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            <span className="my-2 text-sm">{field.value?.name}</span>
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
        )}
      />
    </label>
    {isInvalid && (
      <span className={cx("mt-2 block text-xs text-danger", classNames?.error)}>{errorMessage}</span>
    )}
  </div>
);

export default FileInput;
