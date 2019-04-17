import { useState } from "react";

// Passes input value to state
export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  return [value, e => setValue(e.target.value)];
};

// Validates beforehand, note this is tied tightly with antd
export const useInputWithValidation = (validationFn, initialValue) => {
  const [value, setValue] = useInput(initialValue);
  const [pristine, setPristine] = useState(true);

  const meetsValidation = validationFn(value);
  const setValueAndPristine = value => {
    setValue(value);
    setPristine(false);
  };

  return [value, setValueAndPristine, meetsValidation, pristine];
};
