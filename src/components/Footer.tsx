import InstaImg1 from "../assets/instagram-1.jpg";
import InstaImg2 from "../assets/instagram-2.jpg";
import InstaImg3 from "../assets/instagram-3.jpg";
import InstaImg4 from "../assets/instagram-4.jpg";
import InstaImg5 from "../assets/instagram-5.jpg";
import InstaImg6 from "../assets/instagram-6.jpg";

const Footer = () => {
  return (
    <>
      <footer className="section__container footer__container">
        <div className="footer__col">
          <h4>CONTACT INFO</h4>
          <p>
            <span>
              <i className="ri-map-pin-2-fill"></i>
            </span>
            123, London Bridge Street, London
          </p>
          <p>
            <span>
              <i className="ri-mail-fill"></i>
            </span>
            support@quixCart.com
          </p>
          <p>
            <span>
              <i className="ri-phone-fill"></i>
            </span>
            +44 123 456 7890
          </p>
        </div>
        <div className="footer__col">
          <h4>COMPANY</h4>
          <a href="/">Home</a>
          <a href="/">About Us</a>
          <a href="/">Work With Us</a>
          <a href="/">Our Blogs</a>
          <a href="/">Terms & Condition</a>
        </div>

        <div className="footer__col">
          <h4>USEFUL LINK</h4>
          <a href="/">Help</a>
          <a href="/">Track Your Order</a>
          <a href="/">Men</a>
          <a href="/">Women</a>
          <a href="/">Dresses</a>
        </div>
        <div className="footer__col">
          <h4>INSTAGRAM</h4>
          <div className="instagram__grid">
            <img src={InstaImg1} alt="Instagram 1" />
            <img src={InstaImg2} alt="Instagram 2" />
            <img src={InstaImg3} alt="Instagram 3" />
            <img src={InstaImg4} alt="Instagram 4" />
            <img src={InstaImg5} alt="Instagram 5" />
            <img src={InstaImg6} alt="Instagram 6" />
          </div>
        </div>
      </footer>

      <div className="footer__bar">
        Copyright &copy; 2025 by QuicxStore. All rights reserved
      </div>
    </>
  );
};

export default Footer;
