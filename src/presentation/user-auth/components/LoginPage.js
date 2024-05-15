import FilledButton from "./shared/FilledButton";

const LoginPage = () => {
    return (
        <form>
            <input type="text" placeholder="E-mail" />
            <input type="password" placeholder="Senha" />
            <FilledButton>Entrar</FilledButton>
        </form>
    );
};

export default LoginPage;