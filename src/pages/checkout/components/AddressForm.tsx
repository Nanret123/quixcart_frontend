import {
  useAddAddressMutation,
  useUpdateAddressMutation,
} from "@/redux/features/address/addressApi";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface IFormValues {
  phoneNumber: string;
  alternatePhoneNumber: string;
  streetName: string;
  nearestLandMark: string;
  city: string;
  state: string;
  notes?: string;
}

const AddressForm = ({
  refetchAddresses,
  addressBeingEdited,
  setEditAddress,
}) => {
  const [addAddress] = useAddAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();

  const isEditing = Boolean(addressBeingEdited);

  const initialValues: IFormValues = isEditing
    ? { ...addressBeingEdited }
    : {
        phoneNumber: "",
        alternatePhoneNumber: "",
        streetName: "",
        nearestLandMark: "",
        city: "",
        state: "",
        notes: "",
      };

  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .matches(/^\d{10,15}$/, "Invalid phone number")
      .required("Phone number is required"),
    alternatePhoneNumber: Yup.string().matches(
      /^\d{10,15}$/,
      "Invalid alternate number"
    ), 
    streetName: Yup.string().required("Street name is required"),
    nearestLandMark: Yup.string().required("Nearest Landmark is required"), // ✅ Correct key
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    notes: Yup.string(),
  });

  const handleSubmit = async (
    values: IFormValues,
    { setSubmitting, resetForm }
  ) => {
    try {
      if (isEditing && addressBeingEdited) {
        // Ensure no unwanted fields are included in the update

        // Prepare the updated data by combining the values from the form and the existing address
        const updatedData = { ...addressBeingEdited, ...values };

        const { _id, createdAt, updatedAt, __v, user, ...address } =
        updatedData;

        // Update address
        await updateAddress({
          id: updatedData._id,
          ...address,
        }).unwrap();

        toast.success("Address updated!");
      } else {
        await addAddress(values).unwrap();
        toast.success("Address added!");
      }
      refetchAddresses();
      resetForm();
      setEditAddress(null);
    } catch (error) {
      toast.error("Error submitting address. Please try again.");
      console.error("Error submitting address:", error);
    }
    setSubmitting(false);
  };

  return (
    <>
      <h2 className="text-lg text-gray-800">
        {isEditing ? "Edit Address" : "Add New Address"}
      </h2>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-5">
            {/* Phone Number Fields */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="w-full">
                <Field
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className="w-full bg-gray-100 focus:outline-none px-5 py-3 border border-gray-300 rounded-lg"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="w-full">
                <Field
                  type="text"
                  name="alternatePhoneNumber"
                  placeholder="Alternate Number"
                  className="w-full bg-gray-100 focus:outline-none px-5 py-3 border border-gray-300 rounded-lg"
                />
                <ErrorMessage
                  name="alternatePhoneNumber"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            {/* Street Name */}
            <div>
              <Field
                type="text"
                name="streetName"
                placeholder="Street Name"
                className="w-full bg-gray-100 focus:outline-none px-5 py-3 border border-gray-300 rounded-lg"
              />
              <ErrorMessage
                name="streetName"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Landmark */}
            <div>
              <Field
                type="text"
                name="nearestLandMark"
                placeholder="Nearest Landmark"
                className="w-full bg-gray-100 focus:outline-none px-5 py-3 border border-gray-300 rounded-lg"
              />
              <ErrorMessage
                name="nearestLandMark"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* City & State */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="w-full">
                <Field
                  type="text"
                  name="city"
                  placeholder="City"
                  className="w-full bg-gray-100 focus:outline-none px-5 py-3 border border-gray-300 rounded-lg"
                />
                <ErrorMessage
                  name="city"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="w-full">
                <Field
                  type="text"
                  name="state"
                  placeholder="State"
                  className="w-full bg-gray-100 focus:outline-none px-5 py-3 border border-gray-300 rounded-lg"
                />
                <ErrorMessage
                  name="state"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>
            {/* Notes */}
            <div>
              <Field
                as="textarea"
                name="notes"
                rows="4"
                className="border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 rounded-lg w-full p-2.5"
                placeholder="Additional notes for delivery"
              />
              <ErrorMessage
                name="notes"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
              >
                {isEditing ? "Update Address" : "Submit"}
              </button>

              {isEditing && (
                <button
                  type="button"
                  className="border bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors w-full sm:w-auto"
                  onClick={() => setEditAddress(null)}
                >
                  Cancel Editing
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddressForm;
