import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";

function App() {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Login />;
    }

    return (
        <div>
            <Dashboard />

            <hr />

            <AddExpense />
        </div>
    );
}

export default App;