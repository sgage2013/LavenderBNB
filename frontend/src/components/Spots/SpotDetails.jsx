import { useEffect,  } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { getSpotById } from "../../store/Spots/spotThunks";
import noPhoto from '../../assets/noPhoto.png'


function SpotDetails() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const singleSpot = useSelector(state => state.spots.singleSpot)

    console.log(singleSpot)

    useEffect(() => {
        dispatch(getSpotById(id))
        
        }, [dispatch, id])
    

    if (!singleSpot) {
        return <div>
            Loading...
        </div>
    }

    const {User, address, city, state, country, price, description, previewImage, SpotImages} = singleSpot




    const imgUrl = previewImage || noPhoto
    const otherImg = SpotImages ? SpotImages.slice(1,5) : []
    const name = User ? `${User.firstName} ${User.lastName}` : "Host' Name is Not Available"

    const handleClick = () => {
        alert('Feature Coming Soon!')
    };

    return (
        <div className="spot-details">
            <h1>{name}</h1>
            <p>{`${address} ${city}, ${state}, ${country}`}</p>
            <img src={imgUrl}/>
            {otherImg.map((img,idx) => (
                <img 
                key={idx} 
                src={img.url}
                alt={`Image ${idx + 1}`}/>
            )
        )}
        <h3>Hosted by: {name}</h3>
        <p>{description}</p>
        <div>
          <p>{price} night</p> 
          <button onClick={handleClick}>Reserve</button> 
        </div>
        </div>
    );
}

export default SpotDetails;