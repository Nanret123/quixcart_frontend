import React from "react";
import dealsImage from "../../assets/deals.png";

const Deals = () => {
  return (
    <section className="section__container deals__container">
      <div className="deals__image">
        <img src={dealsImage} alt="Deals" />
      </div>
      <div className="deals__content">
        <h5>Deals of the Month</h5>
        <h4>Get 20% Off on your first purchase</h4>
        <p>
          Out Women's Fashion Deals of the month are here to make your style
          dreams a reality without breaking the bank. Discover a curated
          collection of exquisite clothing, accessories, and footwear, all
          handpicked to elevate your wardrope{" "}
        </p>
        <div className="deals__countdown flex-wrap">
          <div className="deals__countdown__card">
            <h4>14</h4>
            <p>Days</p>
          </div>
          <div className="deals__countdown__card">
            <h4>20</h4>
            <p>Hours</p>
          </div>
          <div className="deals__countdown__card">
            <h4>15</h4>
            <p>Minutes</p>
          </div>
          <div className="deals__countdown__card">
            <h4>05</h4>
            <p>Seconds</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Deals;
