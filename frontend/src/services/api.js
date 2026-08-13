const API_URL = "http://localhost:5000/api";

export const loginUser = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Login failed");
    }

    return data;
};

export const getExpenses = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/expenses`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch expenses");
    }

    return data;
};
export const getExpenseSummary = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/expenses/summary`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch summary");
    }

    return data;
};
export const getCategorySummary = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/expenses/category-summary`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch category summary");
    }

    return data;
};
export const createExpense = async (expenseData) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/expenses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(expenseData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to create expense");
    }

    return data;
};
export const updateExpense = async (id, expenseData) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/expenses/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(expenseData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to update expense");
    }

    return data;
};
export const deleteExpense = async (id) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/expenses/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to delete expense");
    }

    return data;
};