import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { IApiError } from "@/utils";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";

interface IFormValues {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();

  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const initialValues: IFormValues = {
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Must include at least one lowercase letter")
      .matches(/[A-Z]/, "Must include at least one uppercase letter")
      .matches(/[\W_]/, "Must include at least one special character")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (
    values: IFormValues,
    { setSubmitting }: FormikHelpers<IFormValues>
  ) => {
    setApiError(null); // Reset error message before new request

    const token = searchParams.get("token"); // Extract token inside the function

    if (!token) {
      setApiError("Invalid or missing token.");
      setSubmitting(false);
      return;
    }

    try {
      const { confirmPassword, ...payload } = values; // Exclude confirmPassword
      const requestData = { ...payload, token }; // Include token in payload
      const result = await resetPassword(requestData).unwrap(); // Send API request

      console.log("Reset Password successful:", result);
      setMessage(result.message);
      setTimeout(() => {
        navigate("/login"); // Delay navigation
      }, 5000);
    } catch (err) {
      console.error("error:", err);
      const apiError = err as FetchBaseQueryError & IApiError;
      setApiError(
        apiError.data?.error || "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="max-w-sm border shadow bg-white mx-auto p-8">
        {message && (
          <p className="text-green-500 text-center mb-4">{message}</p>
        )}
        {apiError && (
          <p className="text-red-500 text-center mb-4">{apiError}</p>
        )}
        <h2 className="text-2xl font-semibold pt-5">Reset Password</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-5 max-w-sm mx-auto pt-8">
              <div className="flex justify-between bg-gray-100">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  required
                  className="w-full bg-gray-100 focus:outline-none px-5 py-3"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="mr-2 flex items-center text-gray-600"
                >
                  {showPassword ? "🙈" : "👁"} {/* Toggle Icon */}
                </button>
              </div>
              {errors.password && touched.password ? (
                <div className="text-red-500">{errors.password}</div>
              ) : null}

              <div className="flex justify-between bg-gray-100">
                <Field
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  required
                  className="w-full bg-gray-100 focus:outline-none px-5 py-3"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="mr-2 flex items-center text-gray-600"
                >
                  {showConfirmPassword ? "🙈" : "👁"} {/* Toggle Icon */}
                </button>
              </div>
              {errors.confirmPassword && touched.confirmPassword ? (
                <div className="text-red-500">{errors.confirmPassword}</div>
              ) : null}

              <button
                type="submit"
                className="w-full  mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Reseting Password" : "Reset Password"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default ResetPassword;
