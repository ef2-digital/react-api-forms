const postSubmission = async (
  endpoint: string,
  formId: string,
  data: object
) => {
  const response = await fetch(`${endpoint}/api/api-forms/submission/post`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: { form: formId, submission: JSON.stringify(data) },
    }),
  });

  return response;
};

export default postSubmission;
