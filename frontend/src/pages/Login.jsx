import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";
import "../styles/Login.css";

function Login({ onLogin }) {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        setMessage("");

        try {
            const data = await loginUser(email, password);

            // Store JWT token
            localStorage.setItem("token", data.token);

            // Tell App.jsx that login was successful
            onLogin();

            // Go to dashboard
            navigate("/dashboard");

        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

                {/* HEADER */}
                <div className="login-header">
                    <h1>Expense Tracker</h1>

                    <p>
                        Manage your expenses easily
                    </p>
                </div>

                {/* LOGIN FORM */}
                <form onSubmit={handleLogin}>

                    {/* EMAIL */}
                    <div className="login-form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />

                    </div>

                    {/* PASSWORD */}
                    <div className="login-form-group">

                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                    </div>

                    {/* LOGIN BUTTON */}
                    <button
                        type="submit"
                        className="login-button"
                    >
                        Login
                    </button>

                </form>

                {/* ERROR MESSAGE */}
                {message && (
                    <div className="login-message">
                        {message}
                    </div>
                )}

                {/* REGISTER LINK */}
                <div className="register-link">

                    Don't have an account?{" "}

                    <Link to="/register">
                        Create Account
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Login;