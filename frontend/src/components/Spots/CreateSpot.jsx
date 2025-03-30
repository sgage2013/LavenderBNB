import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSpot } from "../../store/Spots/spotThunks";
import { useNavigate } from "react-router-dom";

function CreateSpot() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    lat: 73.877,
    lng: -125.876,
    name: "",
    description: "",
    price: "",
    previewImage: "",
    imageTwo: "",
    imageThree: "",
    imageFour: "",
    imageFive: "",
  });

  const handleFormData = (e) => {
    setErrors({});
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
   const validateForm = () => { 
    let validationErrors = {};

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
    }
    if (!formData.previewImage){
        validationErrors.previewImage = 'Must have at least one image'
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validateForm()){
        return
    }
    
    const createdSpot = {
        ...formData,
        price: parseFloat(formData.price),
        lat: parseFloat(formData.lat),
        lng: parseFloat(formData.lng)
    };

    const res = await dispatch(createSpot(createdSpot));
    if (res) {
        setFormData({
            address: "",
            city: "",
            state: "",
            country: "",
            lat: 37.897,
            lng: -124.97,
            name: "",
            description: "",
            price: "",
            previewImage: "",
            imageTwo: "",
            imageThree: "",
            imageFour: "",
            imageFive: "",
        });
        setErrors({});
        navigate(`/spots/${res.id}`);
    }
    }
  



  return (
    <div className="spot-form">
      <h1>Create a New Spot!</h1>

      <h2>Where's your place located?</h2>
      <span>
        Guests will only get your address once they book a reservation.
      </span>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleFormData}
        />
        {errors.country && <p className="error">{errors.country}</p>}

        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleFormData}
        />
        {errors.state && <p>{errors.state}</p>}

        <input
          type="input"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleFormData}
        />
        {errors.city && <p>{errors.city}</p>}

        <input
          type="input"
          name="address"
          placeholder="Street Address"
          value={formData.address}
          onChange={handleFormData}
        />
        {errors.address && <p>{errors.address}</p>}

        <h2>Describe your place to guests</h2>
        <span>
          Mention the best features of your space, any special amenities like
          fast wifi or parking, and what you love about the neighborhood.{" "}
        </span>

        <textarea
          name="description"
          placeholder="Please write at least 30 charaters"
          cols='35'
          rows='7'
          wrap="soft"
          value={formData.description}
          onChange={handleFormData}>
        </textarea>
        {errors.description && <p>{errors.description}</p>}

          

        <h2>Create a title for your spot</h2>
        <span>
          Catch guest&apos;s attention with a spot title that highlights what makes
          your place special.
        </span>

        <input
          type="text"
          name="name"
          placeholder="Name your spot"
          value={formData.name}
          onChange={handleFormData}
        />
        {errors.name && <p>{errors.name}</p>}

        <h2>Set a base price for your spot</h2>
        <span>
          Competitive pricing can help your listing stand out and rank higher in
          search results
        </span>

        <input
          type="number"
          name="price"
          placeholder="Price per night (USD)"
          value={formData.price}
          onChange={handleFormData}
        />
        {errors.price && <p>{errors.price}</p>}

        <h2>Liven up your spot with photos </h2>
        <span>Submit a link to at least one photo to publish your spot </span>

        <input
          type="text"
          name="previewImage"
          placeholder="Preview image URL"
          value={formData.previewImage}
          onChange={handleFormData}
        />
        {errors.previewImage && <p>{errors.previewImage}</p>}

        <input
          type="text"
          name="imageTwo"
          placeholder="Image URL"
          value={formData.imageTwo}
          onChange={handleFormData}
        />

        <input
          type="text"
          name="imageThree"
          placeholder="Image URL"
          value={formData.imageThree}
          onChange={handleFormData}
        />

        <input
          type="text"
          name="imageFour"
          placeholder="Image URL"
          value={formData.imageFour}
          onChange={handleFormData}
        />

        <input
          type="text"
          name="imageFive"
          placeholder="Image URl"
          value={formData.imageFive}
          onChange={handleFormData}
        />

        <button type="submit" 
        disabled={Object.keys(errors).length > 0}
        >
          Create Spot
        </button>
      </form>
    </div>
  );
}

export default CreateSpot;
