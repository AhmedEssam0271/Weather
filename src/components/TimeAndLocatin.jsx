import PropTypes from "prop-types";

function TimeAndLocatin({
  weatherData: { formattedLocalTime, name, country },
}) {
  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-xl font-extralight">{formattedLocalTime}</p>
      </div>
      <div className="flex items-center justify-center my-3">
        <p className="text-3xl font-medium">
          {name}, {country}
        </p>
      </div>
    </div>
  );
}

TimeAndLocatin.propTypes = {
  weatherData: PropTypes.shape({
    formattedLocalTime: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
  }).isRequired,
};

export default TimeAndLocatin;
