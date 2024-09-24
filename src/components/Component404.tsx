import Link from "next/link";
import React from "react";

const Component404 = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl mt-4">Oops! Page not found.</h2>
      <p className="mt-2 text-gray-500">
        The page you're looking for doesn't exist.
      </p>
      <Link href="/">
        <a className="mt-6 text-blue-500 underline">Go back to homepage</a>
      </Link>
    </div>
  );
};

export default Component404;
