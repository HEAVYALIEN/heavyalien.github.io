const imageUpload = document.getElementById("imageUpload");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

imageUpload.addEventListener("change", handleImageUpload);

function handleImageUpload(event) {
    const files = event.target.files;

    if (files.length !== 12) {
        alert("Please select exactly 12 images.");
        return;
    }

    // Set canvas dimensions
    canvas.width = 1500;
    canvas.height = 500;

    let x = 0;
    let y = 0;
    const imageWidth = canvas.width / 6;
    const imageHeight = canvas.height / 2;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function () {
            const img = new Image();
            img.src = reader.result;

            img.onload = function () {
                // Draw the image on the canvas
                ctx.drawImage(img, x, y, imageWidth, imageHeight);

                // Move to the next position
                x += imageWidth;
                if (x >= canvas.width) {
                    x = 0;
                    y += imageHeight;
                }

                // Once all images are drawn, display the canvas
                if (i === files.length - 1) {
                    const banner = document.getElementById("banner");
                    banner.innerHTML = ""; // Clear the previous banner
                    banner.appendChild(canvas);
                }
            };
        };

        reader.readAsDataURL(file);
    }
}
