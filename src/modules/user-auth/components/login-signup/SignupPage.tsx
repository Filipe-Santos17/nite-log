import React, {useState} from "react";
import {useAuth} from "../../../core/hooks/auth/useAuth";

import FieldErrorMsg from "../field-error-msg/FieldErrorMsg";
import TextInput from "../../../core/components/custom-input/TextInput";
import EmailInput from "../../../core/components/custom-input/EmailInput";
import PasswordInput from "../../../core/components/custom-input/PasswordInput";
import FilledButton from "../../../core/components/filled-btn/FilledButton";
import Loading from "../../../core/components/loading/Loading";
import {checkValues} from "../../../core/utils/utils";

type FormValues = {
    username: string;
    email: string;
    password: string;
}

const SignupPage = () => {
    const {
        isLoading,
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

        createUser(
            formValues.username,
            formValues.email,
            formValues.password
        );
    }

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