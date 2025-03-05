import "bootstrap/dist/css/bootstrap.css";

interface Props {
    onEvent:(event: React.KeyboardEvent<HTMLElement>) => void,
    setAlias: (alias: string) => void,
    setPassword: (password: string) => void
}

const AuthenticationFields: React.FC<Props> = ({onEvent, setAlias, setPassword}) => {
    return (
        <>
            <div className="form-floating">
            <input
                type="text"
                className="form-control"
                size={50}
                id="aliasInput"
                aria-label="alias"
                placeholder="name@example.com"
                onKeyDown={onEvent}
                onChange={(event) => setAlias(event.target.value)}
            />
            <label htmlFor="aliasInput">Alias</label>
            </div>
            <div className="form-floating mb-3">
            <input
                type="password"
                className="form-control bottom"
                id="passwordInput"
                aria-label="password"
                placeholder="Password"
                onKeyDown={onEvent}
                onChange={(event) => setPassword(event.target.value)}
            />
            <label htmlFor="passwordInput">Password</label>
            </div>
        </>
    );
};

export default AuthenticationFields;