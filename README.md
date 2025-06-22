# 🏠 Apartment Expense Tracker

A modern, responsive web application for tracking and splitting apartment expenses among roommates. Built with vanilla JavaScript, HTML5, and CSS3, this application provides an intuitive interface for managing shared expenses with automatic calculations and beautiful visualizations.

![Apartment Expense Tracker](https://img.shields.io/badge/Status-Complete-brightgreen)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![HTML5](https://img.shields.io/badge/HTML5-Valid-orange)
![CSS3](https://img.shields.io/badge/CSS3-Modern-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **📝 Expense Management**: Add and track shared expenses with detailed descriptions
- **💰 Automatic Split Calculations**: Automatically calculate individual shares per expense
- **👥 Roommate Balance Tracking**: Track what each person paid vs. what they owe
- **📊 Real-time Summary**: View total expenses, expense count, and individual balances
- **📈 Visual Analytics**: Bar chart visualization of expense distribution
- **🌙 Dark/Light Theme**: Toggle between dark and light themes for comfortable viewing
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **💾 Local Storage**: Data persists between sessions using browser localStorage
- **🎨 Modern UI**: Beautiful glass-morphism design with smooth animations

## 🚀 Quick Start

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software or dependencies required!

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/apartment-expense-tracker.git
   cd apartment-expense-tracker
   ```

2. **Open the application**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (if you have http-server installed)
     npx http-server
     ```

3. **Start tracking expenses!**
   - The application is ready to use immediately

## 📖 How to Use

### Adding an Expense

1. **Fill in the expense details**:
   - **Description**: What the expense is for (e.g., "Electricity Bill")
   - **Amount**: The total cost of the expense
   - **Paid by**: Who paid for this expense
   - **Split among**: How many people should split this expense

2. **Click "Add Expense"** to save the expense

### Understanding the Summary

- **Total Expenses**: Sum of all recorded expenses
- **Number of Expenses**: Count of all expense entries
- **Individual Shares**: Shows each person's:
  - **Paid**: Total amount they've paid
  - **Owes**: Total amount they owe for their share
  - **Balance**: Net amount (positive = they're owed money, negative = they owe money)

### Managing Data

- **Clear All**: Removes all expenses and resets the application
- **Data Persistence**: All data is automatically saved to your browser's local storage
- **Theme Toggle**: Click the sun/moon icon in the top-right corner to switch themes

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Markup**: HTML5
- **Styling**: CSS3 with CSS Grid and Flexbox
- **Icons**: Font Awesome 6.0
- **Storage**: Browser localStorage API
- **Design**: Glass-morphism UI with CSS custom properties

## 📁 Project Structure

```
apartment-expense-tracker/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🎯 Key Features Explained

### Expense Tracking
- Each expense is stored with a unique ID and timestamp
- Automatic calculation of per-person share
- Validation to ensure all fields are properly filled

### Balance Calculation
- Tracks what each person has paid
- Calculates what each person owes based on expense splits
- Shows net balance for each roommate

### Data Persistence
- Uses browser's localStorage API
- Data survives browser restarts
- No external database required

### Responsive Design
- Mobile-first approach
- Adapts to different screen sizes
- Touch-friendly interface

## 🔧 Customization

### Adding New Features
The modular JavaScript structure makes it easy to extend:

```javascript
// Add new expense types
const expense = {
    id: Date.now(),
    description: "Custom Expense",
    amount: 100.00,
    paidBy: "John",
    splitAmong: 3,
    amountPerPerson: 33.33,
    dateAdded: new Date().toLocaleDateString()
};
```

### Styling Customization
Modify CSS custom properties in `styles.css`:

```css
:root {
    --primary-color: #6366f1;    /* Change primary color */
    --secondary-color: #10b981;  /* Change secondary color */
    --bg-color: #f3f4f6;         /* Change background color */
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Font Awesome](https://fontawesome.com/) for the beautiful icons
- [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) and [Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout) for responsive layouts
- The open-source community for inspiration and best practices

## 📞 Support

If you have any questions or need help with the application:

1. Check the [Issues](https://github.com/yourusername/apartment-expense-tracker/issues) page
2. Create a new issue if your problem isn't already addressed
3. Feel free to reach out with feature requests or bug reports

---

**Made with ❤️ for roommates everywhere**

*Simplify your shared living expenses with this easy-to-use tracker!*
