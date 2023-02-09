export const attributesForInput = (input: HTMLInputElement) => ({
  type: input.type,
  name: input.name,
  placeholder: input.placeholder,
  value: input.value,
  onChange: input.onchange,
});

export const capitalize = (text: string) =>
  `${text.charAt(0).toUpperCase()}${text.substring(1)}`;
