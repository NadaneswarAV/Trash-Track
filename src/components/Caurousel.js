import React from 'react';
import m4 from "../images/m4.jpeg";
import m5 from "../images/m5.jpeg"; 
import m3 from "../images/m3.jpg";
import A1 from "../images/A1.jpg";
import A2 from "../images/A2.jpeg";
import A3 from "../images/A3.jpeg";

const Carousel = () => {
  return (
    <div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }}
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-item active">
            <img
              src={m3}
              className="d-block mx-auto img-fluid"
              alt="..."
              style={{ maxHeight: "300px" }} // Adjust the max height as needed
            />
          </div>
          <div className="carousel-item">
            <img
              src={A1}
              className="d-block mx-auto img-fluid"
              alt="..."
              style={{ maxHeight: "300px" }} // Adjust the max height as needed
            />
          </div>
          <div className="carousel-item">
            <img
              src={A2}
              className="d-block mx-auto img-fluid"
              alt="..."
              style={{ maxHeight: "300px" }} // Adjust the max height as needed
            />
          </div>
          <div className="carousel-item">
            <img
              src={A3}
              className="d-block mx-auto img-fluid"
              alt="..."
              style={{ maxHeight: "300px" }} // Adjust the max height as needed
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Carousel;
