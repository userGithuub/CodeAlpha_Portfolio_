document.addEventListener('DOMContentLoaded', () => {
    loadExpenses();
    updateTotalBudget(); // Initialize total budget on page load
});

document.getElementById('expense-form').addEventListener('submit', addExpense);
document.getElementById('date-filter').addEventListener('change', filterExpenses);

function addExpense(e) {
    e.preventDefault();

    const name = document.getElementById('expense-name').value.trim();
    const amount = parseFloat(document.getElementById('expense-amount').value.trim());
    const dateInput = document.getElementById('expense-date').value.trim();
    const date = formatDate(dateInput);

    if (name !== '' && !isNaN(amount) && date !== '') {
        const expense = { id: Date.now(), name, amount, date };
        saveExpense(expense);
        loadExpenses(); // Reload expenses to maintain sorted order
        updateTotalBudget(); // Update budget after adding new expense
        document.getElementById('expense-form').reset();
    }
}

function formatDate(dateInput) {
    const parts = dateInput.split('-');
    if (parts.length === 3) {
        const day = parts[0].padStart(2, '0');
        const month = parts[1].padStart(2, '0');
        const year = parts[2];
        return `${day}-${month}-${year}`;
    }
    return '';
}

function parseDate(dateStr) {
    const [day, month, year] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
}

function addExpenseToDOM(expense) {
    const expenseList = document.getElementById('expense-list');

    const li = document.createElement('li');
    li.dataset.id = expense.id;
    li.dataset.date = expense.date;

    li.innerHTML = `
        ${expense.name} - ${expense.amount} - ${expense.date}
        <button class="delete-btn">Delete</button>
    `;

    li.querySelector('.delete-btn').addEventListener('click', deleteExpense);
    expenseList.appendChild(li);
}

function deleteExpense(e) {
    const li = e.target.parentElement;
    const id = li.dataset.id;
    li.remove();
    removeExpense(id);
    loadExpenses(); // Reload expenses to maintain sorted order
    updateTotalBudget(); // Update budget after deletion
}

function saveExpense(expense) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function removeExpense(id) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses = expenses.filter(expense => expense.id !== parseInt(id));
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function loadExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Sort expenses by date
    expenses.sort((a, b) => parseDate(a.date) - parseDate(b.date));

    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = ''; // Clear existing items

    expenses.forEach(expense => addExpenseToDOM(expense));
    updateDateDropdown(); // Clear and update dropdown with sorted dates
    updateTotalBudget(); // Update budget display
}

function updateDateDropdown() {
    const dateFilter = document.getElementById('date-filter');
    dateFilter.innerHTML = '<option value="all">All Dates</option>'; // Clear existing options and add default option

    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const uniqueDates = new Set();

    expenses.forEach(expense => uniqueDates.add(expense.date));

    // Convert set to array and sort
    const sortedDates = Array.from(uniqueDates).sort((a, b) => parseDate(a) - parseDate(b));

    sortedDates.forEach(date => {
        const option = document.createElement('option');
        option.value = date;
        option.textContent = date;
        dateFilter.appendChild(option);
    });
}

function filterExpenses() {
    const selectedDate = document.getElementById('date-filter').value;
    const expenses = document.querySelectorAll('#expense-list li');

    expenses.forEach(expense => {
        if (selectedDate === 'all' || expense.dataset.date === selectedDate) {
            expense.style.display = 'flex';
        } else {
            expense.style.display = 'none';
        }
    });
}

function updateTotalBudget() {
    const totalBudgetInput = document.getElementById('total-budget');
    const remainingBudgetDisplay = document.getElementById('remaining-budget');

    let totalBudget = parseFloat(totalBudgetInput.value.trim());
    if (isNaN(totalBudget) || totalBudget <= 0) {
        remainingBudgetDisplay.textContent = 'Remaining Budget: Not set';
        return;
    }

    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const remainingBudget = totalBudget - totalExpenses;

    remainingBudgetDisplay.textContent = `Remaining Budget: ${remainingBudget.toFixed(2)}`;
}
