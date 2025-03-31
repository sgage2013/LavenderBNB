import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSpotById } from "../../store/Spots/spotThunks";
import { getSpotReviews } from "../../store/Reviews/ReviewThunks";
// import { FaStar } from "react-icons/fa";
import noPhoto from "../../assets/noPhoto.png";

function SpotDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleSpot = useSelector((state) => state.spots.singleSpot);
  const reviews = useSelector((state) => state.reviews.allReviews);
  const avgRating = useSelector((state) => state.reviews.avgRating || 'New');

  console.log('reviews & rating', reviews, avgRating, singleSpot)
  
  useEffect(() => {
      dispatch(getSpotById(id));
    }, [dispatch, id]);
    
    useEffect(() => {
        if(singleSpot){
      dispatch(getSpotReviews(id));
        }
    }, [dispatch, id, singleSpot]);

    if (!reviews || !singleSpot) {
      return <div>Loading...</div>;
    }
    const reviewsArray = Object.values(reviews)

  const calculateAvgRating = (reviews) => {
    console.log('reviews', reviews)
    if (reviews.length === 0){
        return 'New';
    }
    let totalStars = 0;
   reviews.forEach((review)=>  {
        totalStars += review.stars;
    })    
    return (totalStars / reviews.length).toFixed(1)
  }

  
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
                "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
            ];
            const d = new Date(date)
            const day = d.getDate();
            const month = months[d.getMonth()];
            const year = d.getFullYear();
            return `${month} ${day} ${year}`;     
             
        }

  return (
    <div className="spot-details">
      <h1>{name}</h1>
      <p>{`${address} ${city}, ${state}, ${country}`}</p>
      <img src={imgUrl} />
      {otherImg.map((img, idx) => (
        <img key={idx} src={img.url} alt={`Image ${idx + 1}`} />
      ))}
      <h3>Hosted by: {name}</h3>
      <p>{description}</p>
      <div>
        <p>{price} night</p>
        <button onClick={handleClick}>Reserve</button>
      </div>
      <div className="reviews">
        <div className="ratings">
            {avgRating === 'New' ? (
                <p>New</p>
            ) : (
                <p>
                {calculateAvgRating(reviewsArray)} ·  {reviewsArray.length} {reviewsArray.length === 1  ? 'Review' : 'Reviews'}
                </p>
            )}
        </div>
        {reviewsArray.length === 0 ? (
            <p>Be the first to post a review!</p>
        ) : (
            reviewsArray.map((review) => (
                <div key={review.id}>
                    <p>{review.User ? review.User.firstName : 'Unknown'} - {createDate(review.createdAt)}</p>
                    <p>{review.comment}</p>
                    <p>{review.stars} Stars</p>
                </div>
            ))
        )}
      </div>
    </div>
  );
}

export default SpotDetails;
