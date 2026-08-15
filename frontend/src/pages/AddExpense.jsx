import { useState } from "react";
import { createExpense } from "../services/api";
import "../styles/AddExpense.css";

function AddExpense() {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");

        try {
            await createExpense({
                title,
                amount: Number(amount),
                category,
                date,
                description
            });

            setMessage("Expense added successfully");

            setTitle("");
            setAmount("");
            setCategory("");
            setDate("");
            setDescription("");

        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="add-expense-page">

            <div className="add-expense-header">
                <h1>Add Expense</h1>
                <p>Record a new expense</p>
            </div>

            <div className="expense-form-card">

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Title</label>

                        <input
                            type="text"
                            placeholder="e.g. Breakfast"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Amount</label>

                        <input
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) =>
                                setAmount(e.target.value)
                            }
                            min="0"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Category</label>

                        <input
                            type="text"
                            placeholder="e.g. Food, Travel"
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Date</label>

                        <input
                            type="date"
                            value={date}
                            onChange={(e) =>
                                setDate(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>

                        <textarea
                            placeholder="Add a short description"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            rows="4"
                        />
                    </div>

                    <button
                        type="submit"
                        className="add-expense-button"
                    >
                        Add Expense
                    </button>

                </form>

                {message && (
                    <div className="expense-message">
                        {message}
                    </div>
                )}

            </div>

        </div>
    );
}

export default AddExpense;