import classes from "./Button.module.css";

const button =  (props) => <button
                                onClick={props.click} 
                                disabled={props.disabled}
                                className={`${classes.Default} ${props.buttonColor ? classes[props.buttonColor] : null }`} > 
                                {props.children}</button>

export default button;
