import { Link } from "react-router";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { IApiError } from "@/utils";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface IFormValues {
  email: string;
}

const ForgotPassword = () => {
  const [forgotPassword] = useForgotPasswordMutation();
  const [message, setMessage] = useState("");
  const [apiError, setApiError] = useState<string | null>(null);

  const initialValues: IFormValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const handleSubmit = async (
    values: IFormValues,
    { setSubmitting }: FormikHelpers<IFormValues>
  ) => {
    setApiError(null); // Reset error message before new request
    try {
      const result = await forgotPassword(values).unwrap();
      setMessage(result.message);
    } catch (err) {
      console.error("Login error:", err);
      const apiError = err as FetchBaseQueryError & IApiError;

      if (apiError.data?.error) {
        setApiError(apiError.data.error);
      } else {
        setApiError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="h-screen flex items-center justify-center">
      {message ? (
        <p className={`text-green-500`}>{message}</p>
      ) : (
        <div className="max-w-sm border shadow bg-white mx-auto p-8">
          <h2 className="text-2xl font-semibold pt-5">Forgot Password</h2>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-5 max-w-sm mx-auto pt-8">
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email Address"
                  required
                  className="w-full bg-gray-100 focus:outline-none px-5 py-3"
                />
                {errors.email && touched.email ? (
                  <div className="text-red-500">{errors.email}</div>
                ) : null}
                {message && <p className={`text-red-500 text-sm`}>{message}</p>}
                <button
                  type="submit"
                  className="w-full  mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Email"}
                </button>
              </Form>
            )}
          </Formik>
          <p className="my-5 italic text-sm text-center">
            Don't have an account{" "}
            <Link to="/register" className="underline text-indigo-500 px-1">
              Register{" "}
            </Link>{" "}
            here.
          </p>
        </div>
      )}
    </section>
  );
};

export default ForgotPassword;
