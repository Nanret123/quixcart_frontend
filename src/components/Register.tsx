import { Link, useNavigate } from "react-router";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { IApiError } from "@/utils";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRegisterMutation } from "@/redux/features/auth/authApi";

interface IFormValues {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const [register] = useRegisterMutation();
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();

  const initialValues: IFormValues = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required("Firstname is required"),
    lastname: Yup.string().required("Lastname is required"),
    username: Yup.string()
      .required("Username is required")
      .min(6, "Username must be at least 6 characters"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
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
    const { confirmPassword, ...payload } = values;
    try {
      const result = await register(payload).unwrap();
      setMessage(result.message);
      setTimeout(() => {
        navigate("/login"); // Delay navigation
      }, 5000);
    } catch (err) {
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
        {message && (
          <p className="text-green-500 text-center mb-4">{message}</p>
        )}
        {apiError && (
          <p className="text-red-500 text-center mb-4">{apiError}</p>
        )}
        <h2 className="text-2xl font-semibold pt-5">Register</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-5 max-w-sm mx-auto pt-8">
              {message && <p style={{ color: "green" }}>{message}</p>}
              <Field
                type="text"
                name="firstname"
                id="firstname"
                placeholder="First Name"
                required
                className="w-full bg-gray-100 focus:outline-none px-5 py-3"
              />
              {errors.firstname && touched.firstname ? (
                <div className="text-red-500">{errors.firstname}</div>
              ) : null}
              <Field
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Lastname"
                required
                className="w-full bg-gray-100 focus:outline-none px-5 py-3"
              />
              {errors.lastname && touched.lastname ? (
                <div className="text-red-500">{errors.lastname}</div>
              ) : null}
              <Field
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                required
                className="w-full bg-gray-100 focus:outline-none px-5 py-3"
              />
              {errors.username && touched.username ? (
                <div className="text-red-500">{errors.username}</div>
              ) : null}
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
                {errors.password && touched.password ? (
                  <div className="text-red-500">{errors.password}</div>
                ) : null}
              </div>
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
                  className=" flex items-center text-gray-600 mr-2"
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
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
        <p className="my-5 italic text-sm text-center">
          Already have an account{" "}
          <Link to="/login" className="underline text-indigo-500 px-1">
            Login{" "}
          </Link>{" "}
          here.
        </p>
      </div>
    </section>
  );
};

export default Register;
