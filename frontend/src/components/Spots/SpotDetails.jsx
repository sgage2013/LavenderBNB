import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSpotById } from "../../store/Spots/spotThunks";
import { getSpotReviews } from "../../store/Reviews/ReviewThunks";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import SubmitReviewModal from "../Reviews/SubmitReviewModal";
import DeleteReviewModal from "../Reviews/DeleteReviewModal";
import { FaStar } from "react-icons/fa";
import noPhoto from "../../assets/noPhoto.png";
import "./SpotDetails.css";

function SpotDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleSpot = useSelector((state) => state.spots.singleSpot);
  const reviews = useSelector((state) => state.reviews.allReviews);
  const avgRating = useSelector((state) => state.reviews.avgRating || "New");
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getSpotById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleSpot) {
      dispatch(getSpotReviews(id));
    }
  }, [dispatch, id, singleSpot]);

  useEffect(() => {}, [reviews]);

  if (!reviews || !singleSpot) {
    return <div>Loading...</div>;
  }
  const reviewsArray = Object.values(reviews);
  const isOwner =
    (user && user.id === singleSpot.User?.id) || user.id === singleSpot.ownerId;

  let hasReviewed = false;
  for (let i = 0; i < reviewsArray.length; i++) {
    if (reviewsArray[i].userId === (user && user.id)) {
      hasReviewed = true;
    }
  }

  const showButton = user && !isOwner && !hasReviewed;

  const calculateAvgRating = (reviews) => {
    if (reviews.length === 0) {
      return "New";
    }
    let totalStars = 0;
    reviews.forEach((review) => {
      totalStars += review.stars;
    });
    return (totalStars / reviews.length).toFixed(1);
  };

  const {
    User,
    address,
    city,
    state,
    country,
    price,
    description,
    previewImage,
    SpotImages,
  } = singleSpot;

  const imgUrl = previewImage || noPhoto;
  const otherImg = SpotImages ? SpotImages.slice(1, 5) : [];
  const name = User
    ? `${User.firstName} ${User.lastName}`
    : "Host' Name is Not Available";

  const handleClick = () => {
    alert("Feature Coming Soon!");
  };

  const createDate = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const d = new Date(date);

    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${month} ${year}`;
  };

  return (
    <div className="spot-details-container">
      <div className="spot-details">
        <h1>{singleSpot.name}</h1>
        <p>{`${address} ${city}, ${state}, ${country}`}</p>
        <div className="spot-image">
          <img src={imgUrl} />
        </div>
        <div>
          {otherImg.map((img, idx) => (
            <img key={idx} src={img.url} alt={`Image ${idx + 1}`} />
          ))}
        </div>
        <h3>Hosted by: {name}</h3>
        <p>{description}</p>
        <div>
          <div className="price-reserve-button">
          <p>{price} night</p>
            <button onClick={handleClick}>Reserve</button>
          </div>
        </div>
        <div className="ratings">
          {avgRating === "New" ? (
            <p>New</p>
          ) : (
            <p>
              <FaStar color="gold" />
              {calculateAvgRating(reviewsArray)} · {reviewsArray.length}{" "}
              {reviewsArray.length === 1 ? "Review" : "Reviews"}
            </p>
          )}
        </div>
        <div className="reviews">
          {reviewsArray.length === 0 ? (
            <p>Be the first to post a review!</p>
          ) : (
            reviewsArray.map((review) => (
              <div key={review.id} className="review-items">
                <p>
                  {review.User ? review.User.firstName : "Unknown"} -{" "}
                  {createDate(review.createdAt)}
                </p>
                <p>{review.review}</p>
                {user && review.userId === user.id && (
                  <OpenModalButton
                    itemText="Delete Your Review"
                    modalComponent={
                      <DeleteReviewModal reviewId={review.id} spotId={id} />
                    }
                  />
                )}
              </div>
            ))
          )}
        </div>
        {showButton && (
          <OpenModalButton
            itemText="Post Your Review"
            modalComponent={<SubmitReviewModal spotId={id} user={user} />}
          />
        )}
      </div>
    </div>
  );
}

export default SpotDetails;
