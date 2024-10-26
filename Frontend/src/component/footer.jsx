import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <p className="text-gray-300">
              ProductHub - Your ultimate product management solution.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="/dashboard" className="text-gray-300 hover:text-white">Dashboard</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p className="text-gray-300">
              Email: info@producthub.com<br />
              Phone: (555) 123-4567
            </p>
          </div>
        </div>
        <div className="text-center mt-8 pt-4 border-t border-gray-700">
          <p className="text-gray-300">© 2024 ProductHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;