import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar({ onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            {/* This is a JSX comment */}
            <div className="navbar-container">

                <Link to="/dashboard" className="navbar-brand">
                    Expense Tracker
                </Link>

                <div className="navbar-menu">

                    <Link
                        to="/dashboard"
                        className="navbar-link"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/add-expense"
                        className="navbar-link add-expense-link"
                    >
                        Add Expense
                    </Link>

                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;