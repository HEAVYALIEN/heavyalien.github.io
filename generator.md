<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        #canvas-container {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            margin: 0 auto;
        }

        #canvas {
            border: 4px solid #000;
            background-color: #161616;
            max-width: 690px;
        }

        .button-container {
            position: absolute;
            bottom: 0;
            right: 0;
            display: flex;
            flex-direction: column;
            align-items: right;
        }

        .randomize-button {
            display: block;
            /* Set buttons to display as block elements */
            margin-bottom: 10px;
            margin-right: 10px;
            background-color: #2b2b2b;
            color: #fff;
            border: none;
            border-radius: 0px;
            padding: 10px 10px;
            font-size: 12px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .randomize-button:hover {
            background-color: #9b9b9b;
        }

        #btn-leye {
            display: block;
            /* Set buttons to display as block elements */
            margin-bottom: 10px;
            margin-right: 10px;
            background-color: #2b2b2b;
            color: #fff;
            border: none;
            border-radius: 0px 30px 30px 30px;
            padding: 10px 10px;
            font-size: 12px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        #btn-leye:hover {
            background-color: #e21717;
        }

        #btn-reye {
            display: block;
            /* Set buttons to display as block elements */
            margin-bottom: 10px;
            margin-right: 10px;
            background-color: #2b2b2b;
            color: #fff;
            border: none;
            border-radius: 30px;
            padding: 10px 10px;
            font-size: 12px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        #btn-reye:hover {
            background-color: #451cff;
        }

        #btn-mouth {
            display: block;
            /* Set buttons to display as block elements */
            margin-bottom: 10px;
            margin-right: 10px;
            background-color: #2b2b2b;
            color: #fff;
            border: none;
            border-radius: 0px 0px 5px 5px;
            padding: 7px 10px;
            font-size: 12px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        #btn-mouth:hover {
            background-color: #f3ef05;
        }

        #btn-body {
            display: block;
            /* Set buttons to display as block elements */
            margin-bottom: 10px;
            margin-right: 10px;
            background-color: #2b2b2b;
            color: #fff;
            border: none;
            border-radius: 5px 5px 0px 0px;
            padding: 7px 10px;
            font-size: 12px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        #btn-body:hover {
            background-color: #05f305;
        }

        body {
            background-color: #000000;
            /* Dark background color */
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 800px;
            margin: 0;
        }
    </style>
    <title>Opepen Haus Limited Edition</title>
</head>

