import FilledButton from "./shared/FilledButton";
import {useState} from "react";

const SignupPage = () => {
    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        password: ''
    });

    const changeHandler = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    }

    return (
        <form>
            <input
                type="text"
                placeholder="Nome de Usuário"
                name="username"
                onChange={changeHandler}
            />
            <input
                type="text"
                placeholder="E-mail"
                name="email"
                onChange={changeHandler}
            />
            <input
                type="text"
                placeholder="Senha"
                name="password"
                onChange={changeHandler}
            />
            <FilledButton>Registrar</FilledButton>
        </form>
    );
};

export default SignupPage;