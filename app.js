const form = document.querySelector('#loan-form');
const amount = document.querySelector('#amount');
const interest = document.querySelector('#interest');
const paymentSchedule = document.querySelector('#payment-schedule');
const years = document.querySelector('#years');
//--------------------
const monthlyPayment = document.querySelector('#monthly-payment');
const biweeklyPayment = document.querySelector('#biweekly-payment');
const weeklyPayment = document.querySelector('#weekly-payment');
const totalPayment = document.querySelector('#total-payment');
const totalInterest = document.querySelector('#total-interest');
//-----------------------
const heading = document.querySelector('h1');
const headingContainer = document.querySelector('.card');
//-------------------------
const results = document.querySelector('#results');
const loading = document.querySelector('#loading');

//Creating the calculate interest event
form.addEventListener('submit', function (e) {
    //Preventing form submmitiong
    e.preventDefault();
    showHideResults('block');
    setTimeout(calculateLoandResults,2000)
});


//Creating form to calculate loan results
function calculateLoandResults() {
    //Creating formulas inputs
    const amountSet = parseInt(amount.value); 
    const interestSet = interest.value / 100 / 12;
    const yearsSet = years.value * 12;
    const x = Math.pow((1 + interestSet), yearsSet);
    const monthlyPaymentSet = (amountSet * interestSet * x) / (x - 1);
    if (isFinite(monthlyPaymentSet) && amount.value != '') {
        //Setting values to the UI input
        monthlyPayment.value = (monthlyPaymentSet).toFixed(2);
        biweeklyPayment.value = (monthlyPaymentSet / 2).toFixed(2);
        weeklyPayment.value = (monthlyPaymentSet / 4).toFixed(2);
        totalPayment.value = (monthlyPaymentSet * yearsSet).toFixed(2);
        totalInterest.value = ((monthlyPaymentSet * yearsSet) - amountSet).toFixed(2);
        showHideResults('none', 'block');

        if (paymentSchedule.value === '1') {
            showHideSchedule();
        } else if (paymentSchedule.value === '2') {
            showHideSchedule('none', 'block', 'none');
        } else if (paymentSchedule.value === '3') {
            showHideSchedule('none', 'none', 'block');
        }else{
            errorMessage('Payment Schedule is required');
            showHideResults();
        }
    } else {
        errorMessage('Please Check your Numbers'); 
        showHideResults();     
    }

};
//Creating error message
function errorMessage(errorMessage) {
    const errorDiv = document.createElement('div');
    //adding classes to error div
    errorDiv.className = 'alert alert-danger';
    //adding text to the error div
    errorDiv.appendChild(document.createTextNode(errorMessage));
    //appending to the dom
    headingContainer.insertBefore(errorDiv, heading);
    //Clearing the error message
    setTimeout(deleteErrorDiv, 2000);
};
//Creating function to delete error message
function deleteErrorDiv() {
    document.querySelector('.alert').remove()
};
//Show hide loading and results
function showHideResults(loadingDisplay = 'none', resultsDisplay = 'none') {
    loading.style.display = loadingDisplay;
    results.style.display = resultsDisplay;
}
//Show hide payment Schedule
function showHideSchedule(monthlyPaymentDisplay = 'block', biweeklyPaymentDisplay = 'none', weeklyPaymentDisplay = 'none') {
    monthlyPayment.parentElement.parentElement.style.display = monthlyPaymentDisplay;
    biweeklyPayment.parentElement.parentElement.style.display = biweeklyPaymentDisplay;
    weeklyPayment.parentElement.parentElement.style.display = weeklyPaymentDisplay;
};

