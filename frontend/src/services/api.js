const API_URL = "http://localhost:5000/api";


// AUTHENTICATED REQUEST HELPER
const authenticatedFetch = async (url, options = {}) => {
    const token = localStorage.getItem("token");

    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`
        }
    });

    // Token missing / invalid / expired
    if (response.status === 401) {
        localStorage.removeItem("token");

        window.location.href = "/login";

        throw new Error("Session expired. Please login again.");
    }

    return response;
};


// LOGIN
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
export const registerUser = async (name, email, password) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Registration failed"
        );
    }

    return data;
};

// GET EXPENSES
export const getExpenses = async (category = "", date = "") => {

    const params = new URLSearchParams();

    if (category) {
        params.append("category", category);
    }

    if (date) {
        params.append("date", date);
    }

    const queryString = params.toString();

    const url = queryString
        ? `${API_URL}/expenses?${queryString}`
        : `${API_URL}/expenses`;

    const response = await authenticatedFetch(url, {
        method: "GET"
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch expenses"
        );
    }

    return data;
};


// GET EXPENSE SUMMARY
export const getExpenseSummary = async (
    category = "",
    date = ""
) => {

    const params = new URLSearchParams();

    if (category) {
        params.append("category", category);
    }

    if (date) {
        params.append("date", date);
    }

    const queryString = params.toString();

    const url = queryString
        ? `${API_URL}/expenses/summary?${queryString}`
        : `${API_URL}/expenses/summary`;

    const response = await authenticatedFetch(url, {
        method: "GET"
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch summary"
        );
    }

    return data;
};


// GET CATEGORY SUMMARY
export const getCategorySummary = async (
    category = "",
    date = ""
) => {

    const params = new URLSearchParams();

    if (category) {
        params.append("category", category);
    }

    if (date) {
        params.append("date", date);
    }

    const queryString = params.toString();

    const url = queryString
        ? `${API_URL}/expenses/category-summary?${queryString}`
        : `${API_URL}/expenses/category-summary`;

    const response = await authenticatedFetch(url, {
        method: "GET"
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch category summary"
        );
    }

    return data;
};


// CREATE EXPENSE
export const createExpense = async (expenseData) => {

    const response = await authenticatedFetch(
        `${API_URL}/expenses`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(expenseData)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to create expense"
        );
    }

    return data;
};


// UPDATE EXPENSE
export const updateExpense = async (id, expenseData) => {

    const response = await authenticatedFetch(
        `${API_URL}/expenses/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(expenseData)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to update expense"
        );
    }

    return data;
};


// DELETE EXPENSE
export const deleteExpense = async (id) => {

    const response = await authenticatedFetch(
        `${API_URL}/expenses/${id}`,
        {
            method: "DELETE"
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to delete expense"
        );
    }

    return data;
};