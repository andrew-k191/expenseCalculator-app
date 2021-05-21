const expenseArray = JSON.parse(localStorage.getItem('expenseArray')) || [];
document.querySelector('.expenseForm')
.addEventListener('submit', (e) => {
  e.preventDefault();

  const whereExpenseOccurred = document.querySelector('#whereExpenseOccurred');
  const descriptionExpense = document.querySelector('#descriptionExpense');
  const costExpense = document.querySelector('#costExpense');
  const dateExpense = document.querySelector('#dateExpense');

  const expenseItem = {
    id: Date.now(),
    date: dateReformat(dateExpense.value),
    description: descriptionExpense.value,
    amount: `$${costExpense.value}`,
    vendor: whereExpenseOccurred.value
  };

  addExpense(expenseItem);
  document.querySelector('.expenseForm').reset();
});

const addExpense = (expense) => {
  renderExpenseRow(expense);
  expenseArray.push(expense);
  pushToLocalStorage(expenseArray);
};

const pushToLocalStorage = (array) => {
  localStorage.setItem('expenseArray', JSON.stringify(array));
};

const renderExpenseRow = (expense) => {
  const tableBodyExpenses = document.querySelector('.tableBodyExpenses');
  
  const createTableRowExpense = document.createElement('tr');
  createTableRowExpense.classList.add('tableRowExpense');
  tableBodyExpenses.appendChild(createTableRowExpense);

  const locationCell = createCell(expense.vendor);
  createTableRowExpense.appendChild(locationCell);

  const descriptionCell = createCell(expense.description);
  createTableRowExpense.appendChild(descriptionCell);

  const costCell = createCell(expense.amount);
  costCell.classList.add('expenseAmount');
  createTableRowExpense.appendChild(costCell);

  const dateCell = createCell(expense.date);
  createTableRowExpense.appendChild(dateCell);
  const deleteCell = document.createElement('td');

  const deleteButton = createDeleteButton(expense);
  createTableRowExpense.appendChild(deleteCell);
  deleteCell.appendChild(deleteButton);

  calculateTotalExpense();
};

const createCell = (expense) => {
  const dataCell = document.createElement('td');
  dataCell.textContent = expense;
  return dataCell;
};

const createDeleteButton = (expense) => {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Remove';
  deleteButton.setAttribute('class', 'deleteButton');

  deleteButton.addEventListener('click', (e) => {
    e.preventDefault();
    deleteExpense(deleteButton, expense.id);
  });
  return deleteButton;
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
  const newDateReformatted = `${ 
  monthsOfTheYear[dateExpenseMonth - 1]
  } ${dateExpenseDate} ${dateExpenseYear}`;
  return newDateReformatted;
};

const deleteExpense = (deleteButton, id) => {
  deleteButton.parentElement.parentElement.remove();
  for (let i = 0; i < expenseArray.length; i++) {
    if (expenseArray[i].id === id) {
      expenseArray.splice(i, 1);
      pushToLocalStorage(expenseArray);
      calculateTotalExpense();
    }
  }
};

const calculateTotalExpense = () => {
  const totalCostCalculator = document.querySelector('.totalCostCalculator');
  const expenseAmount = document.querySelectorAll('.expenseAmount');
  let calculatedTotal = 0;
  expenseAmount.forEach((enteredCost) => {
    const currentCost = Number((enteredCost.textContent).substring(1)); // Remove $ and converts string to number
    calculatedTotal += currentCost;
  });
  totalCostCalculator.textContent = `$${calculatedTotal.toFixed(2)}`; // Prepends $ and keeps only 2 digits after decimal place
};

window.addEventListener('load', (e) => {
  e.preventDefault();
  expenseArray.forEach((expense) => {
    renderExpenseRow(expense);
  });
});
