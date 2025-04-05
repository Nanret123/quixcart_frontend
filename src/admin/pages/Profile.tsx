import React, { useState } from "react";
import Header from "../components/Header";
import commenterIcon from "@/assets/avatar.png";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, setUser } from "@/redux/features/auth/authSlice";
import { useUploadImageMutation } from "@/redux/features/image-upload/imageUploadApi";
import { useUpdateUserMutation } from "@/redux/features/user/userApi";

const ProfilePage = () => {
  const { user } = useSelector(selectAuth);
  const [image, setImage] = useState(user?.profileImage || commenterIcon);
  const [uploadImage] = useUploadImageMutation();
  const [updateUser] = useUpdateUserMutation();
  const dispatch = useDispatch();

  // Define validation schema
  const ProfileSchema = Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    username: Yup.string().required("Username is required"),
    role: Yup.string().required("Role is required"),
  });

  // Set initial values from Redux
  const initialValues = {
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    username: user?.username || "",
    role: user?.role || "",
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await uploadImage(formData).unwrap(); // Call mutation
      setImage(data.url); // Update profile picture
    } catch (error) {
      console.error("Upload Error:", error);
    }
  };

   // Handle Form Submission
   const handleSubmit = async (values, { setSubmitting }) => {
 
    const formData = { ...values, profileImage: image };

    try {
      const updatedUser = await updateUser(formData).unwrap();
      dispatch(setUser(updatedUser));
    } catch (error) {
      console.error('User creation failed:', error);
    }

    setSubmitting(false);
  };


  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Profile" />
      <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
        <Formik
          initialValues={initialValues}
          validationSchema={ProfileSchema}
          onSubmit={handleSubmit}
          enableReinitialize // Ensures form updates if Redux state changes
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Profile Picture Section */}
              <div className="flex flex-col sm:flex-row items-center mb-6">
                <img
                  src={image}
                  alt="Profile"
                  className="rounded-full w-20 h-20 object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">
                    {user?.firstname} {user?.lastname}
                  </h3>
                  <p className="text-gray-400">{user?.email}</p>
                  <label className="block mt-3 cursor-pointer">
                    <span className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded transition duration-200">
                      Edit Picture
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </div>

              {/* Name Fields */}
              <div className="flex gap-4 mt-4">
                <div className="w-full">
                  <Field
                    name="firstname"
                    className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="First Name"
                  />
                  <ErrorMessage
                    name="firstname"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="w-full">
                  <Field
                    name="lastname"
                    className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Last Name"
                  />
                  <ErrorMessage
                    name="lastname"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Email & Username */}
              <div className="flex gap-4 mt-4">
                <div className="w-full">
                  <Field
                    name="username"
                    className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Username"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="w-full">
                  <Field
                    name="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email"
                    disabled
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Role */}
              <div className="mt-4">
                <Field
                  name="role"
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Role"
                  disabled={user?.role !== "admin"}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded transition duration-200"
                disabled={isSubmitting}
              >
                Save Changes
              </button>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
};

export default ProfilePage;
