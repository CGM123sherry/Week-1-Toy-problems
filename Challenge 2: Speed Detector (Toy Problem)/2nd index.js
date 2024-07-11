//ensure the dom is fully loadedbefore the js
document.addEventListener('DOMContentLoaded', () => {
    //retrieve the elements from html
    const speedInput = document.getElementById('speed-input');
    const checkSpeedButton = document.getElementById('check-speed');
    const resultDiv = document.getElementById('result');
//eventlistener to check speed button
    checkSpeedButton.addEventListener('click', () => {
        //en sures the seed is a valid number
        const speed = parseFloat(speedInput.value);

        if (isNaN(speed) || speed < 0) {
            resultDiv.textContent = 'Please enter a valid positive number for speed.';
            return;
        }
//calculayes demerits points
        const speedLimit = 70;
        const kmPerDemeritPoint = 5;
        const demeritPoints = Math.floor((speed - speedLimit) / kmPerDemeritPoint);
//displays the message
        if (speed <= speedLimit) {
            resultDiv.textContent = 'OK';
        } else if (demeritPoints > 12) {
            resultDiv.textContent = 'License suspended';
        } else {
            resultDiv.textContent = `Points: ${demeritPoints}`;
        }
    });
});
