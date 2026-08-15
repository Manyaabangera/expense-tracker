import { useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

function AppContent() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("token")
    );

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    return (
        <>
            {isLoggedIn && (
                <Navbar onLogout={handleLogout} />
            )}

            <Routes>

                {/* HOME PAGE */}
                <Route
                    path="/"
                    element={
                        <Navigate
                            to={
                                isLoggedIn
                                    ? "/dashboard"
                                    : "/login"
                            }
                            replace
                        />
                    }
                />

                {/* LOGIN */}
                <Route
                    path="/login"
                    element={
                        isLoggedIn ? (
                            <Navigate
                                to="/dashboard"
                                replace
                            />
                        ) : (
                            <Login
                                onLogin={handleLogin}
                            />
                        )
                    }
                />

                {/* REGISTER */}
                <Route
                    path="/register"
                    element={
                        isLoggedIn ? (
                            <Navigate
                                to="/dashboard"
                                replace
                            />
                        ) : (
                            <Register />
                        )
                    }
                />

                {/* DASHBOARD */}
                <Route
                    path="/dashboard"
                    element={
                        isLoggedIn ? (
                            <Dashboard />
                        ) : (
                            <Navigate
                                to="/login"
                                replace
                            />
                        )
                    }
                />

                {/* ADD EXPENSE */}
                <Route
                    path="/add-expense"
                    element={
                        isLoggedIn ? (
                            <AddExpense />
                        ) : (
                            <Navigate
                                to="/login"
                                replace
                            />
                        )
                    }
                />

                {/* UNKNOWN URL */}
                <Route
                    path="*"
                    element={
                        <Navigate
                            to={
                                isLoggedIn
                                    ? "/dashboard"
                                    : "/login"
                            }
                            replace
                        />
                    }
                />

            </Routes>
        </>
    );
}

export default App;