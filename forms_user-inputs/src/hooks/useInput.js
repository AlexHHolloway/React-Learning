import { useState } from "react";

export function useInput(defaultValue, validationFn) {
  const [credential, setCredential] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn(credential);

  function handleInput(e) {
    setCredential(e.target.value);
    setDidEdit(false);
  }

  function handleInputBlur() {
    setDidEdit(true);
  }

  return {
    value: credential,
    handleInput,
    handleInputBlur,
    hasError: didEdit && !valueIsValid,
  };
}
