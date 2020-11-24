import React from "react";

function Home() {
  return (
    <div className="container">
      <div className="row align-items-top my-5">
        <div className="col-lg-6">
          <h1 className="font-weight-light">Home column1</h1>
            <span className="para-text creative-complement-text">
              <img
                className="img-fluid rounded mb-4 mb-lg-0"
                src="https://via.placeholder.com/400x200?text=This is a placeholder.com image."
                alt=""
              />
              <p>
                Start page with initial introduction! I want additional text here to determine the size
                of the columnn. I am going to do something similar on the other side. Add some additional
                text just to get a better feel for the layout.
              </p>
            </span>
        </div>
        <div className="col-lg-6">
          <h1 className="font-weight-light">Home column2</h1>
          <span className="para-text creative-complement-text">
            <p>
              I think this may be too much green! I am doing this work with the columns and the
              adjustments to start getting serious about my content and layout work.
            </p>
            <p>
              New paragraph of text to test out and see how the layout works. I guess if I were using some
              kind of tool this would be easier but I am working on custom development here.
            </p>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Home;