// Function to calculate net salary based on input values
function calculateNetSalary(basicSalary, benefits) {
    const nhifRates = [
        { upperLimit: 5999, rate: 150 },
        { upperLimit: 7999, rate: 300 },
        { upperLimit: 11999, rate: 400 },
        { upperLimit: 14999, rate: 500 },
        { upperLimit: 19999, rate: 600 },
        { upperLimit: 24999, rate: 750 },
        { upperLimit: 29999, rate: 850 },
        { upperLimit: 34999, rate: 900 },
        { upperLimit: 39999, rate: 950 },
        { upperLimit: 44999, rate: 1000 },
        { upperLimit: 49999, rate: 1100 },
        { upperLimit: 59999, rate: 1200 },
        { upperLimit: 69999, rate: 1300 },
        { upperLimit: 79999, rate: 1400 },
        { upperLimit: 89999, rate: 1500 },
        { upperLimit: 99999, rate: 1600 },
        { upperLimit: Infinity, rate: 1700 }
    ];

    const nssfRate = 0.06;
    const nssfMax = 18000;

    // Calculate gross salary and deductions
    const grossSalary = basicSalary + benefits;
    const nssfDeduction = Math.min(grossSalary, nssfMax) * nssfRate;
    const taxableIncome = grossSalary - nssfDeduction;

    // Calculate PAYE (Tax)
    let payee = 0;
    if (taxableIncome <= 24000) {
        payee = taxableIncome * 0.1;
    } else if (taxableIncome <= 32333) {
        payee = (24000 * 0.1) + ((taxableIncome - 24000) * 0.25);
    } else {
        payee = (24000 * 0.1) + ((32333 - 24000) * 0.25) + ((taxableIncome - 32333) * 0.3);
    }

    // Calculate NHIF deduction based on gross salary
    const nhifDeduction = nhifRates.reduce((totalNHIF, bracket) => {
        if (grossSalary <= bracket.upperLimit) {
            totalNHIF = bracket.rate;
            return totalNHIF;
        }
        return totalNHIF;
    }, 0);

    // Calculate net salary
    const netSalary = grossSalary - nssfDeduction - payee - nhifDeduction;

    // Return an object with all calculated values
    return {
        grossSalary,
        nssfDeduction,
        payee,
        nhifDeduction,
        netSalary
    };
}

// Function to update results on the webpage
function updateResults() {
    const basicSalary = parseFloat(document.getElementById('basicSalary').value) || 0; // Get basic salary input value
    const benefits = parseFloat(document.getElementById('benefits').value) || 0; // Get benefits input value

    const result = calculateNetSalary(basicSalary, benefits); // Calculate net salary based on inputs

    // Update HTML elements with calculated values
    document.getElementById('grossSalary').textContent = result.grossSalary.toFixed(2);
    document.getElementById('nssfDeduction').textContent = result.nssfDeduction.toFixed(2);
    document.getElementById('payee').textContent = result.payee.toFixed(2);
    document.getElementById('nhifDeduction').textContent = result.nhifDeduction.toFixed(2);
    document.getElementById('netSalary').textContent = result.netSalary.toFixed(2);
    document.getElementById('result').style.display = 'block'; // Display the result section
}

// Event listeners for input fields to update results dynamically
document.getElementById('basicSalary').addEventListener('input', updateResults);
document.getElementById('benefits').addEventListener('input', updateResults);

// Initial update on page load
updateResults();