<body>
    <div id="canvas-container">
        <canvas id="canvas" width="800" height="800"></canvas>
        <div class="button-container">
            <button class="randomize-button" id="open-image"></button>
            <button class="randomize-button" id="btn-check"></button>
            <button class="randomize-button" id="btn-leye"></button>
            <button class="randomize-button" id="btn-reye"></button>
            <button class="randomize-button" id="btn-mouth"></button>
            <button class="randomize-button" id="btn-body"></button>
            <button class="randomize-button" id="randomize-button"></button>
        </div>
    </div>
    <script>
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        const gridSize = 8;
        const squareSize = 100;
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;


        // -- COLOR ARRAYS
        const colors = [
            ["#dedfdb", "#8fbbd1", "#003558", "#edb91d", "#ab0c0c", "#eb7788", "#251610", "#0c0a09", "#677369"], // Bauhaus 1
        ];


        function getRandomUniqueColors(colors, count) {
            const uniqueColors = new Set();

            while (uniqueColors.size < count) {
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                uniqueColors.add(randomColor);
            }

            return Array.from(uniqueColors);
        }

        // -- BACKGROUND
        function drawBackground(colors) {
            const backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        /// --- SHAPE POSITIONS
        const shapes = [
            {
                type: 'L-eye',
                x: (gridSize / 2 - 1) * squareSize,
                y: (gridSize / 2 - 1) * squareSize,
                radius: 1 * squareSize,
            },
            {
                type: 'R-eye',
                x: (gridSize / 2 + 1) * squareSize,
                y: (gridSize / 2 - 1) * squareSize,
                radius: 1 * squareSize,
            },
            {
                type: 'Mouth',
                x: (gridSize / 2 - 2) * squareSize,
                y: (gridSize / 2) * squareSize,
                width: squareSize * 4,
                height: squareSize * 2,
            },
            {
                type: 'Body',
                x: (gridSize / 2 - 2) * squareSize,
                y: (gridSize - 1) * squareSize,
                width: squareSize * 4,
                height: squareSize,
            },
            {
                type: 'Logo',
                x: (gridSize / 2 + 2) * squareSize,
                y: (gridSize / 2 - 3) * squareSize,
                width: squareSize,
                height: squareSize,
            }
        ];

        /// --- SHAPE FUNCTIONS

        /// --- EYES
        //Leye = Signature Opepen (Left Only)
        //Eye1 = Half Circle on 2 Quadrants
        //Eye2 = Four Different Color Quadrants
        //Eye3 = Signature Opepen 4 Quadrants (Left Only)
        //Eye4 = Single Color 3/4 circle
        //Eye5 = Single Color 3/4 circle (Left Only)

        function drawLeye(shape, randomColors) {
            const quadrantAngle = Math.PI / 2;
            const rectWidth = shape.radius * 2;
            const rectHeight = shape.radius;
            const rectX = shape.x - rectWidth + rectWidth / 2;
            const rectY = shape.y - shape.radius;
            const cornerRadius = shape.radius;

            ctx.beginPath();
            ctx.moveTo(rectX, rectY);
            ctx.lineTo(rectX + rectWidth - cornerRadius, rectY);
            ctx.arcTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + cornerRadius, cornerRadius);
            ctx.lineTo(rectX + rectWidth, rectY + rectHeight);
            ctx.lineTo(rectX, rectY + rectHeight);
            ctx.closePath();
            ctx.fillStyle = randomColors[0];
            ctx.fill();

            // Draw the first quadratic angle
            ctx.beginPath();
            ctx.moveTo(shape.x, shape.y);
            ctx.arc(shape.x, shape.y, shape.radius, 0, quadrantAngle);
            ctx.closePath();
            ctx.fillStyle = randomColors[1];
            ctx.fill();

            // Draw the second quadratic angle
            ctx.beginPath();
            ctx.moveTo(shape.x, shape.y);
            ctx.arc(shape.x, shape.y, shape.radius, quadrantAngle, 2 * quadrantAngle);
            ctx.closePath();
            ctx.fillStyle = randomColors[2];
            ctx.fill();
        }

        function drawEye1(shape, randomColors) {
            const uniqueColors = getRandomUniqueColors(randomColors, 2);

            // Draw the upper half circle
            ctx.beginPath();
            ctx.arc(shape.x, shape.y, shape.radius, -Math.PI / 2, Math.PI / 2, false); // Adjusted starting and ending angles
            ctx.closePath();
            ctx.fillStyle = uniqueColors[0];
            ctx.fill();

            // Draw the lower half circle
            ctx.beginPath();
            ctx.arc(shape.x, shape.y, shape.radius, Math.PI / 2, 3 * Math.PI / 2, false); // Adjusted starting and ending angles
            ctx.closePath();
            ctx.fillStyle = uniqueColors[1];
            ctx.fill();
        }

        function drawEye2(shape, randomColors) {
            ctx.beginPath();
            ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
            const quadrantAngle = Math.PI / 2;
            const uniqueColors = getRandomUniqueColors(randomColors, 4); // Get an array of 4 unique colors

            for (let i = 0; i < 4; i++) {
                ctx.beginPath();
                ctx.moveTo(shape.x, shape.y);
                ctx.arc(shape.x, shape.y, shape.radius, i * quadrantAngle, (i + 1) * quadrantAngle);
                ctx.closePath();
                ctx.fillStyle = uniqueColors[i];
                ctx.fill();
            }
        }

        function drawEye3(shape, randomColors) {
            const uniqueColors = getRandomUniqueColors(randomColors, 4); // Get an array of 4 unique colors
            for (let i = 0; i < 4; i++) {
                ctx.beginPath();
                ctx.moveTo(shape.x, shape.y);
                ctx.arc(shape.x, shape.y, shape.radius, i * Math.PI / 2, (i + 1) * Math.PI / 2);
                ctx.closePath();
                ctx.fillStyle = uniqueColors[i];
                ctx.fill();
            }
            ctx.beginPath();
            const squareSize = shape.radius; // Adjust the factor here to increase or decrease the size
            ctx.fillStyle = uniqueColors[4];
            ctx.fillRect(shape.x - squareSize, shape.y - squareSize, squareSize, squareSize); // Draw the square in the top left corner
        }

        function drawEye4(shape, color) {
            ctx.beginPath();
            ctx.arc(shape.x, shape.y, shape.radius, Math.PI / 2, Math.PI * 2, false); // Draw the arc from 45 degrees to 315 degrees
            ctx.lineTo(shape.x, shape.y); // Connect the last point to the center
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
        }

        function drawEye5(shape, randomColors) {
            const rectWidth = shape.radius * 2;
            const rectHeight = shape.radius;
            const rectX = shape.x - rectWidth + rectWidth / 2;
            const rectY = shape.y - shape.radius;
            const cornerRadius = shape.radius;

            ctx.beginPath();
            ctx.moveTo(rectX, rectY);
            ctx.lineTo(rectX + rectWidth - cornerRadius, rectY);
            ctx.arcTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + cornerRadius, cornerRadius);
            ctx.lineTo(rectX + rectWidth, rectY + rectHeight);
            ctx.lineTo(rectX + rectWidth / 2, rectY + rectHeight);
            ctx.arc(shape.x, shape.y, shape.radius, Math.PI * 0.5, Math.PI, false);
            ctx.closePath();
            ctx.fillStyle = randomColors[Math.floor(Math.random() * randomColors.length)];
            ctx.fill();
        }

        /// --- MOUTH
        //Mouth1 = Two Plain Rects
        //Mouth2 = Two Plain Curved Rects
        //Mouth3 = 4 Color Plain Rects
        //Mouth4 = 4 Color Curved Rects
        //Mouth5 = 4 Vertical Rects

        function drawMouth1(shape, randomColors) {
            const shapeWidth = shape.width; // Width of each shape
            const shapeHeight = shape.height / 2; // Height of each shape

            // Draw the first shape
            ctx.fillStyle = randomColors[Math.floor(Math.random() * randomColors.length)];
            ctx.fillRect(shape.x, shape.y, shapeWidth, shapeHeight);

            // Draw the second shape
            ctx.fillStyle = randomColors[Math.floor(Math.random() * randomColors.length)];
            ctx.fillRect(shape.x, shape.y + shapeHeight, shapeWidth, shapeHeight);
        }

        function drawMouth2(shape, randomColors) {
            const bottomCornerRadius = shape.height / 2;

            // Draw bottom shape
            ctx.beginPath();
            ctx.moveTo(shape.x + bottomCornerRadius, shape.y + shape.height);
            ctx.lineTo(shape.x + shape.width - bottomCornerRadius, shape.y + shape.height);
            ctx.arcTo(shape.x + shape.width, shape.y + shape.height, shape.x + shape.width, shape.y, bottomCornerRadius);
            ctx.lineTo(shape.x + shape.width, shape.y);
            ctx.lineTo(shape.x, shape.y);
            ctx.lineTo(shape.x, shape.y + shape.height - bottomCornerRadius);
            ctx.arcTo(shape.x, shape.y + shape.height, shape.x + bottomCornerRadius, shape.y + shape.height, bottomCornerRadius);
            ctx.closePath();
            ctx.fill();

            // Draw top shape
            ctx.fillStyle = randomColors[Math.floor(Math.random() * randomColors.length)];
            ctx.fillRect(shape.x, shape.y, shape.width, shape.height / 2);

        }

        function drawMouth3(shape, randomColors) {
            const squareSize = shape.width / 4;
            const squareY = shape.y + shape.height / 2;

            for (let i = 0; i < 4; i++) {
                const squareX = shape.x + i * squareSize;
                const squareColor = randomColors[Math.floor(Math.random() * randomColors.length)];

                ctx.fillStyle = squareColor;
                ctx.fillRect(squareX, squareY, squareSize, squareSize);
            }

            for (let i = 0; i < 4; i++) {
                const squareX = shape.x + i * squareSize;
                const squareColor = randomColors[Math.floor(Math.random() * randomColors.length)];

                ctx.fillStyle = squareColor;
                ctx.fillRect(squareX, shape.y, squareSize, squareSize);
            }
        }

        function drawMouth4(shape, randomColors) {
            const squareSize = shape.width / 4; // Divide the width by 4 for each square
            for (let i = 0; i < 4; i++) {
                const squareX = shape.x + i * squareSize;
                const squareY = shape.y;

                if (i === 0) {
                    // Leftmost square with rounded corner on the bottom outer side
                    ctx.beginPath();
                    ctx.moveTo(squareX + squareSize, squareY);
                    ctx.lineTo(squareX + squareSize, squareY + shape.height);
                    ctx.arcTo(squareX, squareY + shape.height, squareX, squareY + shape.height - squareSize / 2, squareSize);
                    ctx.lineTo(squareX, squareY);
                    ctx.closePath();
                } else if (i === 3) {
                    // Rightmost square with rounded corner on the bottom inner side
                    ctx.beginPath();
                    ctx.moveTo(squareX, squareY);
                    ctx.lineTo(squareX + squareSize, squareY);
                    ctx.arcTo(squareX + squareSize, squareY + shape.height, squareX, squareY + shape.height, squareSize);
                    ctx.lineTo(squareX, squareY + shape.height);
                    ctx.closePath();
                } else {
                    // Middle squares without rounded corners
                    ctx.beginPath();
                    ctx.moveTo(squareX, squareY);
                    ctx.lineTo(squareX + squareSize, squareY);
                    ctx.lineTo(squareX + squareSize, squareY + shape.height);
                    ctx.lineTo(squareX, squareY + shape.height);
                    ctx.closePath();
                }
                ctx.fillStyle = randomColors[Math.floor(Math.random() * randomColors.length)];
                ctx.fill();
            }

            for (let i = 0; i < 4; i++) {
                const squareX = shape.x + i * squareSize;
                const squareColor = randomColors[Math.floor(Math.random() * randomColors.length)];

                ctx.fillStyle = squareColor;
                ctx.fillRect(squareX, shape.y, squareSize, squareSize);
            }
        }

        function drawMouth5(shape, randomColors) {
            const squareSize = shape.width / 4; // Divide the width by 4 for each square
            for (let i = 0; i < 4; i++) {
                const squareX = shape.x + i * squareSize;
                const squareY = shape.y;

                if (i === 0) {
                    // Leftmost square with rounded corner on the bottom outer side
                    ctx.beginPath();
                    ctx.moveTo(squareX + squareSize, squareY);
                    ctx.lineTo(squareX + squareSize, squareY + shape.height);
                    ctx.arcTo(squareX, squareY + shape.height, squareX, squareY + shape.height - squareSize / 2, squareSize);
                    ctx.lineTo(squareX, squareY);
                    ctx.closePath();
                } else if (i === 3) {
                    // Rightmost square with rounded corner on the bottom inner side
                    ctx.beginPath();
                    ctx.moveTo(squareX, squareY);
                    ctx.lineTo(squareX + squareSize, squareY);
                    ctx.arcTo(squareX + squareSize, squareY + shape.height, squareX, squareY + shape.height, squareSize);
                    ctx.lineTo(squareX, squareY + shape.height);
                    ctx.closePath();
                } else {
                    // Middle squares without rounded corners
                    ctx.beginPath();
                    ctx.moveTo(squareX, squareY);
                    ctx.lineTo(squareX + squareSize, squareY);
                    ctx.lineTo(squareX + squareSize, squareY + shape.height);
                    ctx.lineTo(squareX, squareY + shape.height);
                    ctx.closePath();
                }
                ctx.fillStyle = randomColors[Math.floor(Math.random() * randomColors.length)];
                ctx.fill();
            }
        }

        /// --- BODY
        //Body1 = Plain Rect
        //Body2 = Plain Curved Rect
        //Body3 = 4 Color Plain Rect
        //Body4 = 4 Color Curved Rect

        function drawBody1(shape, randomColors) {
            const x = shape.x;
            const y = shape.y;
            const width = shape.width;
            const height = shape.height;
            ctx.fillStyle = randomColors[Math.floor(Math.random() * randomColors.length)];
            ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
        }

        function drawBody2(shape, randomColors) {
            const cornerRadius = 100;
            const x = shape.x;
            const y = shape.y;
            const width = shape.width;
            const height = shape.height;
            const topRadius = Math.min(cornerRadius, height); // limit radius to height
            const leftX = x + topRadius;
            const rightX = x + width - topRadius;
            ctx.fillStyle = shape.color ? shape.color : randomColors[Math.floor(Math.random() * randomColors.length)];
            ctx.beginPath();
            ctx.moveTo(leftX, y);
            ctx.lineTo(rightX, y);
            ctx.arcTo(x + width, y, x + width, y + height, topRadius);
            ctx.lineTo(x + width, y + height);
            ctx.lineTo(x, y + height);
            ctx.arcTo(x, y, leftX, y, topRadius);
            ctx.closePath();
            ctx.fill();
        }

        function drawBody3(shape, randomColors) {
            const x = shape.x;
            const y = shape.y;
            const width = shape.width / 4; // Divide the width by 4 for each square
            const height = shape.height;

            for (let i = 0; i < 4; i++) {
                ctx.fillStyle = randomColors[Math.floor(Math.random() * randomColors.length)];
                ctx.fillRect(x + i * width, y, width, height);
            }
        }

        function drawBody4(shape, randomColors) {
            const cornerRadius = 100;
            const x = shape.x;
            const y = shape.y;
            const width = shape.width;
            const height = shape.height;
            const topRadius = Math.min(cornerRadius, height); // limit radius to height
            const leftX = x + topRadius;
            const rightX = x + width - topRadius;
            ctx.fillStyle = shape.color ? shape.color : randomColors[Math.floor(Math.random() * randomColors.length)];
            ctx.beginPath();
            ctx.moveTo(leftX, y);
            ctx.lineTo(rightX, y);
            ctx.arcTo(x + width, y, x + width, y + height, topRadius);
            ctx.lineTo(x + width, y + height);
            ctx.lineTo(x, y + height);
            ctx.arcTo(x, y, leftX, y, topRadius);
            ctx.closePath();
            ctx.fill();

            // 2ND shape
            const rectWidth = squareSize;
            const rectHeight = squareSize;
            const rectX = x + (width - rectWidth) / 2;
            const rectY = y + (height - rectHeight) / 2;
            ctx.fillStyle = randomColors[Math.floor(Math.random() * randomColors.length)];
            ctx.fillRect(rectX - squareSize / 2, rectY, rectWidth, rectHeight);

            // 2ND shape
            const rectWidth2 = squareSize;
            const rectHeight2 = squareSize;
            const rectX2 = x + (width - rectWidth) / 2;
            const rectY2 = y + (height - rectHeight) / 2;
            ctx.fillStyle = randomColors[Math.floor(Math.random() * randomColors.length)];
            ctx.fillRect(rectX2 + squareSize / 2, rectY2, rectWidth2, rectHeight2);
        }

        /// --- LOGO
        function drawLogo(shape, randomColors) {
            const circleX = shape.x + shape.width / 5.85;
            const circleY = shape.y + shape.height / 1.15;
            const circleRadius = Math.min(shape.width, shape.height) / 8;

            ctx.fillStyle = randomColors[Math.floor(Math.random() * randomColors.length)];
            ctx.beginPath();
            ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = randomColors[Math.floor(Math.random() * randomColors.length)];
            ctx.beginPath();
            ctx.arc(circleX, circleY, circleRadius * .5, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();

        }

        /// --- DRAW SHAPE
        function drawShape(shape, randomColors) {
            switch (shape.type) {
                case 'L-eye':
                    if (Math.random() < 0.50) {
                        drawLeye(shape, randomColors);
                    } else if (Math.random() > 0.50 < 0.95) {
                        drawEye5(shape, randomColors);
                    } else {
                        drawEye3(shape, randomColors);
                    }
                    break;
                case 'R-eye':
                    if (Math.random() < 0.50) {
                        drawEye1(shape, randomColors);
                    } else if (Math.random() > 0.50 < 0.95) {
                        drawEye4(shape, randomColors);
                    } else {
                        drawEye2(shape, randomColors);
                    }
                    break;
                case 'Mouth':
                    if (Math.random() < 0.2) {
                        drawMouth1(shape, randomColors);
                    } else if (Math.random() > 0.2 < 0.4) {
                        drawMouth2(shape, randomColors);
                    } else if (Math.random() > 0.4 < 0.6) {
                        drawMouth3(shape, randomColors);
                    } else if (Math.random() > 0.6 < 0.8) {
                        drawMouth4(shape, randomColors)
                    } else {
                        drawMouth5(shape, randomColors)
                    }
                    break;
                case 'Body':
                    if (Math.random() < 0.25) {
                        drawBody1(shape, randomColors);
                    } else if (Math.random() > 0.25 < 0.50) {
                        drawBody2(shape, randomColors);
                    } else if (Math.random() > 0.5 < 0.75) {
                        drawBody3(shape, randomColors)
                    } else {
                        drawBody4(shape, randomColors)
                    }
                    break;
                case 'Logo':
                    drawLogo(shape, randomColors);
                    break;
                case 'Background':
                    drawBackground(shape, randomColors);
                    break;
            }
        }

        /// --- GENERATE OPEPEN BUTTON
        document.getElementById('randomize-button').addEventListener('click', () => {
            // CLEAR THE CANVAS
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // GENERATE A NEW CUSTOM ARRAY
            const randomColors = colors[Math.floor(Math.random() * colors.length)];
            // DRAW THE BACKGROUND
            drawBackground(randomColors);
            // DRAW EACH SHAPE WITH RANDOM COLORS
            shapes.forEach((shape) => {
                drawShape(shape, randomColors);
            });
        });

        // --- BUTTONS TO CHANGE FEATURES
        document.getElementById('btn-leye').addEventListener('click', () => changeShapeColor('L-eye'));
        document.getElementById('btn-reye').addEventListener('click', () => changeShapeColor('R-eye'));
        document.getElementById('btn-mouth').addEventListener('click', () => changeShapeColor('Mouth'));
        document.getElementById('btn-body').addEventListener('click', () => changeShapeColor('Body'));
        document.getElementById('btn-check').addEventListener('click', () => changeShapeColor('Logo'));

        // --- CHANGE SHAPE COLOR FUNCTION
        function changeShapeColor(shapeType) {
            // Find the corresponding shape
            const shape = shapes.find(shape => shape.type === shapeType);
            if (shape) {
                // Change the color
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                shape.color = randomColor;
                drawShape(shape, randomColor);
            }
        }


        // Add a click event listener to the button
        const openImageBtn = document.getElementById("open-image");
        openImageBtn.addEventListener("click", function () {
            openCanvasImageInNewWindow("canvas");
        });

        // --- OPEN IMAGE IN  NEW WINDOW
        function openCanvasImageInNewWindow(canvasId) {
            // Get the canvas element by its id
            const canvas = document.getElementById(canvasId);

            // Check if the canvas element was found
            if (canvas) {
                // Get the data URL of the canvas image
                const imageDataUrl = canvas.toDataURL("image/png");

                // Open a new browser window
                const newWindow = window.open('', '_blank');

                // Write the image data URL to the new window
                newWindow.document.write('<img src="' + imageDataUrl + '" alt="Canvas Image"/>');
            } else {
                console.error('Canvas element not found with ID: ' + canvasId);
            }
        }


    </script>
</body>
