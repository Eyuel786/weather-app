import classes from "./ErrorMessage.module.css";


export default function ErrorMessage(props) {
    const { errorText, onClose } = props;

    return (
        <div className={classes.errorMessage}>
            {errorText}
            <button onClick={onClose}>X</button>
        </div>
    );
}