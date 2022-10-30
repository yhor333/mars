import "./Radio.css";

const Radio = (props) => {
  return (
    <div className="label-radio">
      <input
        type={"radio"}
        name={props.inpuName}
        className={`radio`}
        onClick={props.onClick}
        id={`${props.inpuName}${props.index}`}
      ></input>
      <label className="label" htmlFor={`${props.inpuName}${props.index}`}>
        <span>{props.children}</span>
      </label>
    </div>
  );
};

export default Radio;
