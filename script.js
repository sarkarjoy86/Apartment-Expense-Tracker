// Expense Tracker Application
class ExpenseTracker {
    constructor() {
        this.expenses = [];
        this.init();
    }

    // Initialize the application
    init() {
        this.loadFromStorage();
        this.bindEvents();
        this.updateDisplay();
    }

    // Bind event listeners
    bindEvents() {
        const form = document.getElementById('expense-form');
        const clearBtn = document.getElementById('clear-all');

        form.addEventListener('submit', (e) => this.handleSubmit(e));
        clearBtn.addEventListener('click', () => this.clearAll());
    }

    // Handle form submission
    handleSubmit(e) {
        e.preventDefault();
        
        const description = document.getElementById('description').value.trim();
        const amountInput = document.getElementById('amount').value;
        let amount = parseFloat(amountInput);
        amount = Math.round(amount * 100) / 100;
        const paidBy = document.getElementById('paid-by').value.trim();
        const splitAmong = parseInt(document.getElementById('split-among').value);

        // Validate inputs
        if (!description || !amount || !paidBy || !splitAmong) {
            alert('Please fill in all fields');
            return;
        }

        if (amount <= 0) {
            alert('Amount must be greater than 0');
            return;
        }

        if (splitAmong <= 0) {
            alert('Number of roommates must be greater than 0');
            return;
        }

        // Create expense object
        const expense = {
            id: Date.now(),
            description,
            amount,
            paidBy,
            splitAmong,
            amountPerPerson: amount / splitAmong,
            dateAdded: new Date().toLocaleDateString()
        };

        // Add to expenses array
        this.expenses.push(expense);
        
        // Save to localStorage
        this.saveToStorage();
        
        // Update display
        this.updateDisplay();
        
        // Reset form
        document.getElementById('expense-form').reset();
        
        // Show success message
        this.showNotification('Expense added successfully!');
    }

    // Update all display elements
    updateDisplay() {
        this.displayExpenses();
        this.displaySummary();
        this.renderSummaryBarVisualization();
    }

