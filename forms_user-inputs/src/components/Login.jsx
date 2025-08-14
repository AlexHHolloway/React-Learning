// not currently being rendered.

import { useRef, useState } from "react";

export default function Login() {
  const [formInvalid, setFormInvalid] = useState({
    email: false,
    password: false,
  });

  const email = useRef();
  const password = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    console.log(`email: ${email.current.value}`);
    console.log(`password: ${password.current.value}`);

    const emailInvalid = !enteredEmail.includes("@");

    if (emailInvalid) {
      setFormInvalid((prevForm) => ({
        ...prevForm,
        email: true,
      }));
      return;
    }

    setFormInvalid({
      email: false
    })

    console.log("sending http request...");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="username"
            ref={email}
          />
          <div className="control-error">
            {formInvalid.email && <p>Please enter a valid email address.</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            autoComplete="current-password"
            ref={password}
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
