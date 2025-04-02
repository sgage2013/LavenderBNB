import { useDispatch } from "react-redux";
import { deleteReview, getSpotReviews } from "../../store/Reviews/ReviewThunks";
import { useModal } from "../../context/modal";

const DeleteReviewModal = ({ spotId, reviewId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async () => {
    await dispatch(deleteReview(reviewId));
    await dispatch(getSpotReviews(spotId));
    closeModal();
  };
  return (
    <div className="delete-review-modal">
      <div className="modal-header">
        <h2>Confirm Delete</h2>
      </div>
      <p>Are you sure you want to delete this review?</p>
      <div className="modal-button">
        <button onClick={handleDelete}>Yes (Delete Review)</button>
        <button onClick={closeModal}>No (Keep Review)</button>
      </div>
    </div>
  );
};

export default DeleteReviewModal;
