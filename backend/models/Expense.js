const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    description: {
        type: String
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;