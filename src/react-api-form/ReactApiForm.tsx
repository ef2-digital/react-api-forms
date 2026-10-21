"use client";

import cx from "classnames";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Button, Spinner } from "@heroui/react";
import { DynamicControl } from "./components/DynamicControl";
import { DynamicFieldData, FormProps, Messages } from "./types/Types";
import { useEffect, useState } from "react";
import { postSubmission, fetchFields } from "./utils/fetcher";

const widthClassMap: { [key: string]: string } = {
  "100%": "w-full md:mr-4",
  "75%": "w-full md:w-[calc(75%-1rem)]",
  "50%": "w-full md:w-[calc(50%-1rem)]",
  "33%": "w-full md:w-[calc(33.33%-1rem)]",
  "25%": "w-full md:w-[calc(25%-1rem)]",
};

// One import per language, so bundlers can resolve them; a template import is not.
const messageLoaders: Record<string, () => Promise<{ default: Messages }>> = {
  de: () => import("./messages/de.json"),
  en: () => import("./messages/en.json"),
  fr: () => import("./messages/fr.json"),
  nl: () => import("./messages/nl.json"),
};

const DefaultSubmitSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    className="h-4 w-4 fill-white"
    viewBox="0 0 48 48"
    aria-hidden
  >
    <path d="M22.35 38.8q-.7-.65-.7-1.625t.7-1.675l9.15-9.15H9.8q-1 0-1.675-.675T7.45 24q0-1 .675-1.675T9.8 21.65h21.7l-9.15-9.2q-.7-.65-.7-1.65 0-1 .7-1.7.7-.65 1.675-.65.975 0 1.675.65l13.25 13.25q.35.35.525.775.175.425.175.875t-.175.875q-.175.425-.525.775L25.7 38.9q-.7.7-1.675.65-.975-.05-1.675-.75Z"></path>
  </svg>
);

const ReactApiForm = ({
  formId,
  locale,
  classNames,
  endpoint,
  children,
  renders,
  icons,
  givenFields,
  givenMessages,
}: FormProps) => {
  const [isSuccess, setSuccess] = useState<string>("");
  const [isError, setError] = useState<string>("");
  const [messages, setMessages] = useState<Messages>(givenMessages ?? {});
  const [fields, setFields] = useState<DynamicFieldData[] | null>(
    givenFields ? JSON.parse(givenFields) : null
  );

  useEffect(() => {
    const fetchForm = async () => {
      const response = await fetchFields(endpoint, formId);

      setFields(JSON.parse(response));
    };
    const fetchMessages = async () => {
      const language = (locale ?? "nl").toLowerCase().split("-")[0];
      const load = messageLoaders[language] ?? messageLoaders.en;
      const response = await load();

      setMessages(response.default);
    };

    if (!givenMessages) {
      fetchMessages().catch(console.error);
    }

    if (!givenFields) {
      fetchForm().catch(console.error);
    }
  }, []);

  const formMethods = useForm();

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
    setValue,
  } = formMethods;

  const formSubmit: SubmitHandler<FieldValues> = async (data) => {
    const response = await postSubmission(endpoint, formId, data);

    if (!response.ok) {
      return setError(messages?.error || response.statusText || "Error");
    }

    const result = await response.json().catch(() => null);

    if (!result?.form) {
      return setError(messages?.error || "Error");
    }

    return setSuccess(result.form.successMessage);
  };

  if (isError) {
    return (
      <div
        className={classNames?.errorWrapper}
        dangerouslySetInnerHTML={{ __html: isError }}
      />
    );
  }

  if (isSuccess) {
    return (
      <div
        className={classNames?.successWrapper}
        dangerouslySetInnerHTML={{ __html: isSuccess }}
      />
    );
  }

  const submitIcon = icons?.SubmitSvg ?? DefaultSubmitSvg;

  return (
    <>
      <FormProvider {...formMethods}>
        <form noValidate onSubmit={handleSubmit(formSubmit)}>
          <div className={cx(classNames?.fieldsWrapper, "my-4 flex flex-wrap gap-4")}>
            {fields &&
              fields.map((field, index) => {
                const { ui } = field.config || {};

                return (
                  <div
                    key={`${field.name}-wrapper-${index}`}
                    className={cx(
                      "flex-item",
                      ui?.classNames,
                      classNames?.fieldWrapper,
                      widthClassMap[ui?.width]
                    )}
                  >
                    <DynamicControl
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
              label="Don't fill this out if you're human"
              type="text"
              control={control}
              messages={messages}
              classNames={classNames}
            />
          </div>

          {(renders?.renderSubmitButton &&
            renders.renderSubmitButton({
              handleSubmit: async (e?: React.BaseSyntheticEvent) => {
                await handleSubmit(formSubmit)(e);
              },
              isSubmitting: isSubmitting,
            })) ?? (
            <Button type="submit" isPending={isSubmitting} className={cx("group", classNames?.button)}>
              {messages?.submit}
              <span className="mr-2 inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-accent transition-transform duration-200 group-hover:translate-x-1">
                {isSubmitting ? <Spinner size="sm" color="current" /> : submitIcon}
              </span>
            </Button>
          )}
        </form>
      </FormProvider>
      {children}
    </>
  );
};

export default ReactApiForm;
