
/* JavaScript for Customizable Drawing Canvas */
const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
const brushSizeInput = document.getElementById('brush-size');
const brushColorInput = document.getElementById('brush-color');
const clearButton = document.getElementById('clear-canvas');
const saveButton = document.getElementById('save-canvas');

let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Set brush settings
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

// Start drawing
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

// Draw on canvas
canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    ctx.lineWidth = brushSizeInput.value;
    ctx.strokeStyle = brushColorInput.value;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

// Stop drawing
canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mouseout', () => (isDrawing = false));

// Clear canvas
clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Save canvas as image
saveButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL();
    link.click();
});
