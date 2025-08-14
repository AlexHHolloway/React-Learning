import { useState, useRef } from "react";
import { useActionState } from "react";
import {
  isEmail,
  isNotEmpty,
  isEqualToOtherValue,
  hasMinLength,
} from "../util/validation";

function signupAction(prevFormState, formData) {
  // Add a special case for resetting
  if (formData === null) {
    return {
      errors: null,
      values: null,
    };
  }

  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm-password");
  const firstName = formData.get("first-name");
  const lastName = formData.get("last-name");
  const role = formData.get("role");
  const terms = formData.get("terms");
  const acqChannels = formData.getAll("acquisition");

  let errors = [];

  if (!isEmail(email)) {
    errors.push("Invalid email address");
  }

  if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
    errors.push("You must provide a password with at least six characters");
  }

  if (!isEqualToOtherValue(password, confirmPassword)) {
    errors.push("Passwords do not match");
  }

  if (!isNotEmpty(firstName) || !isNotEmpty(lastName)) {
    errors.push("Please provide both your first and last name");
  }

  if (!isNotEmpty(role)) {
    errors.push("Please select a role");
  }

  if (acqChannels.length === 0) {
    errors.push("Please select at least one acquisition channel");
  }

  if (!terms) {
    errors.push("You must agree to the Terms and Conditions");
  }

  console.log({
    email: email,
    password: password,
    confirmPassword: confirmPassword,
    firstName: firstName,
    lastName: lastName,
    role: role,
    acqChannels: acqChannels,
    terms: terms,
  });

  if (errors.length > 0) {
    return {
      errors,
      values: {
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        role,
        acqChannels,
        terms,
      },
    };
  }

  return { errors: null };
}

export default function Signup() {
  const [passwordError, setPasswordError] = useState("");
  const formRef = useRef();

  const [formState, formAction] = useActionState(signupAction, {
    errors: null,
  });

  function handleReset() {
    // Use DOM reset to clear the form values
    formRef.current.reset();

    // Clear password error state
    setPasswordError("");

    // Reset form state to initial state by passing null as formData
    formAction(null);
  }

  return (
    <form action={formAction} ref={formRef}>
      <h2>Welcome aboard!</h2>
      <p>We just need some basic data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          autoComplete="email"
          defaultValue={formState.values?.email || ""}
        />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            autoComplete="new-password"
            minLength={6}
            defaultValue={formState.values?.password || ""}
          />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            autoComplete="new-password"
            aria-invalid={passwordError ? "true" : "false"}
            onInput={() => setPasswordError("")}
            onBlur={(e) => {
              const form = e.target.form;
              if (form) {
                const password = form.elements["password"].value;
                const confirmPassword = e.target.value;
                if (password !== confirmPassword) {
                  setPasswordError("Passwords do not match.");
                }
              }
            }}
            defaultValue={formState.values?.confirmPassword || ""}
          />
          {passwordError && (
            <div className="control-error">{passwordError}</div>
          )}
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            name="first-name"
            autoComplete="given-name"
            defaultValue={formState.values?.firstName || ""}
          />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            autoComplete="family-name"
            defaultValue={formState.values?.lastName || ""}
          />
        </div>
      </div>

      <div className="control">
        <label htmlFor="role">What best describes your role?</label>
        <select
          id="role"
          name="role"
          defaultValue={formState.values?.role || ""}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
            defaultChecked={formState.values?.acqChannels?.includes("google")}
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
            defaultChecked={formState.values?.acqChannels?.includes("friend")}
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="other"
            name="acquisition"
            value="other"
            defaultChecked={formState.values?.acqChannels?.includes("other")}
          />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input
            type="checkbox"
            id="terms-and-conditions"
            name="terms"
            defaultChecked={formState.values?.terms}
          />
          I agree to the terms and conditions
        </label>
      </div>

      {formState.errors && (
        <ul className="error">
          {formState.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <p className="form-actions">
        <button
          type="button"
          className="button button-flat"
          onClick={handleReset}
        >
          Clear
        </button>
        <button type="submit" className="button">
          Sign up
        </button>
      </p>
    </form>
  );
}
