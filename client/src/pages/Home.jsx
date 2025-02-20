import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
           Flight Price Prediction System
        </h1>
        <p className="text-lg text-gray-700 mt-4 max-w-2xl">
          Get predictions on flight prices and book at the best time to save money. Experience seamless and intelligent booking.
        </p>
        <Link to="/price">
          <button className="mt-6 px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition">
            Get Started
          </button>
        </Link>
      </section>
{/* Prediction percentage section */}
<section className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Prediction Accuracy
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Our Random Forest algorithm achieves an accuracy of 79%.
        </p>
        <table className="table-auto border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Algorithm</th>
              <th className="border border-gray-300 px-4 py-2">Accuracy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Random Forest</td>
              <td className="border border-gray-300 px-4 py-2">79%</td>
            </tr>
          </tbody>
        </table>
      </section>
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Why Choose Our System?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Accuracy",
                text: "Our advanced algorithm analyzes historical and real-time data for precise predictions.",
              },
              {
                title: "User-Friendly Experience",
                text: "Easily navigate and get the best prices with an intuitive interface.",
              },
              {
                title: "Save More on Travel",
                text: "Book smarter and cut your travel costs significantly.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition transform hover:-translate-y-2"
              >
                <h3 className="text-xl font-bold text-blue-600 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-700">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50 ">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "1. Enter Travel Details",
                text: "Select your departure, destination, and travel dates.",
              },
              {
                title: "2. Analyze Data",
                text: "Our AI reviews historical trends and live prices.",
              },
              {
                title: "3. Get Smart Predictions",
                text: "Find the perfect time to book your flight at the best price.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-2"
              >
                <h3 className="text-lg font-bold text-blue-600 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-700">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default Home;
