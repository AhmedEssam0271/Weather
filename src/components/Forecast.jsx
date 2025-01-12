import PropTypes from "prop-types";

const Forecast = ({ title, data }) => {
  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="font-medium uppercase">{title}</p>
      </div>
      <hr className="my-1" />
      <div className="flex items-center justify-between">
        {data.map((d, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center w-1/5 h-24 bg-gray-300 bg-transparent rounded-lg shadow-md ml-1"
          >
            <p className="text-sm font-medium">{d.title}</p>
            <img src={d.icon} alt="weather icon" className="w-12 h-12 my-1" />
            <p className="font-medium">{`${d.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

Forecast.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      temp: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Forecast;
