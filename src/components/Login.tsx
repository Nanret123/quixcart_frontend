import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { IApiError } from "@/utils";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth/authSlice";

interface IFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const [login] = useLoginMutation();
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle password
  //  visibility
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues: IFormValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (
    values: IFormValues,
    { setSubmitting }: FormikHelpers<IFormValues>
  ) => {
    setApiError(null); // Reset error message before new request
    try {
      const result = await login(values).unwrap();
      console.log("Login successful:", result);
      dispatch(setUser(result.user)); // Save user in Redux
      if(result.user.role === 'admin'){
        navigate("/admin/dashboard"); // Redirect to admin dashboard if user is admin
      }else{
        navigate("/"); // Redirect to user homepage if user is not admin
      }
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
      <div className="max-w-sm border shadow bg-white mx-auto p-8">
        <h2 className="text-2xl font-semibold pt-5">Login</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-5 max-w-sm mx-auto pt-8">
              {/* Display API error message */}
              {apiError && <p style={{ color: "red" }}>{apiError}</p>}
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
                  className=" mr-2 flex items-center text-gray-600"
                >
                  {showPassword ? "🙈" : "👁"} {/* Toggle Icon */}
                </button>
              </div>
              {errors.password && touched.password ? (
                <div className="text-red-500">{errors.password}</div>
              ) : null}

              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="underline text-indigo-500 px-1 text-right"
                >
                  Forgot Password
                </Link>
              </div>
              {message && <p className={`text-red-500 text-sm`}>{message}</p>}
              <button
                type="submit"
                className="w-full  mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
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
    </section>
  );
};

export default Login;
