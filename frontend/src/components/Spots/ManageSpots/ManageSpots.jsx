import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserSpot } from "../../../store/Spots/spotThunks";
import { NavLink, useNavigate } from "react-router-dom";
import SpotTile from "../../LandingPage/SpotTile";
import DeleteSpotModal from "../DeleteSpotModal";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import './ManageSpots.css'

const ManageSpots = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSpots = useSelector((state) => state.spots.userSpots);
  const spotsArray = userSpots ? Object.values(userSpots) : [];

  const handleNavigation = (e, num, endpoint) => {
    e.stopPropagation();
    if (!endpoint) {
      navigate(`/spots/${num}`);
    } else {
      navigate(`/spots/${num}/edit`);
    }
  };

  useEffect(() => {
    dispatch(getUserSpot());
  }, [dispatch]);

  return (
    <div className="manage-spots">
      <h1>Manage Spots</h1>
        
      {userSpots.length === 0 ? (
        <NavLink className='create-spot-button' to="/spots/new"> Create a New Spot</NavLink>
      ) : (
        <div className="spots-grid">
          {spotsArray &&
            spotsArray.map((spot) => (
              <div className='spot-tile'
                key={spot.id}
                onClick={(e) => handleNavigation(e, spot.id, null)}
              >
                <div className='spot-image'>
                  <NavLink to={`/spots/${spot.id}`}>
                  <img src={spot.previewImage} alt={spot.name}/>
                  </NavLink>
                  </div>
                {/* <SpotTile spot={spot} /> */}
                <div className="spot-details">
                  <p>{spot.city}, {spot.state}</p>
                  <p>{spot.price} night</p>
                  <p>Rating: {spot.avgRating || "New"}</p>
                  </div>
                  <div className='spots-actions'>
                <button
                  onClick={(e) => handleNavigation(e, spot.id, "edit")}
                  className="update-spots-button"
                >
                  Update
                </button>
                <div className="delete-spot">
                <OpenModalButton 
        itemText="Delete"
        modalComponent={<DeleteSpotModal spotId={spot.id}/>}
      />
      </div>
      </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ManageSpots;
