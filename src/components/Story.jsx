import React from "react";

function Story() {
  return (
    <div className="mystory">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-7">
            <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src="http://placehold.it/900x400"
              alt=""
            />
          </div>
          <div className="col-lg-5">
            <h1 className="font-weight-light">My Story</h1>
            <p>
              Get to know all about me here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Story;