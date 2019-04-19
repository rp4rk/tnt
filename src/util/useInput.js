import { useState } from "react";

/**
 * Hooks for updating state from an input
 * @param {any} initialValue An initial value for the input
 * @returns {[any, function]} A tuple containing the value and setter
 */
export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  return [value, e => setValue(e.target.value)];
};

/**
 * Hook for validating and managing an input state
 * @param {function} validationFn A validation function to run the value against
 * @param {any} initialValue An initial value for the input
 * @returns {[any, function, boolean, boolean]}
 */
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
