import {useState} from "react";
import {useAuth} from "../../../hooks/useAuth.ts";

import FilledButton from "./shared/FilledButton";
import Loading from "./shared/Loading";

const LoginPage = () => {
    const {
        isLoading,
        logUserIn
    } = useAuth()

    const [isError, setIsError] = useState(false);
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });

    const changeHandler = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

    const checkErrors = () => {
        if (formValues.email === '' || formValues.password === '') {
            setIsError(true);
            return true;
        }

        setIsError(false);
        return false;
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (checkErrors()) {
            return;
        }

        logUserIn(formValues.email, formValues.password);
    }

    return (
        <form>
            {isError && <span className="error-message">Preencha todos os campos!</span>}
            <input
                type="text"
                placeholder="E-mail"
                name="email"
                onChange={changeHandler}
            />
            <input
                type="password"
                placeholder="Senha"
                name="password"
                onChange={changeHandler}
            />
            <FilledButton onClick={submitHandler}>Entrar</FilledButton>

            {isLoading && <Loading />}
        </form>
    );
};

export default LoginPage;