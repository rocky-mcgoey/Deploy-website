/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and elements on the screen that will be clicked or will need to be modified. 
// Do any of these variables need to be initialized when the page is loaded? costPerDay and selectedDays on page load
// When do they need to be reset or updated? costPerDay is updated when a rate button is clicked (20 or 35), selectedDays is updated on Add/remove days on button click; resets on "Clear Days"

let costPerDay = 35;  
let selectedDays = new Set();   

// DOM element references
const totalCostElement = document.querySelector("#calculated-cost");    
const dayButtons = document.querySelectorAll(".day-button");    
const clearButton = document.querySelector("#clear-button");    
const halfDayButton = document.querySelector("#half-day");  
const fullDayButton = document.querySelector("#full-day");  



/********* colour change days of week *********/
// when the day buttons are clicked, we will apply the "clicked" class to that element, and update any other relevant variables. Then, we can recalculate the total cost.
// added challenge: don't update the dayCounter if the same day is clicked more than once. hint: .classList.contains() might be helpful here!
function toggleDayclicked(button) {
    const dayId = button.id;

    if (button.classList.contains("clicked")) {
        button.classList.remove("clicked");
        selectedDays.delete(dayId);
    } else {
        button.classList.add("clicked");
        selectedDays.add(dayId);
    }

    calculateTotalCost();
}

dayButtons.forEach(button => {
    button.addEventListener("click", () => toggleDaySelection(button));
});



/********* clear days *********/
// when the clear-button is clicked, the "clicked" class is removed from all days, any other relevant variables are reset, and the calculated cost is set to 0.
if (clearButton) {
    clearButton.addEventListener("click", () => {
        dayButtons.forEach(button => button.classList.remove("clicked"));
        selectedDays.clear(); 
        calculateTotalCost(); 
    });
}




/********* change rate *********/
// when the half-day button is clicked, set the daily rate to $20, add the "clicked" class to the "half" element, remove it from the "full" element, and recalculate the total cost.
if (halfDayButton) {
    halfDayButton.addEventListener("click", () => {
        costPerDay = 20; 
        halfDayButton.classList.add("clicked"); 
        fullDayButton.classList.remove("clicked"); 
        calculateTotalCost(); 
    });
}


// when the full-day button is clicked, the daily rate is set back to $35, the clicked class is added to "full" and removed from "half", and the total cost is recalculated.
if (fullDayButton) {
    fullDayButton.addEventListener("click", () => {
        costPerDay = 35; 
        fullDayButton.classList.add("clicked"); 
        halfDayButton.classList.remove("clicked"); 
        calculateTotalCost(); 
    });
}


/********* calculate *********/
// when a calculation is needed, set the innerHTML of the calculated-cost element to the appropriate value
function calculateTotalCost() {
    const totalCost = costPerDay * selectedDays.size; 
    if (totalCostElement) {
        totalCostElement.innerHTML = `$${totalCost}`; 
    }
}

document.addEventListener("DOMContentLoaded", () => {
    calculateTotalCost();
});