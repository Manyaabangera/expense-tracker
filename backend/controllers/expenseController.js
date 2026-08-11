const Expense = require("../models/Expense");


// CREATE EXPENSE
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


// GET ALL EXPENSES OF LOGGED-IN USER
const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({
            user: req.userId
        });

        res.status(200).json({
            expenses: expenses
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


// GET ONE EXPENSE
const getExpenses = async (req, res) => {
    try {
        const filter = {
            user: req.userId
        };

        if (req.query.category) {
            filter.category = req.query.category;
        }

        const expenses = await Expense.find(filter);

        res.status(200).json({
            expenses: expenses
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
const updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.userId
            },
            {
                title: req.body.title,
                amount: req.body.amount,
                category: req.body.category,
                date: req.body.date,
                description: req.body.description
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.status(200).json({
            message: "Expense updated successfully",
            expense: expense
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findOneAndDelete({
            _id: req.params.id,
            user: req.userId
        });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.status(200).json({
            message: "Expense deleted successfully"
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
};