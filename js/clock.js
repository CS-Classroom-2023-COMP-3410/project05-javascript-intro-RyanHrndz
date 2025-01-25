// Select elements
const clockElement = document.getElementById('clock');
const toggleFormatButton = document.getElementById('toggle-format');
const colorPicker = document.getElementById('color');
const fontSizeInput = document.getElementById('fontSize');
const alarmTimeInput = document.getElementById('alarm-time');
const setAlarmButton = document.getElementById('set-alarm');

// Variables
let is24HourFormat = true;
let alarms = [];

// Update clock every second
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');
    let ampm = '';

    if (!is24HourFormat) {
        ampm = hours >= 12 ? ' PM' : ' AM';
        hours = (hours % 12) || 12; // Convert to 12-hour format
    }

    clockElement.textContent = `${hours}:${minutes}:${seconds}${ampm}`;

    // Check alarms
    checkAlarms(hours, minutes, ampm);
}

// Check alarms
function checkAlarms(hours, minutes, ampm) {
    const currentTime = `${hours}:${minutes}${is24HourFormat ? '' : ampm}`;
    if (alarms.includes(currentTime)) {
        alert(`Alarm! It's ${currentTime}`);
        alarms = alarms.filter(alarm => alarm !== currentTime); // Remove triggered alarm
    }
}

// Toggle 12/24-hour format
toggleFormatButton.addEventListener('click', () => {
    is24HourFormat = !is24HourFormat;
    toggleFormatButton.textContent = is24HourFormat
        ? 'Switch to 12-Hour Format'
        : 'Switch to 24-Hour Format';
});

// Change clock color
colorPicker.addEventListener('input', () => {
    clockElement.style.color = colorPicker.value;
});

// Change font size
fontSizeInput.addEventListener('input', () => {
    clockElement.style.fontSize = `${fontSizeInput.value}px`;
});

// Set alarm
setAlarmButton.addEventListener('click', () => {
    const alarmTime = alarmTimeInput.value;
    if (alarmTime) {
        const alarmFormatted = is24HourFormat
            ? alarmTime
            : convertTo12Hour(alarmTime);
        alarms.push(alarmFormatted);
        alert(`Alarm set for ${alarmFormatted}`);
    }
});

// Convert 24-hour time to 12-hour time
function convertTo12Hour(time) {
    const [hours, minutes] = time.split(':');
    const hourNumber = parseInt(hours, 10);
    const ampm = hourNumber >= 12 ? ' PM' : ' AM';
    const twelveHour = (hourNumber % 12) || 12;
    return `${twelveHour}:${minutes}${ampm}`;
}

// Initialize
setInterval(updateClock, 1000);
