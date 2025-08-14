import { useState } from "react";
import Input from "./Input";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation";
import { useInput } from "../hooks/useInput";

export default function StateLogin() {
  const {
    value: emailValue,
    handleInput: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));
  const {
    value: passwordValue,
    handleInput: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput("", (value) => hasMinLength(value, 6));

  function handleSubmit(e) {
    e.preventDefault();

    if (emailHasError || passwordHasError) {
      return;
    }

    if (
      !isEmail(emailValue) ||
      !isNotEmpty(emailValue) ||
      !hasMinLength(passwordValue, 6)
    ) {
      // Don't submit the form if validation fails
      return;
    }
    console.log(`email: ${emailValue}`);
    console.log(`password: ${passwordValue}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <Input
            label="email"
            id="email"
            type="email"
            onBlur={handleEmailBlur}
            onChange={handleEmailChange}
            value={emailValue}
            error={emailHasError ? "Please enter a valid email address" : ""}
          />
          </div>
          <div className="control no-margin">
          <Input
            label="password"
            id="password"
            type="password"
            onBlur={handlePasswordBlur}
            onChange={handlePasswordChange}
            value={passwordValue}
            error={
              passwordHasError
                ? "Please enter a valid password with a minimum of 6 characters"
                : ""
            }
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
