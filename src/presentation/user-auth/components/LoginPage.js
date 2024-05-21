import {useState} from "react";
import {auth} from "../../../service/firebase";

import FilledButton from "./shared/FilledButton";
import Loading from "./shared/Loading";
import {signInWithEmailAndPassword} from "@firebase/auth";

const LoginPage = () => {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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

    const submitHandler = async (e) => {
        e.preventDefault();

        if (checkErrors()) {
            return;
        }

        setIsLoading(true);

        signInWithEmailAndPassword(auth, formValues.email, formValues.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                return user;
            })
            .then((user) => {
                alert('Login realizado com sucesso!');
                console.log(user.displayName);
                // add user to attendance list, if not already there, add field for time of entry
            })
            .catch((error) => {
                console.log(error);
                alert(`Erro ao realizar login: ${error.message}`);
            })
            .finally(() => {
                setIsLoading(false);
            });
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