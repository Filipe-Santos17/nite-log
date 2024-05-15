import FilledButton from "./shared/FilledButton";

const SignupPage = () => {
    return (
        <form>
            <input type="text" placeholder="Nome de Usuário"/>
            <input type="text" placeholder="E-mail"/>
            <input type="text" placeholder="Senha"/>
            <FilledButton>Registrar</FilledButton>
        </form>
    );
};

export default SignupPage;