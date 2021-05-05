document.querySelector('.formExpense')
.addEventListener('submit', (e) => {
    e.preventDefault();
    addExpense();
});

const addExpense = () => {
    const whereExpeneseOccurred = document.querySelector('#whereExpenseOccurred');
    const descriptionExpense = document.querySelector('#descriptionExpense');
    const costExpense = document.querySelector('#costExpense');
    const dateExpense = document.querySelector('#dateExpense');
    const tableBodyExpenses = document.querySelector('.tableBodyExpenses');
    
    const createTableRowExpense = document.createElement('tr');
    createTableRowExpense.classList.add('tableRowExpense');

    const createTableDataOccurence = document.createElement('td');
    const createTableDataExpenseDescription = document.createElement('td');
    const createTableDataExpenseCost = document.createElement('td');
    createTableDataExpenseCost.classList.add('tableDataCost');
    const createTableDataExpenseDate = document.createElement('td');

    createTableDataOccurence.textContent = whereExpeneseOccurred.value;
    createTableDataExpenseDescription.textContent = descriptionExpense.value;
    createTableDataExpenseCost.textContent = `$${costExpense.value}`;
    createTableDataExpenseDate.textContent = dateReformat(dateExpense.value);

    const tableRowDeleteButton = deleteExpense(createTableRowExpense);
    createTableRowExpense.append(
        createTableDataOccurence, 
        createTableDataExpenseDescription, 
        createTableDataExpenseCost, 
        createTableDataExpenseDate, 
        tableRowDeleteButton
    );
    tableBodyExpenses.appendChild(createTableRowExpense);

    calculateTotalExpense();
};

const dateReformat = (dateExpense) => {
    const dateExpenseArray = dateExpense.split('-');
    let dateExpenseDate = parseInt(dateExpenseArray[2], 10); // Removes leading zero if number is less than 10
    const dateExpenseMonth = dateExpenseArray[1];
    const dateExpenseYear = dateExpenseArray[0];
    const monthsOfTheYear = [
        'January', 
        'February', 
        'March', 
        'April', 
        'May', 
        'June', 
        'July', 
        'August', 
        'September', 
        'October', 
        'November', 
        'December'
    ];
    // adding suffix 'st', 'nd', 'rd', or 'th' to the end of dateExpenseDate
    if ((dateExpenseDate < 10) || (dateExpenseDate > 20)) {
        switch (dateExpenseDate % 10) {
            case 1: 
                dateExpenseDate += 'st';
                break;
            case 2: 
                dateExpenseDate += 'nd';
                break;
            case 3:
                dateExpenseDate += 'rd';
                break;
            default:
                dateExpenseDate += 'th';
        }
    } else {
        dateExpenseDate += 'th';
    }
    const newDateReformatted = `${monthsOfTheYear[dateExpenseMonth - 1]} ${dateExpenseDate} ${dateExpenseYear}`;
    return newDateReformatted;
};

const deleteExpense = (tableRowExpense) => {
    const createTableDataDeleteButton = document.createElement('td');
    const createDeleteButton = document.createElement('button');
    createDeleteButton.classList.add('deleteButton');
    createDeleteButton.textContent = 'Remove';
    createTableDataDeleteButton.append(createDeleteButton);
    createDeleteButton.addEventListener('click', () => {
        tableRowExpense.remove();
        // recalculate total expense each time an item is removed
        calculateTotalExpense();
    });
    return createTableDataDeleteButton;
};

const calculateTotalExpense = () => {
    const totalCostCalculator = document.querySelector('.totalCostCalculator');
    const tableDataCost = document.querySelectorAll('.tableDataCost');
    let calculatedTotal = 0;
    tableDataCost.forEach((enteredCost) => {
        const currentCost = Number((enteredCost.textContent).substring(1)); // Remove $ and converts string to number
        calculatedTotal += currentCost;
    });
    totalCostCalculator.textContent = `$${calculatedTotal.toFixed(2)}`; // Prepends $ and keeps only 2 digits after decimal place
};
    