    // Display expense list
    displayExpenses() {
        const expenseList = document.getElementById('expense-list');
        
        if (this.expenses.length === 0) {
            expenseList.innerHTML = `
                <div class="empty-state">
                    <p>No expenses added yet</p>
                    <small>Add your first expense using the form above</small>
                </div>
            `;
            return;
        }

        let html = '';
        this.expenses.forEach(expense => {
            html += `
                <div class="expense-item">
                    <div class="expense-header">
                        <div class="expense-description">${expense.description}</div>
                        <div class="expense-amount">$${expense.amount.toFixed(2)}</div>
                    </div>
                    <div class="expense-details">
                        <div class="expense-detail">
                            <strong>Paid by</strong>
                            <span>${expense.paidBy}</span>
                        </div>
                        <div class="expense-detail">
                            <strong>Split among</strong>
                            <span>${expense.splitAmong} people</span>
                        </div>
                        <div class="expense-detail">
                            <strong>Per person</strong>
                            <span>$${expense.amountPerPerson.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        
        expenseList.innerHTML = html;
    }

    // Display summary information
    displaySummary() {
        const totalExpenses = this.calculateTotalExpenses();
        const expenseCount = this.expenses.length;
        
        // Update summary cards
        document.getElementById('total-expenses').textContent = `$${totalExpenses.toFixed(2)}`;
        document.getElementById('expense-count').textContent = expenseCount;
        
        // Update roommate summary
        this.displayRoommateSummary();
    }

    // Display roommate summary
    displayRoommateSummary() {
        const roommateSummary = document.getElementById('roommate-summary');
        const roommateData = this.calculateRoommateShares();
        
        if (Object.keys(roommateData).length === 0) {
            roommateSummary.innerHTML = '';
            return;
        }

        let html = '<h3 style="margin-bottom: 15px; color: #4a5568;">Individual Shares</h3>';
        
        Object.entries(roommateData)
            .sort(([,a], [,b]) => b.owes - a.owes)
            .forEach(([name, data]) => {
                html += `
                    <div class="roommate-item">
                        <div class="roommate-name">${name}</div>
                        <div class="roommate-amount">
                            Paid: $${data.paid.toFixed(2)} | 
                            Owes: $${data.owes.toFixed(2)} | 
                            Balance: <span style="color: ${data.balance >= 0 ? '#38a169' : '#e53e3e'}">
                                ${data.balance >= 0 ? '+' : ''}$${data.balance.toFixed(2)}
                            </span>
                        </div>
                    </div>
                `;
            });
        
        roommateSummary.innerHTML = html;
    }

    // Calculate total expenses
    calculateTotalExpenses() {
        return this.expenses.reduce((total, expense) => total + expense.amount, 0);
    }

    // Calculate individual roommate shares
    calculateRoommateShares() {
        const roommates = {};
        
        this.expenses.forEach(expense => {
            // Track what each person paid
            if (!roommates[expense.paidBy]) {
                roommates[expense.paidBy] = { paid: 0, owes: 0, balance: 0 };
            }
            roommates[expense.paidBy].paid += expense.amount;
            
            // Calculate what each person owes for this expense
            const sharePerPerson = expense.amount / expense.splitAmong;
            // For simplicity, we'll assume the expense is split among all mentioned roommates
            // In a more complex version, you could specify which roommates to include
            const allRoommates = this.getAllRoommates();
            const roommatesForThisExpense = allRoommates.slice(0, expense.splitAmong);
            roommatesForThisExpense.forEach(roommate => {
                if (!roommates[roommate]) {
                    roommates[roommate] = { paid: 0, owes: 0, balance: 0 };
                }
                roommates[roommate].owes += sharePerPerson;
            });
        });
        
        // Calculate balance for each roommate
        Object.keys(roommates).forEach(name => {
            roommates[name].balance = roommates[name].paid - roommates[name].owes;
        });
        
        return roommates;
    }

    // Get all unique roommate names
    getAllRoommates() {
        const names = new Set();
        this.expenses.forEach(expense => {
            names.add(expense.paidBy);
        });
        return Array.from(names);
    }

    // Clear all expenses
    clearAll() {
        if (this.expenses.length === 0) {
            this.showNotification('No expenses to clear');
            return;
        }
        
        if (confirm('Are you sure you want to clear all expenses? This action cannot be undone.')) {
            this.expenses = [];
            this.saveToStorage();
            this.updateDisplay();
            this.showNotification('All expenses cleared');
        }
    }

    // Save to localStorage
    saveToStorage() {
        try {
            // Note: In the actual implementation, you would use localStorage
            // For this demo, we'll store in a variable since localStorage isn't available
            this.storageData = JSON.stringify(this.expenses);
        } catch (error) {
            console.error('Error saving to storage:', error);
        }
    }

    // Load from localStorage
    loadFromStorage() {
        try {
            // Note: In the actual implementation, you would use localStorage
            // For this demo, we'll initialize with empty array
            const stored = this.storageData || '[]';
            this.expenses = JSON.parse(stored);
        } catch (error) {
            console.error('Error loading from storage:', error);
            this.expenses = [];
        }
    }

    // Show notification (simple alert for now)
    showNotification(message) {
        // In a more advanced version, you could create a custom notification system
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #48bb78;
            color: white;
            padding: 15px 20px;
            border-radius: 6px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            font-weight: 600;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }

    // Add this method to render the summary bar visualization
    renderSummaryBarVisualization() {
        const container = document.getElementById('summary-bar-visualization');
        if (!container) return;
        if (this.expenses.length === 0) {
            container.innerHTML = '';
            return;
        }
        const maxAmount = Math.max(...this.expenses.map(e => e.amount));
        let html = '';
        this.expenses.forEach(expense => {
            const barWidth = maxAmount > 0 ? (expense.amount / maxAmount) * 100 : 0;
            html += `
                <div>
                    <div class="summary-expense-bar-label">
                        <span>${expense.description}</span>
                        <span>$${expense.amount.toFixed(2)}</span>
                    </div>
                    <div class="summary-expense-bar-container">
                        <div class="summary-expense-bar" style="width: ${barWidth}%;"></div>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ExpenseTracker();
});

// Add some sample data for demonstration (optional)
// Uncomment the following code to add sample expenses on first load
/*
document.addEventListener('DOMContentLoaded', () => {
    const tracker = new ExpenseTracker();
    
    // Add sample data if no expenses exist
    if (tracker.expenses.length === 0) {
        const sampleExpenses = [
            {
                id: 1,
                description: "Rent",
                amount: 1200,
                paidBy: "Alex",
                splitAmong: 3,
                amountPerPerson: 400,
                dateAdded: new Date().toLocaleDateString()
            },
            {
                id: 2,
                description: "Electricity Bill",
                amount: 80,
                paidBy: "Sarah",
                splitAmong: 3,
                amountPerPerson: 26.67,
                dateAdded: new Date().toLocaleDateString()
            },
            {
                id: 3,
                description: "Groceries",
                amount: 150,
                paidBy: "Mike",
                splitAmong: 3,
                amountPerPerson: 50,
                dateAdded: new Date().toLocaleDateString()
            }
        ];
        
        tracker.expenses = sampleExpenses;
        tracker.saveToStorage();
        tracker.updateDisplay();
    }
});
*/

// Theme Toggle Functionality
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const html = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add animation to the button
    themeToggleBtn.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggleBtn.style.transform = '';
    }, 300);
});

