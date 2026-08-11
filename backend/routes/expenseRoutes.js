const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
} = require("../controllers/expenseController");

const router = express.Router();

router.post("/expenses", authMiddleware, createExpense);

router.get("/expenses", authMiddleware, getExpenses);

router.get("/expenses/:id", authMiddleware, getExpenseById);

router.put("/expenses/:id", authMiddleware, updateExpense);

router.delete("/expenses/:id", authMiddleware, deleteExpense);

module.exports = router;