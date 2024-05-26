import React, {useState} from "react";
import {useAuth} from "../../../core/hooks/auth/useAuth";

import FieldErrorMsg from "../FieldErrorMsg/FieldErrorMsg";
import EmailInput from "../../../core/components/custom-input/EmailInput";
import PasswordInput from "../../../core/components/custom-input/PasswordInput";
import FilledButton from "../../../core/components/filled-btn/FilledButton";
import Loading from "../../../core/components/loading/Loading";
import {checkValues} from "../../../core/utils/utils";

type FormValues = {
    email: string;
    password: string;
}

const LoginPage = () => {
    const {
        isLoading,
        logUserIn
    } = useAuth()

    const [isError, setIsError] = useState(false);
    const [formValues, setFormValues] = useState<FormValues>({
        email: '',
        password: ''
    });

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault()

        if (checkValues(formValues, setIsError)) return;

        logUserIn(formValues.email, formValues.password);
    }

    return (
        <form onSubmit={submitHandler}>
            {isError &&
                <FieldErrorMsg message="Erro ao fazer login. Verifique os campos!"/>
            }
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
                title="Entrar"
            />

            {isLoading && <Loading />}
        </form>
    );
};

export default LoginPage;