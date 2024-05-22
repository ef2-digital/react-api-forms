"use client";

import cx from "classnames";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { DynamicControl } from "./components/DynamicControl";
import {
  ColorEnum,
  DynamicFieldData,
  FormProps,
  LabelPlacementEnum,
  Messages,
  RadiusEnum,
  SizeEnum,
  VariantEnum,
} from "./types/Types";
import { useEffect, useState } from "react";
import { postSubmission, fetchFields } from "./utils/fetcher";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";

const ReactApiForm = ({
  formId,
  locale,
  classNames,
  endpoint,
  children,
  nextUi,
  renders,
  icons,
}: FormProps) => {
  const [isSuccess, setSuccess] = useState<string>("");
  const [isError, setError] = useState<string>("");
  const [messages, setMessages] = useState<Messages>({});
  const [fields, setFields] = useState<DynamicFieldData[] | null>(null);

  useEffect(() => {
    const fetchForm = async () => {
      const response = await fetchFields(endpoint, formId);

      if (!fields) {
        setFields(null);
      }

      setFields(JSON.parse(response));
    };
    const fetchMessages = async () => {
      const response = await import(`./messages/${locale ?? "nl"}.json`);

      setMessages(response.default);
    };

    fetchMessages().catch(console.error);
    fetchForm().catch(console.error);
  }, []);

  const formMethods = useForm();

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
    setValue,
  } = formMethods;

  const formSubmit: SubmitHandler<FieldValues> = async (data, error) => {
    const response = await postSubmission(endpoint, formId, data);

    if (response.status !== 200) {
      setError(response.statusText);
    }

    const result = await response.json();

    if (!result) {
      setError(result.form.errorMessage);
    }

    return setSuccess(result.form.successMessage);
  };

  if (isError) {
    return <div className={classNames?.errorWrapper}>{isError}</div>;
  }

  if (isSuccess) {
    return <div className={classNames?.successWrapper}>{isSuccess}</div>;
  }

  const { variant, radius, labelPlacement, color, size } = nextUi || {
    variant: VariantEnum.Bordered,
    radius: RadiusEnum.None,
    labelPlacement: LabelPlacementEnum.Outside,
    color: ColorEnum.Primary,
    size: SizeEnum.Medium,
  };

  const { SubmitSvg } = icons || {
    SubmitSvg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        className="h-4 w-4 fill-white"
        viewBox="0 0 48 48"
      >
        <path d="M22.35 38.8q-.7-.65-.7-1.625t.7-1.675l9.15-9.15H9.8q-1 0-1.675-.675T7.45 24q0-1 .675-1.675T9.8 21.65h21.7l-9.15-9.2q-.7-.65-.7-1.65 0-1 .7-1.7.7-.65 1.675-.65.975 0 1.675.65l13.25 13.25q.35.35.525.775.175.425.175.875t-.175.875q-.175.425-.525.775L25.7 38.9q-.7.7-1.675.65-.975-.05-1.675-.75Z"></path>
      </svg>
    ),
  };

  if (!fields) {
    return <></>;
  }

  const formFields: DynamicFieldData[] = fields;
  return (
    <>
      <FormProvider {...formMethods}>
        <div
          className={cx(classNames?.fieldsWrapper, "flex flex-wrap gap-4 my-4")}
        >
          {fields.map((field, index) => {
            const { ui } = field.config || {};
            const width = ui?.width;

            const widthClassMap: { [key: string]: string } = {
              "100%": "w-full mr-4",
              "75%": "w-full md:w-[calc(75%-1rem)]",
              "50%": "w-full md:w-[calc(50%-1rem)]",
              "33%": "w-full md:w-[calc(33.33%-1rem)]",
              "25%": "w-full md:w-[calc(25%-1rem)]",
            };

            const widthClass = widthClassMap[width];

            return (
              <div
                key={`${field.name}-wrapper-${index}`}
                className={cx(
                  "flex-item",
                  ui?.classNames,
                  classNames?.fieldWrapper,
                  widthClass
                )}
              >
                <DynamicControl
                  variant={variant}
                  radius={radius}
                  size={size}
                  labelPlacement={labelPlacement}
                  color={color}
                  {...field}
                  classNames={classNames}
                  errors={errors}
                  messages={messages}
                  control={control}
                  setValue={setValue}
                  renders={renders}
                  icons={icons}
                />
              </div>
            );
          })}
        </div>
        <div className="hidden">
          <DynamicControl
            defaultValue=""
            name="honeypot"
            label="Don’t fill this out if you're human"
            type="text"
            control={control}
            classNames={classNames}
          />
        </div>

        {(renders?.renderSubmitButton &&
          renders.renderSubmitButton({
            //@ts-ignore
            handleSubmit: handleSubmit(formSubmit),
            isSubmitting: isSubmitting,
          })) ?? (
          <Button
            as="button"
            type="submit"
            onClick={handleSubmit(formSubmit)}
            disabled={isSubmitting}
            color={color}
            radius={radius}
            className={classNames?.button}
            endContent={
              <span className="group-hover:translate-x- inline-flex h-8 w-8 flex-none items-center justify-center rounded-full transition-[colors,transform] duration-200 group-data-[hover=true]:translate-x-1 bg-primary-500 group-data-[hover=true]:bg-primary-400 mr-2">
                {isSubmitting ? <Spinner size="sm" color="white" /> : SubmitSvg}
              </span>
            }
          >
            {messages?.submit}
          </Button>
        )}
      </FormProvider>
      {children}
    </>
  );
};

export default ReactApiForm;
