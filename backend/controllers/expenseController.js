const Expense = require("../models/Expense");
const mongoose = require("mongoose");


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


// GET ALL EXPENSES
const getExpenses = async (req, res) => {
    try {
        const filter = {
            user: req.userId
        };

        if (req.query.category) {
            filter.category = req.query.category;
        }

        if (req.query.date) {
            const startDate = new Date(req.query.date);
            const endDate = new Date(req.query.date);

            endDate.setDate(endDate.getDate() + 1);

            filter.date = {
                $gte: startDate,
                $lt: endDate
            };
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


// GET ONE EXPENSE
const getExpenseById = async (req, res) => {
    try {
        const expense = await Expense.findOne({
            _id: req.params.id,
            user: req.userId
        });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.status(200).json({
            expense: expense
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


// UPDATE EXPENSE
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


// DELETE EXPENSE
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


// EXPENSE SUMMARY
const getExpenseSummary = async (req, res) => {
    try {

        const matchFilter = {
            user: new mongoose.Types.ObjectId(req.userId)
        };

        // Category filter
        if (req.query.category) {
            matchFilter.category = req.query.category;
        }

        // Date filter
        if (req.query.date) {
            const startDate = new Date(req.query.date);
            const endDate = new Date(req.query.date);

            endDate.setDate(endDate.getDate() + 1);

            matchFilter.date = {
                $gte: startDate,
                $lt: endDate
            };
        }

        const result = await Expense.aggregate([
            {
                $match: matchFilter
            },
            {
                $group: {
                    _id: null,
                    totalAmount: {
                        $sum: "$amount"
                    },
                    totalExpenses: {
                        $sum: 1
                    }
                }
            }
        ]);

        const summary = result[0] || {
            totalAmount: 0,
            totalExpenses: 0
        };

        res.status(200).json({
            totalAmount: summary.totalAmount,
            totalExpenses: summary.totalExpenses
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


// CATEGORY SUMMARY
const getCategorySummary = async (req, res) => {
    try {

        const matchFilter = {
            user: new mongoose.Types.ObjectId(req.userId)
        };

        // Category filter
        if (req.query.category) {
            matchFilter.category = req.query.category;
        }

        // Date filter
        if (req.query.date) {
            const startDate = new Date(req.query.date);
            const endDate = new Date(req.query.date);

            endDate.setDate(endDate.getDate() + 1);

            matchFilter.date = {
                $gte: startDate,
                $lt: endDate
            };
        }

        const result = await Expense.aggregate([
            {
                $match: matchFilter
            },
            {
                $group: {
                    _id: "$category",
                    totalAmount: {
                        $sum: "$amount"
                    },
                    totalExpenses: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    totalAmount: -1
                }
            }
        ]);

        res.status(200).json({
            categories: result
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
    deleteExpense,
    getExpenseSummary,
    getCategorySummary
};