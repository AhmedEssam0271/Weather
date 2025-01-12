import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import PropTypes from "prop-types";
const TempAndDetails = ({
  weatherData: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    humidity,
    sunrise,
    sunset,
    speed,
    feels_like,
  },
  units,
}) => {
  const verticalDetails = [
    {
      id: 1,
      Icon: <FaThermometerEmpty size={18} className="mr-1" />,
      Title: "Real Feel",
      value: `${feels_like.toFixed()}°`,
    },
    {
      id: 2,
      Icon: <BiSolidDropletHalf size={18} className="mr-1" />,
      Title: "Humidity",
      value: `${humidity.toFixed()}%`,
    },
    {
      id: 3,
      Icon: <FiWind size={18} className="mr-1" />,
      Title: "Wind",
      value: `${speed} ${units === "metric" ? "m/s" : "mph"}`,
    },
  ];
  const horizontalDetails = [
    {
      id: 1,
      Icon: <GiSunrise size={30} className="mr-1" />,
      Title: "Sunrise",
      value: `${sunrise}`,
    },
    {
      id: 2,
      Icon: <GiSunset size={30} className="mr-1" />,
      Title: "Sunset",
      value: `${sunset}`,
    },
    {
      id: 3,
      Icon: <MdKeyboardArrowUp size={30} className="mr-1" />,
      Title: "High",
      value: `${temp_max.toFixed()}°`,
    },
    {
      id: 4,
      Icon: <MdKeyboardArrowDown size={30} className="mr-1" />,
      Title: "Low",
      value: `${temp_min.toFixed()}°`,
    },
  ];

  return (
    <div>
      <div className="flex justify-center items-center py-6 text-3xl text-cyan-100 ">
        <p>{details}</p>
      </div>
      <div className="flex flex-row justify-between items-center py-3 ">
        <img src={icon} alt="Weather-Icon" className="w-36" />
        <p className="text-5xl">{`${temp.toFixed()}`} &deg;</p>
        <div className="flex space-y-3 items-start flex-col">
          {verticalDetails.map(({ id, Icon, Title, value }) => (
            <div
              key={id}
              className="flex items-center justify-center font-light text-sm"
            >
              {Icon}
              {Title} <span className="font-medium ml-1">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-row justify-center items-center space-x-10 text-sm py-3 ">
        {horizontalDetails.map(({ id, Icon, Title, value }) => (
          <div
            key={id}
            className="flex items-center justify-center font-light text-sm"
          >
            {Icon}
            <p className="font-light ml-1">
              {Title} <span className="font-medium ml-1">{value}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

TempAndDetails.propTypes = {
  weatherData: PropTypes.shape({
    details: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    temp_min: PropTypes.number.isRequired,
    temp_max: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
    sunrise: PropTypes.string.isRequired,
    sunset: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired,
    feels_like: PropTypes.number.isRequired,
  }).isRequired,
  units: PropTypes.string.isRequired,
};

export default TempAndDetails;
