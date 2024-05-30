import React, {useEffect, useState} from "react";
import {useAuth} from "../../hooks/auth/useAuth";

import FieldErrorMsg from "../field-error-msg/FieldErrorMsg";
import TextInput from "../../../core/components/custom-input/TextInput";
import EmailInput from "../../../core/components/custom-input/EmailInput";
import PasswordInput from "../../../core/components/custom-input/PasswordInput";
import FilledButton from "../../../core/components/filled-btn/FilledButton";
import Loading from "../../../core/components/loading/Loading";
import {checkValues} from "../../../core/utils/utils";
import {UserContextType} from "../../../core/types/User";
import {UserContext} from "../../../core/context/userContext";

type FormValues = {
    username: string;
    email: string;
    password: string;
}

const SignupPage = () => {
    const {
        setGlobalUser
    } = React.useContext(UserContext) as UserContextType;
    const {
        isLoading,
        user,
        createUser
    } = useAuth();

    const [isError, setIsError] = useState(false);
    const [formValues, setFormValues] = useState<FormValues>({
        username: '',
        email: '',
        password: ''
    });

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    }

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        if (checkValues(formValues, setIsError)) return;

        const queryParams = new URLSearchParams(window.location.search);
        const timecode = queryParams.get('timecode');

        createUser(
            formValues.username,
            formValues.email,
            formValues.password,
            timecode
        );
    }

    useEffect(() => {
        if (user) {
            setGlobalUser(user);
        }
        // eslint-disable-next-line
    }, [user]);

    return (
        <form onSubmit={submitHandler}>
            {isError &&
                <FieldErrorMsg message="Erro ao criar conta. Verifique os campos!"/>
            }
            <TextInput
                label="Nome de Usuário"
                name="username"
                onChange={changeHandler}
            />
            <EmailInput
                label="E-mail"
                name="email"
                onChange={changeHandler}
            />
            <PasswordInput
                label="Senha"
                name="password"
                onChange={changeHandler}
            />
            <FilledButton
                type="submit"
                title="Registrar"
            />

            {isLoading && <Loading />}
        </form>
    );
};

export default SignupPage;