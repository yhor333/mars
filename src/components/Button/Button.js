import "./Button.css";

const Button = (props) => {
  return (
    <div className="button">
      <button className={"button__item"} onClick={props.onClick}>
        {props.children}
      </button>
    </div>
  );
};

export default Button;
