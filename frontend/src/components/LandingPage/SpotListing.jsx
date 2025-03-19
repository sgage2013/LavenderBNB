import React, { useEffect, useState} from "react";
import { Link } from 'react-router-dom'
import './SpotListing.css';
import noPhoto from '../../assets/images/noPhoto.png'

function SpotTile ({ spot }) {
    const {id, name, city, state, price, previewImage, rating} = spot;
    const spotRating = rating ? rating: 'New'

    return  (
        <div className="spot-name">
            <Link to={`/spots/${id}`} className="spot-link">
            <img src={previewImage || noPhoto}
            alt={name}
            className="spot-photo"
            />
          
            <div className="spot-details">
                <h2>{name}</h2>
                <p>{city}, {state}</p>
                <p>${price} per night</p>
                <p>Rating: {spotRating}</p>
                </div>
            </Link>
        </div>
    )
}
function SpotListing() {
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        fetch('/api/spots')
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