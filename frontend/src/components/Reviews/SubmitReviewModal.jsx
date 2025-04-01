import { useState } from "react";
import { useDispatch } from "react-redux";
import { createReview } from "../../store/Reviews/ReviewThunks";
import { FaStar } from "react-icons/fa";
import { useModal } from "../../context/modal";

function SubmitReviewModal({spotId}) {
    const dispatch = useDispatch();
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(0)
    const [errors, setErrors] = useState([])
    const {closeModal} = useModal()

    const postReview = async (e) => {
        e.preventDefault()
        setErrors([]);

        if(review.length < 10){
            setErrors(["Review must be at least 10 characters"]);
            return;
        }
        if(stars === 0){
            setErrors(["Star rating is required"]);
            return;
        }
        const newReview = {review, stars};
        const res = await dispatch(createReview(spotId, newReview))
        if(res.errors){
            setErrors(res.errors)
        } else{
            closeModal();
        }
    }

    return (
        <div className="review-modal">
            <h2>How was your stay?</h2>
            {errors.length > 0 && (
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
            )}
            <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="Leave your review here"></textarea>
            <div>
                <label>Stars: </label>
                <div>
                {[1, 2, 3, 4, 5].map((numStars) => (
                    <span key={numStars} onClick={() => setStars(numStars)}>
                    <FaStar color='gold'/></span>
                ))}
                    </div>
                </div>
            <button onClick={postReview} disabled={review.length < 10 || stars === 0}>Submit Your Review</button>
        </div>
    )


}

export default SubmitReviewModal;