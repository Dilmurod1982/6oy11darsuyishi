//import rrd
import { Form, Link, useActionData } from "react-router-dom";

//components
import { FormInput } from "../components";

// react import
import { useEffect } from "react";

// custom hooks
import { useRegister } from "../hooks/useRegister";
import { useLogin } from "../hooks/useLogin";

//action
export const action = async ({ request }) => {
  let formData = await request.formData();

  let email = formData.get("email");
  let password = formData.get("password");
  return {
    email,
    password,
  };
};

function Login() {
  const userData = useActionData();
  const { registerWithGoogle, isPending } = useRegister();
  const { signIn, isPending: isPendingLogin } = useLogin();
  useEffect(() => {
    if (userData) {
      signIn(userData.email, userData.password);
    }
  }, [userData]);
  return (
    <div className="auth-container">
      <div className="auth-left"></div>
      <div className="auth-right">
        <Form
          method="post"
          className="flex flex-col gap-5 w-96 bg-base-100 shadow-2xl rounded-xl p-5"
        >
          <h1 className="text-3xl font-semibold text-center">Кириш</h1>
          <FormInput label="Электрон почтангиз" type="email" name="email" />
          <FormInput label="Паролингиз" type="password" name="password" />
          <div>
            {isPendingLogin && (
              <button
                disabled
                type="submit"
                className="btn btn-primary btn-block "
              >
                Юкланмоқда...
              </button>
            )}
            {!isPendingLogin && (
              <button type="submit" className="btn btn-primary btn-block ">
                Кириш
              </button>
            )}
          </div>
          <div>
            {isPending && (
              <button
                disabled
                type="button"
                className="btn btn-accent btn-block "
              >
                Loading
              </button>
            )}
            {!isPending && (
              <button
                onClick={registerWithGoogle}
                type="button"
                className="btn btn-accent btn-block "
              >
                Google
              </button>
            )}
          </div>
          <div className="text-center">
            <p className="text-slate-500">
              Агарда Сизни аккаунтингиз бўлмаса,{" "}
              <Link className="link link-primary" to="/register">
                рўйхатдан ўтиш
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
