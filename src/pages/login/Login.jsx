import { useState } from "react";
import { Link } from "react-router-dom";

import useUsername from "./useUsername";

export default function Login() {
  const [usernameInput, setUsernameInput] = useState("");
  const [username, setUsername] = useState("");

  function handleChange(e) {
    setUsernameInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setUsername(usernameInput);
  }

  const { loggedInUser, isLogging, isSuccess, isError } = useUsername(username);

  return (
    <section className="flex flex-col items-center gap-16 p-4 md:p-8">
      <h2 className="mt-20 text-4xl font-black text-gray-500">Login</h2>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <InputUsername onChange={handleChange} disabled={isLogging} />

        <ValidUsernamesList />
        {isLogging && (
          <Button text="Logging..." bgColor="bg-gray-500" disabled />
        )}
        {!isLogging && (
          <Button text="Login" onClick={handleSubmit} bgColor="bg-blue-500" />
        )}
        <SignUpLink />
      </form>
      <UserDialogue isSuccess={isSuccess} isError={isError} />
    </section>
  );
}

function InputUsername({ onChange, disabled }) {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="username">Username</label>
      <input
        disabled={disabled}
        onChange={onChange}
        type="text"
        id="username"
        placeholder="Your username"
        className="w-48 border-b border-gray-300 px-4 py-2"
      />
    </div>
  );
}

function UserDialogue({ isError, isSuccess }) {
  if (isError) {
    return (
      <Alert error right fit>
        User not found
      </Alert>
    );
  } else if (isSuccess) {
    return (
      <Alert success right fit>
        Login successful
      </Alert>
    );
  }
}

function ValidUsernamesList() {
  const validUsernames = ["grumpy19", "tickle122", "jessjelly"];
  return (
    <div className="flex flex-col gap-4 rounded bg-gray-200 p-4 hover:bg-blue-50">
      <h3 className="text-sm font-bold">Valid Usernames</h3>
      <ul className="flex flex-col gap-2">
        {validUsernames.map((validUsername, index) => (
          <li className="text-sm" key={`valid-username-${index}`}>
            {validUsername}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Button({ text, bgColor, ...restProps }) {
  return (
    <button
      className={`rounded ${bgColor} px-4 py-2 text-sm font-bold text-white`}
      {...restProps}
    >
      {text}
    </button>
  );
}

function Alert({ children, success, error }) {
  const bgColor = success ? "bg-green-200" : error ? "bg-red-200" : "";
  return (
    <p
      className={`rounded ${bgColor} absolute bottom-2 right-2 w-fit px-4 py-2 text-center text-sm`}
    >
      {children}
    </p>
  );
}

function SignUpLink() {
  return (
    <p className="flex flex-row justify-end gap-1">
      <span>or</span>
      <Link to="/sign-up" className="font-bold text-blue-600 underline">
        sign up
      </Link>
    </p>
  );
}
