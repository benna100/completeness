import "./main.scss";

var canvas = document.querySelector("canvas");

var ctx = canvas.getContext("2d");
var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

canvas.width = viewportWidth;
canvas.height = viewportHeight;

class Circle {
    constructor(x, y, radius, sAngle, eAngle, fillColor = 'white') {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.sAngle = sAngle;
        this.eAngle = eAngle;
        this.fillColor = fillColor;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, this.sAngle, this.eAngle);
        ctx.fillStyle = this.fillColor;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    fill() {
        // as there is only one context we need to just draw a new circle
        // in order for us to "fill" the circle
        new Circle(this.x, this.y, this.radius, this.sAngle, this.eAngle, 'black').draw();
    }
}

const numberOfColumns = 30;
const numberOfRows = 30;
const fillInterval = 40;
let radius;
const minViewport = Math.min(viewportHeight, viewportWidth);
const marginPercentage = 30;
const isWidthLargerThanHeight = viewportWidth > viewportHeight;
let fillIntervalTimer;

window.addEventListener('resize', () => {
    viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    clearInterval(fillIntervalTimer);
    ctx.clearRect(0, 0, viewportWidth, viewportHeight);
    createGrid();
    fillInCircles();
});

function createGrid() {
    const noMarginCircleRadius = (parseInt(Math.abs(minViewport) / numberOfColumns)) / 2;
    radius = noMarginCircleRadius - ((noMarginCircleRadius / 100) * marginPercentage);

    const marginHorizontal = isWidthLargerThanHeight ? (viewportWidth - ((radius * 2) * numberOfColumns)) / (numberOfColumns + 1) : 2;

    const verticalCircleSpace = (radius * 2) * numberOfRows;
    const totalVerticalMargin = Math.abs(innerHeight - verticalCircleSpace);
    const columns = [];
    const marginVertical = totalVerticalMargin / (numberOfRows + 1);
    for (let i = 0; i < numberOfRows; i++) {
        let y;
        if (i === 0) {
            y = (radius + marginVertical) * (i + 1);
        } else {
            y = (radius + marginVertical) + ((radius * 2) + marginVertical) * (i);
        }
        const rowRepresentation = drawRow(y, radius, marginHorizontal);
        columns.push(rowRepresentation);
    }

    return columns;
}



function drawRow(y, radius, marginHorizontal) {
    const rowRepresentation = [];
    for (let i = 0; i < numberOfColumns; i++) {
        let x;
        if (i === 0) {
            x = (radius + marginHorizontal) * (i + 1);
        } else {
            x = (radius + marginHorizontal) + ((radius * 2) + marginHorizontal) * (i);
        }

        const circle = new Circle(x, y, radius, 0, 2 * Math.PI, '#f3f3f3');
        circle.draw();
        rowRepresentation.push(circle);
    }

    return rowRepresentation;
}

const grid = createGrid();

function fillInCircles() {
    const numberOfcircles = numberOfColumns * numberOfRows;

    let newPosition = {
        x: 0,
        y: 0,
    }

    grid[newPosition.y][newPosition.x].fill();

    let topIndex = 0;
    let rightIndex = numberOfColumns;
    let bottomIndex = numberOfRows;
    let leftIndex = 0;
    let i = 0;
    fillIntervalTimer = setInterval(() => {
        if (newPosition.x === leftIndex && newPosition.y === topIndex + 1) {
            topIndex++;
            rightIndex--;
            bottomIndex--;
            leftIndex++;
        }
        newPosition = getNextPosition(newPosition, topIndex, rightIndex, bottomIndex, leftIndex);

        if (i !== numberOfcircles - 2) {
            grid[newPosition.y][newPosition.x].fill();
        } else {
            //blinkLastCircle(grid[newPosition.y][newPosition.x]);
            setTimeout(() => {
                document.querySelector('.wanna-pay').classList.add('shown');
            }, 2000);
            clearInterval(fillIntervalTimer);
        }

        i++;
    }, fillInterval);
}

fillInCircles();

function getNextPosition(position, topIndex, rightIndex, bottomIndex, leftIndex) {
    const newPosition = {};

    if (position.x < rightIndex - 1 && position.y === topIndex) {
        newPosition.x = position.x + 1;
        newPosition.y = position.y;
    } else if (position.x === rightIndex - 1 && position.y < bottomIndex - 1) {
        newPosition.x = position.x;
        newPosition.y = position.y + 1;
    } else if (position.x > leftIndex && position.y === bottomIndex - 1) {
        newPosition.x = position.x - 1;
        newPosition.y = position.y;
    } else if (position.x === leftIndex && position.y > topIndex) {
        newPosition.x = position.x;
        newPosition.y = position.y - 1;
    }

    return newPosition;
}

function blinkLastCircle(circle) {
    const fps = 60;
    setInterval(function () {
        if (parseInt(Math.random() * 10) === parseInt(Math.random() * 10)) {
            ctx.clearRect(circle.x - radius * 1.1, circle.y - radius * 1.1, radius * 2.2, radius * 2.2);
        }
        if (parseInt(Math.random() * 10) === parseInt(Math.random() * 10)) {
            circle.fill();
        }
    }, 1000 / fps);
}