import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Form({ label, username, setUsername, password, setPassword, onSubmit }) {
    return (
        <div className="auth-container">
            <form onSubmit={onSubmit}>
                <h2>{label}</h2>
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <input
                        value={username}
                        type="text"
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="off"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input
                        value={password}
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="off"
                    />
                </div>
                <div>
                    <button type="submit">{label}</button>
                </div>
            </form>
        </div>
    );
}

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:3001/auth/register", {
                username: username,
                password: password,
            });
            alert("You've successfully registered!, Now Login");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Form
            label="Register"
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            onSubmit={onSubmit}
        />
    );
}

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const [_, setCookies] = useCookies(["access_token"]);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            e.preventDefault();

            const response = await axios.post("http://localhost:3001/auth/login", {
                username: username,
                password: password,
            });

            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID", response.data.userID);
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Form
            label="Login"
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            onSubmit={onSubmit}
        />
    );
}

function Auth() {
    return (
        <div className="auth">
            <Register />
            <Login />
        </div>
    );
}

export default Auth;
