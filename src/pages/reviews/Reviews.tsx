import { useState } from "react";
import commenterIcon from "@/assets/avatar.png";
import { format } from "date-fns";
import RatingStars from "@/components/RatingStars";
import ReviewModal from "@/components/ReviewModal";

const Reviews = ({ productReviews }) => {
  const reviews = productReviews || [];
  const [modalOpen, setModalOpen] = useState(false);

  const handleReviewModalClose = () => {
    setModalOpen(false);
  };

  const handleReviewModalOpen = () => {
    setModalOpen(true);
  };

  return (
    <div className="my-6 bg-white p-8">
      <div>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <>
            <h3 className="text-lg font-medium">Reviews ({reviews.length})</h3>
            {reviews.map((review, index) => (
              <div key={index} className="border-b border-gray-200 py-4 mt-4">
                <div className="flex gap-4 items-center">
                  <img
                    src={commenterIcon}
                    alt="commenter"
                    className="size-14 rounded-full object-cover"
                  />
                  <div className="space-y-1">
                    <p className="font-semibold">{review?.user?.firstname}</p>
                    <p className="text-[12px]">
                      {format(new Date(review.updatedAt), "yyyy-MM-dd")}
                    </p>
                    <RatingStars rating={review?.rating} />
                  </div>
                </div>
                <div className="text-gray-600 mt-5 border p-8">
                  <p>{review?.review}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {/* add review button */}
      <div>
        <button
          className="flex items-center justify-center px-6 py-3 bg-primary text-white hover:bg-indigo-500 font-medium rounded-md mt-8"
          onClick={handleReviewModalOpen}
        >
          Add a review
        </button>
      </div>
      {/* review modal */}
      {modalOpen && (
        <ReviewModal
          isModalOpen={modalOpen}
          handleModalClose={handleReviewModalClose}
        />
      )}
    </div>
  );
};

export default Reviews;
