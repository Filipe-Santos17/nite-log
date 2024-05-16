import './ToggleLoginBtn.css';

const ToggleLoginBtn = (props) => {
    const loginBtnClassNames = props.isLoginToggled? "toggle-btn active" : "toggle-btn";
    const signupBtnClassNames = props.isLoginToggled? "toggle-btn" : "active toggle-btn";

    const handleLoginBtnClick = () => {
        props.setIsLoginToggled(true);
    }

    const handleSignupBtnClick = () => {
        props.setIsLoginToggled(false);
    }

    return (
        <div className="toggle-btn-container">
            <button
                className={loginBtnClassNames}
                onClick={handleLoginBtnClick}
            >Entrar</button>
            <button
                className={signupBtnClassNames}
                onClick={handleSignupBtnClick}
            >Criar conta</button>
        </div>
    );
};

export default ToggleLoginBtn;