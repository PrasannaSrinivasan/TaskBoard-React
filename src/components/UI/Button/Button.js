import classes from "./Button.module.css";

const button = (props) => <button
    onClick={props.click.bind(this)}
    disabled={props.disabled}
    className={`${classes.Default} ${props.buttonColor ? classes[props.buttonColor] : ""} ${props.addClass ? props.addClass : ""}`} >
    {props.children}</button>

export default button;
