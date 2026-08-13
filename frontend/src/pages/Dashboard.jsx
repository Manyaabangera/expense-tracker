import { useEffect, useState } from "react";
import EditExpense from "./EditExpense";

import {
    getExpenses,
    getExpenseSummary,
    getCategorySummary,
    deleteExpense
} from "../services/api";

function Dashboard() {

    const [expenses, setExpenses] = useState([]);
    const [message, setMessage] = useState("");
    const [editingExpense, setEditingExpense] = useState(null);

    const [summary, setSummary] = useState({
        totalAmount: 0,
        totalExpenses: 0
    });

    const [categories, setCategories] = useState([]);

    // Load all dashboard data
    const loadDashboardData = async () => {
        try {
            const expenseData = await getExpenses();
            setExpenses(expenseData.expenses);

            const summaryData = await getExpenseSummary();
            setSummary(summaryData);

            const categoryData = await getCategorySummary();
            setCategories(categoryData.categories);

        } catch (error) {
            setMessage(error.message);
        }
    };

    // Load data when Dashboard opens
    useEffect(() => {
        loadDashboardData();
    }, []);

    // Delete expense
    const handleDelete = async (id) => {
        try {
            await deleteExpense(id);

            setMessage("Expense deleted successfully");

            await loadDashboardData();

        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div>

            <h1>Dashboard</h1>

            {/* Summary */}
            <div>

                <h2>
                    Total Spending: ₹{summary.totalAmount}
                </h2>

                <h2>
                    Total Expenses: {summary.totalExpenses}
                </h2>

            </div>

            {/* Category Summary */}
            <div>

                <h2>Category Summary</h2>

                {categories.length === 0 ? (
                    <p>No category data found.</p>
                ) : (
                    categories.map((category) => (
                        <div key={category._id}>

                            <h3>{category._id}</h3>

                            <p>
                                Total Amount: ₹{category.totalAmount}
                            </p>

                            <p>
                                Total Expenses: {category.totalExpenses}
                            </p>

                        </div>
                    ))
                )}

            </div>

            {/* Messages */}
            {message && (
                <p>{message}</p>
            )}

            {/* Edit Form */}
            {editingExpense && (
                <EditExpense
                    expense={editingExpense}

                    onUpdated={async () => {

                        setEditingExpense(null);

                        setMessage(
                            "Expense updated successfully"
                        );

                        await loadDashboardData();
                    }}

                    onCancel={() => {
                        setEditingExpense(null);
                    }}
                />
            )}

            {/* Expense List */}
            <h2>My Expenses</h2>

            {expenses.length === 0 ? (

                <p>No expenses found.</p>

            ) : (

                expenses.map((expense) => (

                    <div key={expense._id}>

                        <h3>{expense.title}</h3>

                        <p>
                            Amount: ₹{expense.amount}
                        </p>

                        <p>
                            Category: {expense.category}
                        </p>

                        <p>
                            Date: {expense.date}
                        </p>

                        <p>
                            {expense.description}
                        </p>

                        <button
                            onClick={() =>
                                setEditingExpense(expense)
                            }
                        >
                            Edit
                        </button>

                        <button
                            onClick={() =>
                                handleDelete(expense._id)
                            }
                        >
                            Delete
                        </button>

                        <hr />

                    </div>

                ))
            )}

        </div>
    );
}

export default Dashboard;