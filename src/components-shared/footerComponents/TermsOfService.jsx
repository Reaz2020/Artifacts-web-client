import React from 'react';

const TermsOfService = () => {
  return (
    <div className="p-8 bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
      <p className="mb-4">
        Welcome to Artifact Atlas. By using our platform, you agree to comply with and be bound by the following terms and conditions. Please review them carefully.
      </p>
      <h2 className="text-2xl font-bold mb-2">1. Use of Platform</h2>
      <p className="mb-4">
        Artifact Atlas allows users to view, add, and track artifacts. Users must ensure the authenticity and accuracy of the artifacts they upload.
      </p>
      <h2 className="text-2xl font-bold mb-2">2. User Conduct</h2>
      <p className="mb-4">
        Users agree not to use the platform for any unlawful purposes or to upload content that is offensive, harmful, or violates any rights.
      </p>
      <h2 className="text-2xl font-bold mb-2">3. Privacy</h2>
      <p className="mb-4">
        Your privacy is important to us. Please review our Privacy Policy to understand how we collect and use your information.
      </p>
      <h2 className="text-2xl font-bold mb-2">4. Changes to Terms</h2>
      <p>
        We reserve the right to update these terms at any time. Continued use of the platform after changes are posted constitutes acceptance of the new terms.
      </p>
    </div>
  );
};

export default TermsOfService;
