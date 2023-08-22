import { useState } from "react";
import { LoginParams } from "@/utils/types";

interface LoginProps {
  onLogin: (params: LoginParams) => void;
  errorMessage: string;
}

const Login: React.FC<LoginProps> = ({ onLogin, errorMessage }) => {
  const initialFormFields = {
    username: "",
    password: "",
  };
  const [loginFormState, setLoginFormState] = useState(initialFormFields);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLogin(loginFormState);
  };

  return (
    <section>
      <header className="pb-6 text-white text-center">
        <h1 className="text-3xl">Admin Login</h1>
      </header>

      <form onSubmit={handleFormSubmit} className="form form--login">
        {errorMessage && (
          <h2 className="text-center text-lg text-red-500">{errorMessage}</h2>
        )}

        <div className="form__group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={loginFormState.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form__group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={loginFormState.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="form__button">
          Login
        </button>
      </form>
    </section>
  );
};
export default Login;
