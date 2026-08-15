import { useEffect, useState } from "react";
import { updateExpense } from "../services/api";
import "../styles/EditExpense.css";

function EditExpense({ expense, onUpdated, onCancel }) {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (expense) {
            setTitle(expense.title || "");
            setAmount(expense.amount || "");
            setCategory(expense.category || "");

            setDate(
                expense.date
                    ? new Date(expense.date)
                        .toISOString()
                        .split("T")[0]
                    : ""
            );

            setDescription(expense.description || "");
        }
    }, [expense]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");

        try {
            const data = await updateExpense(
                expense._id,
                {
                    title,
                    amount: Number(amount),
                    category,
                    date,
                    description
                }
            );

            setMessage("Expense updated successfully");

            onUpdated(data.expense);

        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="edit-expense">

            <div className="edit-header">
                <h2>Edit Expense</h2>
                <p>Update your expense details</p>
            </div>

            <form onSubmit={handleSubmit}>

                <div className="edit-form-group">
                    <label>Title</label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        required
                    />
                </div>

                <div className="edit-form-group">
                    <label>Amount</label>

                    <input
                        type="number"
                        value={amount}
                        onChange={(e) =>
                            setAmount(e.target.value)
                        }
                        min="0"
                        required
                    />
                </div>

                <div className="edit-form-group">
                    <label>Category</label>

                    <input
                        type="text"
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value)
                        }
                        required
                    />
                </div>

                <div className="edit-form-group">
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

                <div className="edit-form-group">
                    <label>Description</label>

                    <textarea
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                        rows="4"
                    />
                </div>

                <div className="edit-actions">

                    <button
                        type="submit"
                        className="update-button"
                    >
                        Update Expense
                    </button>

                    <button
                        type="button"
                        className="cancel-button"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                </div>

            </form>

            {message && (
                <div className="edit-message">
                    {message}
                </div>
            )}

        </div>
    );
}

export default EditExpense;