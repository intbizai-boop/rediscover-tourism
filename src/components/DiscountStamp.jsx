import React from 'react';

export default function DiscountStamp({ className = '' }) {
  return (
    <div className={`select-none hover:scale-105 transition-transform duration-300 ${className}`}>
      <a
        href="#/contact"
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C1D24] focus-visible:rounded-full"
        aria-label="10% discount on bookings till September 30. Plan your journey now."
      >
        <img
          src="/stamp.png"
          alt="10% Discount on Bookings Till September 30"
          width="130"
          height="130"
          className="w-28 h-28 md:w-36 md:h-36 object-contain mix-blend-multiply filter drop-shadow-sm"
        />
      </a>
    </div>
  );
}
