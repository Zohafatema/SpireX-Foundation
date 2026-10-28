const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const addExpense = document.getElementById("addExpense");

const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");
const expenseCount = document.getElementById("expenseCount");
const emptyMessage = document.getElementById("emptyMessage");

let expenses = [];

addExpense.addEventListener("click", function () {

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);

    if (name === "" || amount <= 0) {
        alert("Please enter a valid expense.");
        return;
    }

    const expense = {
        id: Date.now(),
        name: name,
        amount: amount
    };

    expenses.push(expense);

    expenseName.value = "";
    expenseAmount.value = "";

    displayExpenses();
});

function displayExpenses() {

    expenseList.innerHTML = "";

    expenses.forEach(function (expense) {

        const expenseItem = document.createElement("div");
        expenseItem.className = "expense-item";

        expenseItem.innerHTML = `
            <div class="expense-info">
                <h3>${expense.name}</h3>
                <p>Added expense</p>
            </div>

            <div class="expense-right">
                <span class="expense-amount">
                    ₹${expense.amount.toFixed(2)}
                </span>

                <button class="delete-btn" onclick="deleteExpense(${expense.id})">
                    Delete
                </button>
            </div>
        `;

        expenseList.appendChild(expenseItem);
    });

    updateSummary();
}

function deleteExpense(id) {

    expenses = expenses.filter(function (expense) {
        return expense.id !== id;
    });

    displayExpenses();
}

function updateSummary() {

    let total = 0;

    expenses.forEach(function (expense) {
        total += expense.amount;
    });

    totalAmount.textContent = total.toFixed(2);
    expenseCount.textContent = expenses.length;

    if (expenses.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}