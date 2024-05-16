import FilledButton from "./shared/FilledButton";
import {useState} from "react";

const LoginPage = () => {
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

    return (
        <form>
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
            <FilledButton>Entrar</FilledButton>
        </form>
    );
};

export default LoginPage;