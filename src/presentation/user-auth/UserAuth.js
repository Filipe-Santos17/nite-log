import './UserAuth.css';
import {useState} from "react";

import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Header from "./components/header/Header";

const UserAuth = () => {
    const [isLoginToggled, setIsLoginToggled] = useState(true)

    return (
        <main>
            <Header
                isLoginToggled={isLoginToggled}
                setIsLoginToggled={setIsLoginToggled}
            />

            <span className='task-description'>Registre sua presença.</span>

            {isLoginToggled ? (
                <LoginPage/>
            ) : (
                <SignupPage/>
            )}
        </main>
    );
};

export default UserAuth;