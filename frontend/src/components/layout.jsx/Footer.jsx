import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="font-sans">
      {/* Newsletter bar */}
      <div className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Join the AUTONEX VIP Club!
            </h3>
            <p className="text-sm text-gray-500 mt-1 max-w-md">
              Whether you&apos;re welcoming new contacts or sharing the latest
              news, you can make your business look good in just a few clicks.
            </p>
          </div>

          <div>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-4 py-2.5 text-sm border border-gray-300 rounded-l-md outline-none w-64"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 rounded-r-md transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-[11px] text-gray-400 mt-2 max-w-xs">
              By subscribing you agree to our{" "}
              <Link to="/terms" className="underline hover:text-gray-600">
                Terms &amp; Conditions
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="underline hover:text-gray-600">
                Privacy &amp; Cookies Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Main dark footer */}
      <div className="bg-[#0b1120] text-gray-300">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Contact Us */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-medium text-gray-200">Phone Number</p>
                <p className="text-gray-400">+1 (800) 1234 5678 90</p>
              </div>
              <div>
                <p className="font-medium text-gray-200">E-Mail</p>
                <p className="text-gray-400">info@example.com</p>
              </div>
              <div>
                <p className="font-medium text-gray-200">Address</p>
                <p className="text-gray-400">
                  2972 Westheimer Rd. Santa Ana, Illinois 85486
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-200">Help Guide</p>
                <p className="text-gray-400">
                  Seek expert help for inquiries and concerns.
                </p>
              </div>
            </div>
          </div>

          {/* Let Us Help You */}
          <div>
            <h4 className="text-white font-semibold mb-4">Let Us Help You</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link to="/accessibility" className="hover:text-white">
                  Accessibility Statement
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-white">
                  Your Orders
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-white">
                  Returns &amp; Replacements
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="hover:text-white">
                  Shipping Rates &amp; Policies
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-white">
                  Refund and Returns Policy
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link to="/cookie-settings" className="hover:text-white">
                  Cookie Settings
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-white">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link to="/sell" className="hover:text-white">
                  Sell on AUTONEX
                </Link>
              </li>
              <li>
                <Link to="/sell/services" className="hover:text-white">
                  Sell Your Services on AUTONEX
                </Link>
              </li>
              <li>
                <Link to="/sell/business" className="hover:text-white">
                  Sell on AUTONEX Business
                </Link>
              </li>
              <li>
                <Link to="/sell/apps" className="hover:text-white">
                  Sell Your Apps on AUTONEX
                </Link>
              </li>
              <li>
                <Link to="/affiliate" className="hover:text-white">
                  Become an Affiliate
                </Link>
              </li>
              <li>
                <Link to="/advertise" className="hover:text-white">
                  Advertise Your Products
                </Link>
              </li>
              <li>
                <Link to="/sell/publish" className="hover:text-white">
                  Sell &amp; Publish with Us
                </Link>
              </li>
              <li>
                <Link to="/vendor" className="hover:text-white">
                  Become an AUTONEX Vendor
                </Link>
              </li>
            </ul>
          </div>

          {/* Get to Know Us */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get to Know Us</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link to="/careers" className="hover:text-white">
                  Careers for AUTONEX
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white">
                  About AUTONEX
                </Link>
              </li>
              <li>
                <Link to="/investor-relations" className="hover:text-white">
                  Investor Relations
                </Link>
              </li>
              <li>
                <Link to="/devices" className="hover:text-white">
                  AUTONEX Devices
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-white">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link to="/social-responsibility" className="hover:text-white">
                  Social Responsibility
                </Link>
              </li>
              <li>
                <Link to="/stores" className="hover:text-white">
                  Store Locations
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Logo / social / app download row */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-blue-600 text-white rounded-full p-1.5">
                {/* <Car size={18} /> */}
              </div>
              <span className="text-lg font-bold text-white tracking-wide">
                AUTONEX
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Follow Us:</span>
              <a href="#" aria-label="Facebook" className="hover:text-white">
                {/* <Facebook size={18} /> */}
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-white">
                {/* <Twitter size={18} /> */}
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-white">
                {/* <Instagram size={18} /> */}
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-white">
                {/* <Youtube size={18} /> */}
              </a>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400 hidden md:inline">
                Download App
              </span>
              <img
                src="/assets/google-play-badge.png"
                alt="Get it on Google Play"
                className="h-9"
              />
              <img
                src="/assets/app-store-badge.png"
                alt="Download on the App Store"
                className="h-9"
              />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <p>Copyright 2026 © AUTONEX Theme. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <img
                src="/assets/payments/mastercard.png"
                alt="Mastercard"
                className="h-5"
              />
              <img src="/assets/payments/visa.png" alt="Visa" className="h-5" />
              <img
                src="/assets/payments/paypal.png"
                alt="PayPal"
                className="h-5"
              />
              <img
                src="/assets/payments/skrill.png"
                alt="Skrill"
                className="h-5"
              />
              <img
                src="/assets/payments/klarna.png"
                alt="Klarna"
                className="h-5"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
