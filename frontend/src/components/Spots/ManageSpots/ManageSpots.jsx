import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserSpot } from "../../../store/Spots/spotThunks";
import { NavLink, useNavigate } from "react-router-dom";
import SpotTile from "../../LandingPage/SpotTile";
import DeleteSpotModal from "../DeleteSpotModal";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";

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
      {!userSpots && userSpots.length === 0 ? (
        <NavLink to="/spots/new"> Create a New Spot</NavLink>
      ) : (
        <div>
          {spotsArray &&
            spotsArray.map((spot) => (
              <div
                key={spot.id}
                onClick={(e) => handleNavigation(e, spot.id, null)}
              >
                <SpotTile spot={spot} />
                <button
                  onClick={(e) => handleNavigation(e, spot.id, "edit")}
                  className="update-spots-button"
                >
                  Update Your Spot
                </button>
                <OpenModalButton 
        itemText="Delete Your Spot"
        modalComponent={<DeleteSpotModal spotId={spot.id}/>}
      />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ManageSpots;
