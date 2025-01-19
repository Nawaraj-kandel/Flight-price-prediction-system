

const Aboutus = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-4">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-700 text-center mb-6 md:mb-10">
        Flight Price Prediction System
      </h1>
      <p className="text-gray-700 text-base md:text-lg leading-relaxed">
        Welcome to the Flight Price Prediction System! Our mission is to help travelers plan their trips more effectively by providing accurate predictions of airline ticket prices. Our system utilizes data analysis, machine learning, and statistical modeling techniques to examine historical flight data and forecast future prices. By understanding potential price trends, we aim to offer insights that can help travelers make informed decisions and optimize their travel expenses.
      </p>
      <p className="text-gray-700 text-base md:text-lg leading-relaxed mt-4">
        Our model considers key parameters like the number of stops, journey day, journey month, airline type (e.g., Air India, Indigo), source, destination, and more, to predict flight prices. After training this model using a powerful machine learning algorithm—the Random Forest Regressor—we fine-tune it using hyperparameter tuning to achieve a high level of accuracy. Once trained, the model is saved and deployed on a Flask application, enabling users to access it seamlessly on our website.
      </p>
      <p className="text-gray-700 text-base md:text-lg leading-relaxed mt-4">
        This Flight Price Prediction System is designed to assist not only travelers but also travel agencies and airlines in refining their pricing strategies and planning. We are committed to providing reliable and insightful price forecasts to enhance travel planning for everyone involved in the journey.
      </p>
    </div>
  </div>
);

export default Aboutus;
