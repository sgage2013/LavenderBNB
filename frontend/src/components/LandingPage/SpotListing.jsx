import React, { useEffect, useState} from "react";
import { Link } from 'react-router-dom'
import './SpotListing.css';
import noPhoto from '../../assets/images/noPhoto.png'
import { getAllSpots } from "../../store/Spots/spotThunks";

function SpotTile ({ spot }) {
    const {id, name, city, state, price, SpotImages, rating} = spot;
    const spotRating = rating ? rating: 'New'
    const imgSrc = (SpotImages && SpotImages.length > 0 && SpotImages[0].url) ? SpotImages[0].url : noPhoto
    return  (
        <div className="spot-name">
            <Link to={`/spots/${id}`} className="spot-link">
            <img src={imgSrc}
            alt={name}
            className="spot-photo"
            />
            </Link>
          
            <div className="spot-details">
                <h2>{name}</h2>
                <p>{city}, {state}</p>
                <p>${price} per night</p>
                <p>Rating: {spotRating}</p>
                </div>
        </div>
    )
}
function SpotListing() {
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        fetch(getAllSpots)
            .then((res) => res.json())
            // console.log(spotsData)
            .then((spotsData) => setSpots(spotsData.Spots))
    }, [])


return (
    <div className="spot-listing">
        {spots.length > 0 ? (
            spots.map((spot) => (
                <SpotTile key={spot.id} spot={spot}/>
            ))
        ) : (
            <p>No Spots Available</p>
        )
        }
    </div>
)
}

export default SpotListing;