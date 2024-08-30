const sprintf = (format: string, ...args: string[]): string => {
  let i = 0;

  if (!format) {
    return "";
  }

  return format.replace(/%s/g, () => args[i++]);
};

export { sprintf };
