import "./FollowUs.css";
import visa from "../../../assets/imageas/visa-png.webp";
import masterCard from "../../../assets/imageas/mastercard-png.webp";
import payPal from "../../../assets/imageas/pay-pal-png.webp";
import american from "../../../assets/imageas/american-express-png.webp";
import linkedin from "../../../assets/imageas/linkedin2.png";
import github from "../../../assets/imageas/github2.png";
import instagram from "../../../assets/imageas/instagram2.png";

function FollowUs(): JSX.Element {
  return (
    <div className="FollowUs">
      <div className="social">
        <a href="www.linkedin.com/in/dar-gershoni-3a9790243">
          <img src={linkedin} alt="Linkedin" width={55} />
        </a>
        <a href="https://github.com/dar1995">
          <img src={github} alt="Github" width={40} />
        </a>
        <a href="">
          <img src={instagram} alt="Instagram" width={40} />
        </a>
      </div>
      <div className="border"></div>
      <div className="payment">
        <img src={visa} alt="Visa" width={40} />
        <img src={masterCard} alt="Mastercard" width={40} />
        <img src={payPal} alt="Pay-Pal" width={40} />
        <img src={american} alt="American-express" width={40} />
      </div>
    </div>
  );
}

export default FollowUs;
