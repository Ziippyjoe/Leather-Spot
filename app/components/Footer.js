import React from 'react';

function Footer() {
  return (
    <footer className="bg-[#fdfdfd] text-[#0a0a0a] py-12 px-4 border-t border-black/10">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-mono font-semibold mb-4">LEATHER SPOT</h2>
          <p className="text-sm font-sans text-gray-600">
            Crafting premium leather goods since 2020. Discover quality, style, and durability.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-mono font-medium mb-4">Shop</h3>
          <ul className="space-y-2 text-sm font-sans">
            <li>
              <a href="/collections/all" className="hover:underline text-gray-600">
                All Products
              </a>
            </li>
            <li>
              <a href="/collections/bags" className="hover:underline text-gray-600">
                Bags
              </a>
            </li>
            <li>
              <a href="/collections/wallets" className="hover:underline text-gray-600">
                Wallets
              </a>
            </li>
            <li>
              <a href="/collections/accessories" className="hover:underline text-gray-600">
                Accessories
              </a>
            </li>
            <li>
              <a href="/collections/sale" className="hover:underline text-gray-600">
                Sale
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Service Links */}
        <div>
          <h3 className="text-lg font-mono font-medium mb-4">Customer Service</h3>
          <ul className="space-y-2 text-sm font-sans">
            <li>
              <a href="/contact" className="hover:underline text-gray-600">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/shipping" className="hover:underline text-gray-600">
                Shipping & Returns
              </a>
            </li>
            <li>
              <a href="/faqs" className="hover:underline text-gray-600">
                FAQs
              </a>
            </li>
            <li>
              <a href="/care" className="hover:underline text-gray-600">
                Leather Care Guide
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:underline text-gray-600">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Contact and Newsletter */}
        <div>
          <h3 className="text-lg font-mono font-medium mb-4">Connect With Us</h3>
          <div className="space-y-4 text-sm font-sans">
            <p className="text-gray-600">
              Email: <a href="mailto:support@leatherspot.com" className="hover:underline">support@leatherspot.com</a>
            </p>
            <p className="text-gray-600">Phone: (555) 123-4567</p>
            <p className="text-gray-600">123 La Leathere , Aurevoir , FRANCE</p>
            {/* Newsletter Signup */}
            <div>
              <p className="text-gray-600 mb-2">Join our newsletter for exclusive offers:</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                />
                <button className="bg-black text-white px-4 py-2 hover:bg-black/75 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media and Copyright */}
      <div className="mx-auto max-w-7xl mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a href="https://facebook.com/leatherspot" className="text-gray-600 hover:text-black">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </a>
          <a href="https://instagram.com/leatherspot" className="text-gray-600 hover:text-black">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.948-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a href="https://twitter.com/leatherspot" className="text-gray-600 hover:text-black">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
        <span className="text-xs font-sans text-gray-600">
          © 2025 LEATHER SPOT. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;