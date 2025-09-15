export const replaceDynamicParams = (
  template: string,
  params?: Record<string, string>,
): string => {
  if (!params) return template;
  Object.keys(params).forEach((placeholder) => {
    const value = params[placeholder];
    const regex = new RegExp(`{${placeholder}}`, "g");
    template = template.replace(regex, value);
  });
  return template;
};
