import type React from "react";
import { Leaf, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="w-6 h-6" />
              <h3 className="text-xl font-bold">Herbal Gallery</h3>
            </div>
            <p className="text-green-200">
              Explore the world of natural remedies and herbal wonders.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/all">All Herbs</Link>
              </li>
              <li>
                <Link to="/add">Add Herbs</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/conditions"
                  className="hover:text-green-300 transition duration-300"
                >
                  Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Developer Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2" /> aayu.r.2003@gmail.com
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2" /> +919098546675
              </li>
              <li className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" /> Dr. C.V. Raman University
                Khandwa
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-green-700 text-center text-green-200">
          <p>
            © 2023 Herbal Gallery. All rights reserved to AISECT Infotech pvt.
            ldt.
          </p>
          <p className="mt-2">
            Developed by Aayush Rathore -{" "}
            <a
              href="https://bento.me/aayu-r"
              className="text-green-300 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Profile
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
