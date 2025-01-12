import { BiSearch, BiCurrentLocation } from "react-icons/bi";
import PropTypes from "prop-types";
import { useState } from "react";

function Inputs({ setQuery, setUnits }) {
  const [city, setCity] = useState("");

  const handelSearchOnClick = () => {
    if (city !== "") {
      setQuery({ q: city });
    }
  };

  const handelCurrentLocationOnClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setQuery({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }
  };

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row justify-center items-center w-3/4 space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          type="text"
          placeholder="Search By City ..."
          className="text-black text-xl font-light p-2 w-full shadow-xl capitalize focus:outline-none "
        />
        <BiSearch
          size={30}
          className="cursor-pointer transition ease-out hover:scale-125 "
          onClick={handelSearchOnClick}
        />
        <BiCurrentLocation
          size={30}
          className="cursor-pointer transition ease-out hover:scale-125 "
          onClick={handelCurrentLocationOnClick}
        />
      </div>
      <div className="flex flex-row w-1/4 items-center justify-center ">
        <button
          className="text-2xl font-medium transitio ease-out hover:scale-125 "
          onClick={() => setUnits("metric")}
        >
          &deg;C
        </button>
        <p className="text-2xl font-medium mx-1">|</p>
        <button
          className="text-2xl font-medium transitio ease-out hover:scale-125 "
          onClick={() => setUnits("imperial")}
        >
          &deg;F
        </button>
      </div>
    </div>
  );
}

Inputs.propTypes = {
  setQuery: PropTypes.func.isRequired,
  setUnits: PropTypes.func.isRequired,
};

export default Inputs;
