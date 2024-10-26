import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">ProductHub</Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link 
              to="/" 
              className="block hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              className="block hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;