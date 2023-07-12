export function sanitizeInput(inputValue: string, inputName: string = "") {
  if (inputName === "email") {
    const invalidCharsRegex = /[^a-zA-Z0-9@._+']/g;
    const spaceRegex = /\s/g;
    return inputValue.replace(invalidCharsRegex, "").replace(spaceRegex, "");
  }
  const invalidCharsRegex = /[@$%^*<>?]/g;
  return inputValue.replace(invalidCharsRegex, "");
}
