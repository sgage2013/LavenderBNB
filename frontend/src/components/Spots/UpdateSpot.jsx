import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getSpotById, updateSpot } from "../../store/Spots/spotThunks";
import { useParams, useNavigate } from "react-router-dom";


const UpdateSpot = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const spot = useSelector((state) => state.spots.singleSpot);

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    lat: "",
    lng: "",
    name: "",
    description: "",
    price: "",
    images: [],
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(false);

  useEffect(() => {
        if(!spot || spot.id !== parseInt(spotId)){
            dispatch(getSpotById(spotId))
        }
  }, [dispatch, spotId])

  useEffect(() => {
    console.log('Spot data:', spot)
    if (spot && spot.id === parseInt(spotId)) {
      setFormData(() => ({
        address: spot.address || "",
        city: spot.city || "",
        state: spot.state || "",
        country: spot.country || "",
        lat: spot.lat,
        lng: spot.lng,
        description: spot.description || "",
        price: spot.price || "",
        name: spot.name || "",
        previewImage: spot.previewImage || "",
        imageTwo: spot.imageTwo || "",
        imageThree: spot.imageThree || "",
        imageFour: spot.imageFour || "",
        imageFive: spot.imageFive || "",
      }));
    }
  }, [spot, spotId]);

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
}

    const validateForm = () => {
      const validationErrors = {};

      if (!formData.country) {
        validationErrors.country = "Country is required";
      }
      if (!formData.state) {
        validationErrors.state = "State is required";
      }
      if (!formData.city) {
        validationErrors.city = "City is required";
      }
      if (!formData.address) {
        validationErrors.address = "Address is required";
      }
      if (!formData.description) {
        validationErrors.description =
          "Description must be at least 30 characters";
      } 
       if (formData.description.length < 30) {
        validationErrors.description =
          "Description must be at least 30 characters";
      }
      if (!formData.name) {
        validationErrors.name = "Name is required";
      }
      if (!formData.price) {
        validationErrors.price = "Price per night is required";
        if(!formData.previewImage) {
            validationErrors.previewImage = 'Preview image is required'
        }
      }

      setErrors(validationErrors);
      return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateForm()) {
        return;
      }
      setSubmitStatus(true);
    

      const updatedSpot = {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        price: formData.price,
        description: formData.description,
        name: formData.name,
        images: [
          formData.previewImage,
          formData.imageTwo,
          formData.imageThree,
          formData.imageFour,
          formData.imageFive,
        ].filter((image) => image),
      };
      try {
        await dispatch(updateSpot(spotId, updatedSpot));
        setSubmitStatus(false);
        navigate(`/spots/${spotId}`);
      } catch {
        setErrors({});
        setSubmitStatus(false);
      }
    };
    return (
      <form onSubmit={handleSubmit}>
        <div className="update-form">
          <h1>Update Your Spot</h1>

          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleFormData}
          />
          {errors.country && <p className='error'>{errors.country}</p>}

          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleFormData}
            />
            {errors.state && <p className='error'>{errors.state}</p>}

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleFormData}
            />
            {errors.city && <p className='error'>{errors.city}</p>}

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleFormData}
            />
            {errors.address && <p className='error'>{errors.address}</p>}

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleFormData}
            />
            {errors.name && <p className='error'>{errors.name}</p>}

          <input
            type="text"
            name="price"
            placeholder="Price per night"
            value={formData.price}
            onChange={handleFormData}
            />
            {errors.price && <p className='error'>{errors.price}</p>}

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            cols='35'
            rows='7'
            wrap='soft'
            onChange={handleFormData}
            />
            {errors.description && <p className='error'>{errors.description}</p>}

          <input
            type="text"
            name="previewImage"
            placeholder="Preview Image URL"
            value={formData.previewImage}
            onChange={handleFormData}
            />
           {errors.previewImage && <p className='error'>{errors.previewImage}</p>}

          <input
          type="text"
          name="imageTwo"
          placeholder="Image 2 URL"
          value={formData.imageTwo}
          onChange={handleFormData}
          />

          <input
          type="text"
          name="imageThree"
          placeholder="Image 3 URL"
          value={formData.imageThree}
          onChange={handleFormData}
          />

          <input
          type="text"
          name="imageFour"
          placeholder="Image 4 URL"
          value={formData.imageFour}
          onChange={handleFormData}
          />

          <input
          type="text"
          name="imageFive"
          placeholder="Image 5 URL"
          value={formData.imageFive}
          onChange={handleFormData}
          />
        </div>
        <button type="submit" disabled={submitStatus}> Update your Spot</button>
      </form>
    );
  
}

export default UpdateSpot;
