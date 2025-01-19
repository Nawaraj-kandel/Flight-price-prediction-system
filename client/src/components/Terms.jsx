
const Terms = () => {
  return (
    <div className="terms-container p-6 md:p-12 font-sans text-gray-800">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">Terms and Conditions</h1>
      <p className="mb-6 text-sm md:text-base">
        Welcome to our flight price prediction and booking system. By using our services, you agree to the following terms and conditions. Please read them carefully before proceeding.
      </p>

      <h2 className="text-xl md:text-2xl font-semibold mb-3">1. Scope of Service</h2>
      <p className="mb-4">
        Our system provides flight price predictions and facilitates flight bookings. Predictions are based on historical data and algorithms and are not guaranteed to be accurate. Users are advised to make booking decisions based on their discretion.
      </p>

      <h2 className="text-xl md:text-2xl font-semibold mb-3">2. User Responsibilities</h2>
      <ul className="list-disc pl-5 mb-4 space-y-2">
        <li>Ensure the accuracy of the information provided during bookings, including personal details and travel dates.</li>
        <li>Comply with the laws of Nepal and the regulations of the airlines you choose to book with.</li>
        <li>Maintain the confidentiality of your account credentials and immediately notify us of any unauthorized access.</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-semibold mb-3">3. Payment and Refund Policy</h2>
      <p className="mb-4">
        Payments for bookings are subject to the policies of the respective airlines. Refunds, if applicable, will be processed in accordance with airline rules and the laws of Nepal. Service fees for predictions or additional services are non-refundable.
      </p>

      <h2 className="text-xl md:text-2xl font-semibold mb-3">4. Compliance with Nepalese Law</h2>
      <p className="mb-4">
        Our services comply with the laws of Nepal, including but not limited to the Consumer Protection Act, Electronic Transactions Act, and any other applicable regulations. Users are required to adhere to these laws while using our platform.
      </p>

      <h2 className="text-xl md:text-2xl font-semibold mb-3">5. Limitation of Liability</h2>
      <p className="mb-4">
        We are not liable for any inaccuracies in flight price predictions or for any losses incurred due to booking decisions based on our predictions. Our liability is limited to the extent permitted by Nepalese law.
      </p>

      <h2 className="text-xl md:text-2xl font-semibold mb-3">6. Cancellation and Changes</h2>
      <p className="mb-4">
        Cancellation and change policies for flights depend on the respective airlines. Users must review and adhere to these policies before making bookings.
      </p>

      <h2 className="text-xl md:text-2xl font-semibold mb-3">7. Privacy Policy</h2>
      <p className="mb-4">
        Your personal information is collected, stored, and processed in compliance with Nepalese data protection laws. Please refer to our Privacy Policy for more details.
      </p>

      <h2 className="text-xl md:text-2xl font-semibold mb-3">8. Amendments</h2>
      <p className="mb-4">
        We reserve the right to update these terms and conditions at any time. Changes will be effective upon posting on our platform. Continued use of our services constitutes acceptance of the updated terms.
      </p>

      <h2 className="text-xl md:text-2xl font-semibold mb-3">9. Governing Law</h2>
      <p className="mb-4">
        These terms and conditions are governed by the laws of Nepal. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Nepal.
      </p>

      <h2 className="text-xl md:text-2xl font-semibold mb-3">10. Contact Us</h2>
      <p className="mb-4">
        If you have any questions about these terms and conditions, please contact us at <a href="mailto:contact@flightpredictor.com" className="text-blue-600 hover:underline">support@flightpredictor.com</a>.
      </p>
    </div>
  );
};

export default Terms;
