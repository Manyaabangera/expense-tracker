const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getExpenseSummary,
    getCategorySummary
} = require("../controllers/expenseController");

const router = express.Router();

router.post("/expenses", authMiddleware, createExpense);

router.get("/expenses", authMiddleware, getExpenses);

router.get("/expenses/summary", authMiddleware, getExpenseSummary);

router.get("/expenses/category-summary", authMiddleware, (req, res) => {
    console.log("CATEGORY SUMMARY ROUTE HIT");
    getCategorySummary(req, res);
});

router.get("/expenses/:id", authMiddleware, getExpenseById);

router.put("/expenses/:id", authMiddleware, updateExpense);

router.delete("/expenses/:id", authMiddleware, deleteExpense);

module.exports = router;

