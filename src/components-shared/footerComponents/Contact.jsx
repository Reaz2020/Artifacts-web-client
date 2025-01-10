import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Phone Contact Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-purple-600">Phone Contact</h2>
          <ul className="mt-4 text-gray-700">
            <li>Customer Service: +1 800 123 4567</li>
            <li>Support: +1 800 234 5678</li>
            <li>General Inquiries: +1 800 345 6789</li>
          </ul>
        </div>

        {/* Store Address Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-purple-600">Store Address</h2>
          <p className="mt-4 text-gray-700">
            Artifact Atlas Headquarters
            <br />
            123 History Lane
            <br />
            Heritage City, HC 56789
          </p>
        </div>

        {/* Email Contact Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-purple-600">Email Contact</h2>
          <ul className="mt-4 text-gray-700">
            <li>Customer Support: support@artifactatlas.com</li>
            <li>Partnerships: partnerships@artifactatlas.com</li>
            <li>Media Inquiries: media@artifactatlas.com</li>
          </ul>
        </div>

        {/* FAQ Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-purple-600">FAQs</h2>
          <ul className="mt-4 text-gray-700">
            <li>
              <strong>Q: How can I track my artifact?</strong>
              <br />
              A: You can track your artifact by logging into your account and visiting the "My Artifacts" section.
            </li>
            <li>
              <strong>Q: Can I add new artifacts?</strong>
              <br />
              A: Yes, registered users can add new artifacts through the "Add Artifact" page.
            </li>
            <li>
              <strong>Q: How do I contact customer support?</strong>
              <br />
              A: You can reach our customer support via phone or email listed above.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Contact;
