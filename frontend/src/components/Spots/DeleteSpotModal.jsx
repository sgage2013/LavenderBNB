import { useDispatch } from "react-redux";
import { deleteSpot } from "../../store/Spots/spotThunks";
import { useModal } from "../../context/modal";

const DeleteSpotModal = ({ spotId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async () => {
    await dispatch(deleteSpot(spotId));
    closeModal();
  };
  return (
    <div className="delete-spot-modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this spot?</p>
      <div className="delete-button">
        <button onClick={handleDelete}>Yes</button>
      </div>
      <div className="cancel-button">
        <button onClick={closeModal}>No</button>
      </div>
    </div>
  );
};

export default DeleteSpotModal;
