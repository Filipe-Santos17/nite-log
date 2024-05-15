import './FilledButton.css';

const FilledButton = (props) => {
    return (
        <button onClick={props.onClick} className={`filled-btn ${props.className}`}>
            {props.children}
        </button>
    );
};

export default FilledButton;