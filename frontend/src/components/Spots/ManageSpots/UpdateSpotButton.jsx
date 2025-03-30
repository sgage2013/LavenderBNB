import { Link } from 'react-router-dom'

const UpdateSpotButton = ({ spotId }) => {
    return (
        <Link to={`/spots/update/${spotId}`}>

        </Link>
    )
}

export default UpdateSpotButton;