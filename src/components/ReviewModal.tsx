import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import { useParams } from "react-router-dom";
import {
  useCreateOrUpdateReviewMutation,
  useGetUserReviewQuery,
} from "@/redux/features/review/reviewApi";
import { toast } from "react-toastify";
import { useGetOneProductQuery } from "@/redux/features/product/productApi";

interface ReviewModalProps {
  isModalOpen: boolean;
  handleModalClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  isModalOpen,
  handleModalClose,
}) => {
  const { productId } = useParams();
  const { data: existingReview, isLoading } = useGetUserReviewQuery(productId, {
    skip: !productId,
  });
  const { refetch } = useGetOneProductQuery(productId, { skip: !productId });

  const [submitReview, { error, isLoading: isSubmitting }] =
    useCreateOrUpdateReviewMutation();

  const validationSchema = Yup.object({
    review: Yup.string().required("Review is required"),
    rating: Yup.number()
      .min(1, "Please select a rating")
      .required("Rating is required"),
  });

  const handleSubmitReview = async (values, { resetForm }) => {
    try {
      await submitReview({
        productId,
        ...values,
      }).unwrap();
      toast.success("Review submitted successfully!");
      resetForm();
      handleModalClose();
      refetch();
    } catch (error) {
      toast.error("Error submitting review. Please try again.");
      console.error("Error submitting review:", error);
      handleModalClose();
    }
  };

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto bg-black/50 items-center justify-center px-2 ${
        isModalOpen ? "flex" : "hidden"
      }`}
    >
      <div className="relative w-96 z-40 max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-medium mb-4">
          {existingReview ? "Edit Your Review" : "Post A Review"}
        </h2>

        <Formik
          initialValues={{
            review: existingReview?.review || "",
            rating: existingReview?.rating || 0,
          }}
          enableReinitialize={true} // <- This ensures Formik updates when existingReview changes
          validationSchema={validationSchema}
          onSubmit={handleSubmitReview}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    className="cursor-pointer  text-yellow-500 text-lg"
                    key={star}
                    onClick={() => setFieldValue("rating", star)}
                  >
                    {values.rating >= star ? (
                      <i className="ri-star-fill"></i>
                    ) : (
                      <i className="ri-star-line"></i>
                    )}
                  </span>
                ))}
              </div>
              <ErrorMessage
                name="rating"
                component="div"
                className="text-red-500 text-sm mb-2"
              />

              <Field
                as="textarea"
                name="review"
                className="w-full h-32  border border-gray-300 focus:outline-none p-4 rounded-md"
                placeholder="Write your review here..."
              />
              <ErrorMessage
                name="review"
                component="div"
                className="text-red-500 text-sm mb-2"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : existingReview
                    ? "Update Review"
                    : "Submit Review"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ReviewModal;
