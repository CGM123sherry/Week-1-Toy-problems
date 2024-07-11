// script.js
document.getElementById('gradeForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission

    const marks = parseFloat(document.getElementById('marks').value);
    let grade;
//iterate on the different marks cluster
    try {
        if (isNaN(marks)) {
            throw new Error("Invalid input. Please enter a numeric value.");
        }
        if (marks > 100 || marks < 0) {
            throw new Error("Marks should be between 0 and 100.");
        } else if (marks >= 80) {
            grade = "Grade: A";
        } else if (marks >= 60) {
            grade = "Grade: B";
        } else if (marks >= 50) {
            grade = "Grade: C";
        } else if (marks >= 40) {
            grade = "Grade: D";
        } else {
            grade = "Grade: E";
        }
        //catch error if any
    } catch (error) {
        grade = `Error: ${error.message}`;
    }
//print results
    document.getElementById('result').textContent = grade;
});