// Enhanced animation for adding new expenses
function addExpenseToList(expense) {
    const expenseList = document.getElementById('expense-list');
    const expenseElement = document.createElement('div');
    expenseElement.className = 'expense-item';
    expenseElement.style.opacity = '0';
    expenseElement.style.transform = 'translateY(20px)';
    
    expenseElement.innerHTML = `
        <div class="expense-header">
            <span class="expense-description">${expense.description}</span>
            <span class="expense-amount">$${expense.amount.toFixed(2)}</span>
        </div>
        <div class="expense-details">
            <div class="expense-detail">
                <strong>Paid by</strong>
                <span>${expense.paidBy}</span>
            </div>
            <div class="expense-detail">
                <strong>Split among</strong>
                <span>${expense.splitAmong} people</span>
            </div>
            <div class="expense-detail">
                <strong>Per person</strong>
                <span>$${(expense.amount / expense.splitAmong).toFixed(2)}</span>
            </div>
        </div>
    `;
    
    expenseList.insertBefore(expenseElement, expenseList.firstChild);
    
    // Trigger animation
    requestAnimationFrame(() => {
        expenseElement.style.transition = 'all 0.5s ease-out';
        expenseElement.style.opacity = '1';
        expenseElement.style.transform = 'translateY(0)';
    });
}

// Enhanced animation for updating summary
function updateSummary() {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const expenseCount = expenses.length;
    
    const totalExpensesElement = document.getElementById('total-expenses');
    const expenseCountElement = document.getElementById('expense-count');
    
    // Animate the numbers
    animateNumber(totalExpensesElement, totalExpenses);
    animateNumber(expenseCountElement, expenseCount);
    
    updateRoommateSummary();
}

function animateNumber(element, targetValue) {
    const currentValue = parseFloat(element.textContent.replace('$', '')) || 0;
    const duration = 1000; // 1 second
    const steps = 60; // 60fps
    const increment = (targetValue - currentValue) / steps;
    let currentStep = 0;
    
    const animate = () => {
        currentStep++;
        const newValue = currentValue + (increment * currentStep);
        
        if (element.id === 'total-expenses') {
            element.textContent = `$${newValue.toFixed(2)}`;
        } else {
            element.textContent = Math.round(newValue);
        }
        
        if (currentStep < steps) {
            requestAnimationFrame(animate);
        }
    };
    
    requestAnimationFrame(animate);
}

// Enhanced animation for roommate summary
function updateRoommateSummary() {
    const roommateSummary = document.getElementById('roommate-summary');
    const roommateBalances = calculateRoommateBalances();
    
    roommateSummary.innerHTML = '';
    
    Object.entries(roommateBalances).forEach(([name, amount]) => {
        const roommateElement = document.createElement('div');
        roommateElement.className = 'roommate-item';
        roommateElement.style.opacity = '0';
        roommateElement.style.transform = 'translateX(-20px)';
        
        roommateElement.innerHTML = `
            <span class="roommate-name">${name}</span>
            <span class="roommate-amount">${amount >= 0 ? '+' : ''}$${amount.toFixed(2)}</span>
        `;
        
        roommateSummary.appendChild(roommateElement);
        
        // Trigger animation
        requestAnimationFrame(() => {
            roommateElement.style.transition = 'all 0.5s ease-out';
            roommateElement.style.opacity = '1';
            roommateElement.style.transform = 'translateX(0)';
        });
    });
}