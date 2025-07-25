import { useState } from "react";
// import { styled } from "styled-components";
import Button from "../Button";
import { Input } from "./Input";

// const ControlDiv = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
//   margin-bottom: 1.5rem;
// `;

// const Label = styled.label`
//   display: block;
//   margin-bottom: 0.5rem;
//   font-size: 0.75rem;
//   font-weight: 700;
//   letter-spacing: 0.1em;
//   text-transform: uppercase;
//   color: ${({ $invalid }) => ($invalid ? "#f87171" : "#6b7280")};
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 0.75rem 1rem;
//   line-height: 1.5;
//   background-color: #d1d5db;
//   color: #374151;
//   border: 1px solid transparent;
//   border-radius: 0.25rem;
//   box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
// `;

export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier, value) {
    if (identifier === "email") {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
  }

  const emailNotValid = submitted && !enteredEmail.includes("@");
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <div className="mb-4 w-full mx-auto max-w-sm p-8 rounded shadow-md bg-gradient-to-b from-stone-600 to-stone-800">
      <form>
        <p>
          <Input
            label="email"
            type="email"
            invalid={emailNotValid}
            autoComplete="username"
            onChange={(event) => handleInputChange("email", event.target.value)}
          />
        </p>
        <p>
          <Input
            invalid={passwordNotValid}
            label="password"
            type="password"
            autoComplete="current-password"
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
          />
        </p>
      </form>
      <div className="flex justify-end gap-4">
        <button className="text-amber-400 hover:text-amber-500" type="button">
          Create a new account
        </button>
        <Button type="button" onClick={handleLogin}>
          Sign In
        </Button>
      </div>
    </div>
  );
}
