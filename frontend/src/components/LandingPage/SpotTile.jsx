import noPhoto from '../../assets/noPhoto.png'
import { NavLink } from 'react-router-dom';
import './SpotTile.css';


function SpotTile ({ spot }) {
    const {id, name, city, state, price, previewImage, rating} = spot;
    const spotRating = rating ? rating : 'New'
    const imgSrc = previewImage || noPhoto

    return  (
        <div className="spot-name">
            <NavLink to={`/spots/${id}`} className="spot-link">
            <img src={imgSrc}
            alt={name}
            className="spot-photo"
            />
            </NavLink>
          
            <div className="spot-details">
                <h2>{name}</h2>
                <p>{city}, {state}</p>
                <p>${price} per night</p>
                <p>Rating: {spotRating}</p>
                </div>

            </div>
    )
}

export default SpotTile;