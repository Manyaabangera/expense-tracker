import { useState } from "react";
import { updateExpense } from "../services/api";

function EditExpense({ expense, onUpdated, onCancel }) {
    const [title, setTitle] = useState(expense.title);
    const [amount, setAmount] = useState(expense.amount);
    const [category, setCategory] = useState(expense.category);
    const [date, setDate] = useState(expense.date.slice(0, 10));
    const [description, setDescription] = useState(expense.description);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await updateExpense(expense._id, {
                title,
                amount: Number(amount),
                category,
                date,
                description
            });

            setMessage("Expense updated successfully");

            onUpdated(data.expense);
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div>
            <h2>Edit Expense</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button type="submit">
                    Update Expense
                </button>

                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default EditExpense;