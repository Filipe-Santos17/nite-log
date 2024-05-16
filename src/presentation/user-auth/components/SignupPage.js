import {useState} from "react";
import {auth} from "../../../domain/firebase";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";

import FilledButton from "./shared/FilledButton";
import Loading from "./shared/Loading";

const SignupPage = () => {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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

    const checkErrors = () => {
        if (formValues.username === '' || formValues.email === '' || formValues.password === '') {
            setIsError(true);
            return true;
        }

        setIsError(false);
        return false;
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if (checkErrors()) {
            return;
        }

        setIsLoading(true);

        createUserWithEmailAndPassword(auth, formValues.email, formValues.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .then(() => {
                updateProfile(auth.currentUser, {
                    displayName: formValues.username
                })
                .then(() => {
                    alert('Conta criada com sucesso!');
                })
                .catch((error) => {
                    console.log(error);
                    alert(`Erro ao criar a conta: ${error.message}`);
                })
            })
            .catch((error) => {
                alert(`Erro ao criar a conta: ${error.message}`);
            })
            .finally(() => {
                setIsLoading(false);
            });
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