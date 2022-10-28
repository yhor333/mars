import { Link } from "react-router-dom";
import "./Button.css";

const Button = (props) => {
  return (
    <Link to={props.to} className="link">
      <button
        className={`button ${props.class}`}
        onClick={props.onClick}
        id={props.index}
      >
        {props.children}
      </button>
    </Link>
  );
};

export default Button;
