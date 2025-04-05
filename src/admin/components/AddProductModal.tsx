import { useUploadImageMutation } from "@/redux/features/image-upload/imageUploadApi";
import { useAddOneProductMutation } from "@/redux/features/product/productApi";
import { Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Form } from "react-router-dom";
import * as Yup from "yup";

interface ModalProps {
  isModalOpen: boolean;
  handleModalClose: () => void;
}

const AddProduct: React.FC<ModalProps> = ({
  isModalOpen,
  handleModalClose,
}) => {
  const [uploadImage] = useUploadImageMutation();
  const [addOneProduct] = useAddOneProductMutation();
  const [image, setImage] = useState("");

  const initialValues = {
    name: "",
    price: "",
    oldPrice: "",
    category: "",
    color: "",
    description: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    color: Yup.string().required("Product color is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be greater than zero")
      .required("Price is required"),
    category: Yup.string().required("Category is required"),
    description: Yup.string()
      .min(10, "Description should be at least 10 characters")
      .required("Description is required"),
  });

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

  const handleSubmit = async (values, { setSubmitting }) => {
  
     const formData = { ...values, image: image };
 
     try {
       const createdProduct = await addOneProduct(formData).unwrap();
     } catch (error) {
       console.error('User creation failed:', error);
     }finally {
      setSubmitting(false);
      handleModalClose();
    }
   };

  return createPortal(
    <div
      className={`fixed z-10 inset-0 overflow-y-auto bg-black/50 items-center justify-center px-2 ${
        isModalOpen ? "flex" : "hidden"
      }`}
    >
      <div className="p-8 w-[40rem]  bg-white rounded-xl shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add New Product</h2>
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={handleModalClose}
          >
            <span className="ri-close-line"></span>
          </button>
        </div>
        {/* form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({isSubmitting, errors, touched }) => (
            <Form className="grid gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Product Name
                </label>
                <Field
                  type="text"
                  name="name"
                  className="border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full p-2.5"
                  placeholder="Type product name"
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium">
                    Price (₦)
                  </label>
                  <Field
                    type="number"
                    name="price"
                    className="border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full p-2.5"
                    placeholder="2999"
                  />
                  <ErrorMessage
                    name="price"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium">
                    Old Price (₦)
                  </label>
                  <Field
                    type="number"
                    name="price"
                    className="border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 rounded-lg w-full p-2.5"
                    placeholder="2999"
                  />
                  <ErrorMessage
                    name="price"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium"
                  >
                    Category
                  </label>
                  <Field
                    as="select"
                    name="category"
                    className="border border-gray-300 rounded-lg w-full p-2.5"
                  >
                    <option value="">Select category</option>
                    <option value="dress">Dress</option>
                    <option value="jewelry">Jewelry</option>
                    <option value="accessories">Accessories</option>
                    <option value="cosmetics">Cosmetics</option>
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="color" className="block text-sm font-medium">
                    color
                  </label>
                  <Field
                    type="string"
                    name="color"
                    className="border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 rounded-lg w-full p-2.5"
                    placeholder="black"
                  />
                  <ErrorMessage
                    name="color"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Product Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleImageUpload(event)}
                  className="border w-full p-2.5 cursor-pointer border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {image && (
                  <img
                    src={image}
                    alt="Preview"
                    className="mt-2 w-32 h-32 object-cover"
                  />
                )}
                <ErrorMessage
                  name="image"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium"
                >
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  rows="4"
                  className="border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 rounded-lg w-full p-2.5"
                  placeholder="Your description here"
                />
                <ErrorMessage
                  name="description"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full  bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition"
              >
                {isSubmitting ? "Creating Product..." :  "Add Product"}
              </button>
            </Form>
          )}
        </Formik>

        {/* ... */}
      </div>
    </div>,
    document.body
  );
};

export default AddProduct;
