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
  FormProps,
  LabelPlacementEnum,
  RadiusEnum,
  VariantEnum,
} from "./types/Types";
import { useState } from "react";
import postSubmission from "./utils/fetcher";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";

const Form = ({
  messages,
  formId,
  fields,
  classNames,
  endpoint,
  children,
  SuccessMessage,
  ErrorMessage,
  nextUi,
}: FormProps) => {
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);

  const formMethods = useForm();

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
    setValue,
  } = formMethods;

  const formSubmit: SubmitHandler<FieldValues> = async (data, error) => {
    if (data.honeypot) {
      setError(true);
      return false;
    }

    const response = await postSubmission(endpoint, formId, data);

    if (response.status !== 200) {
      setError(true);
    }
    const result = await response.json();

    if (!result) {
      setError(true);
    }
    return setSuccess(true);
  };

  if (isError && ErrorMessage) {
    return <>{ErrorMessage}</>;
  }

  if (isSuccess && SuccessMessage) {
    return <>{SuccessMessage}</>;
  }

  const { variant, radius, labelPlacement, color } = nextUi || {
    variant: VariantEnum.Bordered,
    radius: RadiusEnum.None,
    labelPlacement: LabelPlacementEnum.Outside,
    color: ColorEnum.Primary,
  };

  return (
    <>
      <FormProvider {...formMethods}>
        <div
          className={cx(
            classNames?.fieldsWrapper,
            "inline-flex flex-wrap gap-x-4"
          )}
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
                  labelPlacement={labelPlacement}
                  {...field}
                  classNames={classNames}
                  errors={errors}
                  messages={messages}
                  control={control}
                  setValue={setValue}
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

        <Button
          as="button"
          type="submit"
          onClick={handleSubmit(formSubmit)}
          isLoading={isSubmitting}
          spinner={<Spinner />}
          color={color}
          radius={radius}
          className={classNames?.button}
        >
          {messages.submit ?? "Submit"}
        </Button>
      </FormProvider>
      {children}
    </>
  );
};

export default Form;
