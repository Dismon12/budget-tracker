document.addEventListener('DOMContentLoaded', function () {
    const transactionForm = document.getElementById('transaction-form');
    const transactionList = document.getElementById('transaction-list');
    
    // โหลดข้อมูลจาก localStorage
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    // ฟังก์ชันบันทึกข้อมูล
    function saveTransaction(type, category, amount) {
        transactions.push({ type, category, amount });
        localStorage.setItem('transactions', JSON.stringify(transactions));
        renderTransactions();
    }

    // ฟังก์ชันลบข้อมูล
    function deleteTransaction(index) {
        transactions.splice(index, 1);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        renderTransactions();
    }

    // ฟังก์ชันแสดงข้อมูล
    function renderTransactions() {
        transactionList.innerHTML = '';
        transactions.forEach((transaction, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${transaction.type}</td>
                <td>${transaction.category}</td>
                <td>${transaction.amount}</td>
                <td><button onclick="deleteTransaction(${index})">ลบ</button></td>
            `;
            transactionList.appendChild(row);
        });
    }

    // เมื่อกดปุ่มบันทึก
    transactionForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const type = document.getElementById('type').value;
        const category = document.getElementById('category').value;
        const amount = document.getElementById('amount').value;
        saveTransaction(type, category, amount);
        transactionForm.reset();
    });

    // โหลดข้อมูลเมื่อเปิดหน้าเว็บ
    renderTransactions();

    // ทำให้ฟังก์ชัน deleteTransaction สามารถใช้งานได้ใน HTML
    window.deleteTransaction = deleteTransaction;
});
