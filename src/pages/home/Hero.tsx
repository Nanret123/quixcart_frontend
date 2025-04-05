import React from "react";

import card1 from "../../assets/card-1.png";
import card2 from "../../assets/card-2.png";
import card3 from "../../assets/card-3.png";

const cards = [
  {
    id: 1,
    image: card1,
    trend: "2024 Trend",
    title: "Womens Shirt",
  },
  {
    id: 2,
    image: card2,
    trend: "2024 Trend",
    title: "Womens Dresses",
  },
  {
    id: 3,
    image: card3,
    title: "Womens Casuals",
  },
];

const Hero = () => {
  return (
    <section className="section__container hero__container ">
      {cards.map((card) => (
        <div key={card.id} className="hero__card">
          <img src={card.image} alt={card.title} />
          <div className="hero-content">
            <h4>{card.trend}</h4>
            <h3>{card.title}</h3>
            <a className="#">SHOP NOW</a>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Hero;
