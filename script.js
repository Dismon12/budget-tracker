document.addEventListener('DOMContentLoaded', function () {
    const transactionForm = document.getElementById('transaction-form');
    const transactionList = document.getElementById('transaction-list');
    const sumBtn = document.getElementById('sum-btn');
    const subtractBtn = document.getElementById('subtract-btn');
    const multiplyBtn = document.getElementById('multiply-btn');
    const divideBtn = document.getElementById('divide-btn');
    const resultDisplay = document.getElementById('result');

    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    function saveTransaction(type, category, amount) {
        transactions.push({ type, category, amount: parseFloat(amount) });
        localStorage.setItem('transactions', JSON.stringify(transactions));
        renderTransactions();
    }

    function deleteTransaction(index) {
        transactions.splice(index, 1);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        renderTransactions();
    }

    function renderTransactions() {
        transactionList.innerHTML = '';
        transactions.forEach((transaction, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><input type="checkbox" data-index="${index}"></td>
                <td>${transaction.type}</td>
                <td>${transaction.category}</td>
                <td>${transaction.amount}</td>
                <td><button onclick="deleteTransaction(${index})">ลบ</button></td>
            `;
            transactionList.appendChild(row);
        });
    }

    transactionForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const type = document.getElementById('type').value;
        const category = document.getElementById('category').value;
        const amount = document.getElementById('amount').value;
        saveTransaction(type, category, amount);
        transactionForm.reset();
    });

    function getSelectedTransactions() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        let selected = [];
        checkboxes.forEach(checkbox => {
            const index = checkbox.getAttribute('data-index');
            selected.push(transactions[index].amount);
        });
        return selected;
    }

    function calculate(operation) {
        const selectedAmounts = getSelectedTransactions();
        if (selectedAmounts.length === 0) {
            resultDisplay.textContent = "กรุณาเลือกรายการ";
            return;
        }

        let result = selectedAmounts[0];
        for (let i = 1; i < selectedAmounts.length; i++) {
            if (operation === 'sum') result += selectedAmounts[i];
            if (operation === 'subtract') result -= selectedAmounts[i];
            if (operation === 'multiply') result *= selectedAmounts[i];
            if (operation === 'divide') result /= selectedAmounts[i];
        }

        resultDisplay.textContent = `ผลลัพธ์: ${result.toFixed(2)}`;
    }

    sumBtn.addEventListener('click', () => calculate('sum'));
    subtractBtn.addEventListener('click', () => calculate('subtract'));
    multiplyBtn.addEventListener('click', () => calculate('multiply'));
    divideBtn.addEventListener('click', () => calculate('divide'));

    renderTransactions();

    window.deleteTransaction = deleteTransaction;
});
