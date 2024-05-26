import {useState} from "react";
import {useAuth} from "../../../hooks/useAuth.ts";

import FilledButton from "./shared/FilledButton";
import Loading from "./shared/Loading";
import {checkValues} from "../../../utils/utils";

const SignupPage = () => {
    const {
        isLoading,
        createUser
    } = useAuth();

    const [isError, setIsError] = useState(false);
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

    const submitHandler = async (e) => {
        e.preventDefault();

        if (checkValues(formValues, setIsError)) {
            return;
        }

        createUser(
            formValues.username,
            formValues.email,
            formValues.password
        );
    }

    return (
        <form>
            {isError && (
                <span className="error-message">Erro ao criar a conta. Verifique os campos!</span>
            )}
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
                type="password"
                placeholder="Senha"
                name="password"
                onChange={changeHandler}
            />
            <FilledButton onClick={submitHandler}>Registrar</FilledButton>

            {isLoading && <Loading />}
        </form>
    );
};

export default SignupPage;