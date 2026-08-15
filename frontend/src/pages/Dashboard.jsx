import { useEffect, useState } from "react";
import EditExpense from "./EditExpense";
import "../styles/Dashboard.css";

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

    const [categoryFilter, setCategoryFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");

    const loadDashboardData = async () => {
        try {
            const expenseData = await getExpenses(
                categoryFilter,
                dateFilter
            );

            setExpenses(expenseData.expenses);

            const summaryData = await getExpenseSummary(
                categoryFilter,
                dateFilter
            );

            setSummary(summaryData);

            const categoryData = await getCategorySummary(
                categoryFilter,
                dateFilter
            );

            setCategories(categoryData.categories);

        } catch (error) {
            setMessage(error.message);
        }
    };

    useEffect(() => {
        loadDashboardData();
    }, [categoryFilter, dateFilter]);

    const handleDelete = async (id) => {
        try {
            await deleteExpense(id);

            setMessage("Expense deleted successfully");

            await loadDashboardData();

        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleClearFilters = () => {
        setCategoryFilter("");
        setDateFilter("");
        setMessage("");
    };

    return (
        <div className="dashboard">

            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p>Track and manage your expenses</p>
            </div>

            {/* SUMMARY CARDS */}
            <div className="summary-container">

                <div className="summary-card">
                    <p>Total Spending</p>
                    <h2>₹{summary.totalAmount}</h2>
                </div>

                <div className="summary-card">
                    <p>Total Expenses</p>
                    <h2>{summary.totalExpenses}</h2>
                </div>

            </div>

            {/* FILTER SECTION */}
            <div className="filter-card">

                <h2>Filter Expenses</h2>

                <div className="filter-container">

                    <div className="filter-group">
                        <label>Category</label>

                        <select
                            value={categoryFilter}
                            onChange={(e) =>
                                setCategoryFilter(e.target.value)
                            }
                        >
                            <option value="">All Categories</option>

                            {categories.map((category) => (
                                <option
                                    key={category._id}
                                    value={category._id}
                                >
                                    {category._id}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Date</label>

                        <input
                            type="date"
                            value={dateFilter}
                            onChange={(e) =>
                                setDateFilter(e.target.value)
                            }
                        />
                    </div>

                    <button
                        className="clear-button"
                        onClick={handleClearFilters}
                    >
                        Clear Filters
                    </button>

                </div>

            </div>

            {/* MESSAGE */}
            {message && (
                <div className="message">
                    {message}
                </div>
            )}

            {/* CATEGORY SUMMARY */}
            <div className="section">

                <h2>Category Summary</h2>

                <div className="category-container">

                    {categories.length === 0 ? (
                        <p>No category data found.</p>
                    ) : (
                        categories.map((category) => (
                            <div
                                className="category-card"
                                key={category._id}
                            >
                                <h3>{category._id}</h3>

                                <p>
                                    Amount: ₹{category.totalAmount}
                                </p>

                                <p>
                                    Expenses: {category.totalExpenses}
                                </p>
                            </div>
                        ))
                    )}

                </div>

            </div>

            {/* EDIT EXPENSE */}
            {editingExpense && (
                <div className="edit-container">

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

                </div>
            )}

            {/* EXPENSE LIST */}
            <div className="section">

                <h2>My Expenses</h2>

                {expenses.length === 0 ? (
                    <div className="empty-state">
                        <p>No expenses found.</p>
                    </div>
                ) : (
                    <div className="expense-container">

                        {expenses.map((expense) => (
                            <div
                                className="expense-card"
                                key={expense._id}
                            >

                                <div className="expense-info">

                                    <h3>{expense.title}</h3>

                                    <p>
                                        Amount:
                                        <strong>
                                            ₹{expense.amount}
                                        </strong>
                                    </p>

                                    <p>
                                        Category:{" "}
                                        {expense.category}
                                    </p>

                                    <p>
                                        Date:{" "}
                                        {new Date(
                                            expense.date
                                        ).toLocaleDateString()}
                                    </p>

                                    {expense.description && (
                                        <p>
                                            {expense.description}
                                        </p>
                                    )}

                                </div>

                                <div className="expense-actions">

                                    <button
                                        className="edit-button"
                                        onClick={() =>
                                            setEditingExpense(
                                                expense
                                            )
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            handleDelete(
                                                expense._id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}

export default Dashboard;