import React from "react";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Lets generate your desired image</h1>
            <Link to='/generate' className="btn my-5 btn-primary">Generate Image</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
