
const Aboutus = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-4">
      {/* Main Container */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 text-center mb-6 md:mb-10">
          Flight Price Prediction System
        </h1>

        {/* Description */}
        <div className="space-y-4 text-gray-700 text-base md:text-lg leading-relaxed">
          <p>
            Welcome to the Flight Price Prediction System! Our mission is to help travelers plan
            their trips more effectively by providing accurate predictions of airline ticket prices.
            Our system utilizes data analysis, machine learning, and statistical modeling techniques
            to examine historical flight data and forecast future prices.
          </p>
          <p>
            Our model considers key parameters like the number of stops, journey day, journey month,
            airline type (e.g., Air India, IndiGo), source, destination, and more to predict flight
            prices. After training this model using a powerful machine learning algorithm—the Random
            Forest Regressor—we fine-tune it using hyperparameter tuning to achieve a high level of
            accuracy.
          </p>
          <p>
            This system is designed to assist not only travelers but also travel agencies and
            airlines in refining their pricing strategies. We are committed to providing reliable
            and insightful price forecasts to enhance travel planning for everyone.
          </p>
        </div>
        </div>
      </div>
    
  );
};

export default Aboutus;

