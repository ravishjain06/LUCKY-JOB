import React from 'react';

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">About Us</h2>
            <p className="text-sm text-gray-400">
              We are a leading job portal connecting top talent with the best employers across various industries.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-400 hover:text-white">Home</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white">Jobs</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white">For Employers</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white">Contact Us</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white">FAQs</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p className="text-sm text-gray-400">Email: support@jobportal.com</p>
            <p className="text-sm text-gray-400">Phone: +1 234 567 890</p>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="flex justify-center gap-6 mt-6">
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-facebook-f text-2xl"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-twitter text-2xl"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-linkedin-in text-2xl"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-instagram text-2xl"></i>
          </a>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; 2024 JobPortal. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
