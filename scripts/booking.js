/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and elements on the screen that will be clicked or will need to be modified. 
// Do any of these variables need to be initialized when the page is loaded? costPerDay and selectedDays on page load
// When do they need to be reset or updated? costPerDay is updated when a rate button is clicked (20 or 35), selectedDays is updated on Add/remove days on button click; resets on "Clear Days"
/********* Variables *********/
let costPerDay = 35; 
let selectedDays = new Set(); 

let totalCostElement = document.getElementById("calculated-cost");
let clearButton = document.getElementById("clear-button");
let halfDayButton = document.getElementById("half");
let fullDayButton = document.getElementById("full");


let dayButtons = [
    document.getElementById("monday"),
    document.getElementById("tuesday"),
    document.getElementById("wednesday"),
    document.getElementById("thursday"),
    document.getElementById("friday"),
];



function toggleDay(button) {
    if (button.classList.toggle("clicked")) {
        selectedDays.add(button.textContent); 
    } else {
        selectedDays.delete(button.textContent);
    }
    updateCost();
}

function clearDays() {
    selectedDays.clear();
    dayButtons.forEach(button => button.classList.remove("clicked"));
    updateCost();
}

function updateRate(rate, clickedButton, otherButton) {
    costPerDay = rate;
    clickedButton.classList.add("clicked");
    otherButton.classList.remove("clicked");
    updateCost();
}

function updateCost() {
    totalCostElement.textContent = `${costPerDay * selectedDays.size}`;
}

dayButtons.forEach(button => {
    button.addEventListener("click", () => toggleDay(button));
});

if (clearButton) {
    clearButton.addEventListener("click", clearDays);
}

if (halfDayButton && fullDayButton) {
    halfDayButton.addEventListener("click", () => updateRate(20, halfDayButton, fullDayButton));
    fullDayButton.addEventListener("click", () => updateRate(35, fullDayButton, halfDayButton));
}

updateCost();