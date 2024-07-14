//import rrd
import { Form, Link, useActionData } from "react-router-dom";

//components
import { FormInput } from "../components";

// import react
import { useEffect } from "react";

// custom hooks
import { useRegister } from "../hooks/useRegister";

//action
export const action = async ({ request }) => {
  let formData = await request.formData();
  let displayName = formData.get("displayName");
  let photoURL = formData.get("photoURL");
  let email = formData.get("email");
  let password = formData.get("password");
  return {
    displayName,
    photoURL,
    email,
    password,
  };
};

function Register() {
  const { registerWithGoogle, isPending, registerEmailAndPassword } =
    useRegister();
  const userData = useActionData();

  useEffect(() => {
    if (userData) {
      registerEmailAndPassword(
        userData.email,
        userData.password,
        userData.displayName,
        userData.photoURL
      );
    }
  }, [userData]);
  return (
    <div className="auth-container">
      <div className="auth-left"></div>
      <div className="auth-right">
        <Form
          method="post"
          className="flex flex-col gap-2 w-96 bg-base-100 shadow-2xl rounded-xl p-5"
        >
          <h1 className="text-3xl font-semibold text-center">Рўйхатдан ўтиш</h1>
          <FormInput label="Исмингиз" type="text" name="displayName" />
          <FormInput label="Расмингиз URL" type="url" name="photoURL" />
          <FormInput label="Электрон почтангиз" type="email" name="email" />
          <FormInput label="Паролингиз" type="password" name="password" />
          <div className="mt-6">
            {isPending && (
              <button disabled type="submit" className="btn btn-primary btn-block ">
                Юкланмоқда...
              </button>
            )}
            {!isPending && (
              <button type="submit" className="btn btn-primary btn-block ">
                Рўйхатдан ўтиш
              </button>
            )}
          </div>
          <div>
            {isPending && (
              <button disabled type="button" className="btn btn-accent btn-block ">
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
              Агарда Сизни аккаунтингиз бўлса,{" "}
              <Link className="link link-primary" to="/login">
                аккантингизга кириш
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
