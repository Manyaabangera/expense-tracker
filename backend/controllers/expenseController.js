const Expense = require("../models/Expense");

const createExpense = async (req, res) => {
    try {
        const expense = new Expense({
            title: req.body.title,
            amount: req.body.amount,
            category: req.body.category,
            date: req.body.date,
            description: req.body.description,
            user: req.userId
        });

        await expense.save();

        res.status(201).json({
            message: "Expense created successfully",
            expense: expense
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = createExpense;