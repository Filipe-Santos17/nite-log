import './Header.css';
import ToggleLoginBtn from "../toggle-login-btn/ToggleLoginBtn";

const eyeIcon = require('../../images/eye-icon.png');

const Header = (props) => {
    return (
        <header>
            <span className="page-title">NiteLog</span>
            <ToggleLoginBtn
                isLoginToggled={props.isLoginToggled}
                setIsLoginToggled={props.setIsLoginToggled}
            />
        </header>
    );
};

export default Header;