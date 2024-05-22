const postSubmission = async (
  endpoint: string,
  formId: string,
  data: object
) => {
  const formData = new FormData();

  Object.entries(data).forEach(
    ([key, field]: [string, File | any], index: number) => {
      if (field instanceof File) {
        formData.append(`${key}`, field);
        //@ts-ignore
        delete data[key];
      }
    }
  );

  formData.append("submission", JSON.stringify(data));
  formData.append("form", formId);

  const response = await fetch(`${endpoint}/api/api-forms/submission/post`, {
    method: "POST",
    body: formData,
  });

  return response;
};

const fetchFields = async (endpoint: string, formId: string) => {
  const response = await fetch(`${endpoint}/api/api-forms/fields/${formId}`, {
    method: "GET",
  });

  const data = await response.json();

  return data.data.fields;
};

export { postSubmission, fetchFields };
