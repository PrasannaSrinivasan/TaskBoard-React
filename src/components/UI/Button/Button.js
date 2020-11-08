import classes from "./Button.module.css";

const button =  (props) => <button
                                onClick={props.click} 
                                className={`${classes.Default} ${props.buttonColor ? classes[props.buttonColor] : null }`} > 
                                {props.children}</button>

export default button;
