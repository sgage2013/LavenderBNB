import{ useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/Spots/spotThunks";
import SpotTile from "./SpotTile";



function SpotListing() {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.allSpots)
    const spotsArray = Object.values(spots || {})


    useEffect(() => {
        if(!spots){
            dispatch(getAllSpots())
        }
    }, [dispatch, spots])


   
    


return (
    <div className="spot-listing">
        {spotsArray.length > 0 ? (
            spotsArray.map((spot) => (
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