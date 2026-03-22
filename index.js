// frontend/static/js/frontend-ui.js
console.log("Frontend UI script loaded");

document.addEventListener("DOMContentLoaded", () => {
    // Grab all required DOM elements
    console.log("Frontend UI script loaded");
    const imageInput = document.getElementById('imageInput');
    const classifyBtn = document.getElementById('classifyBtn');
    const imagePreview = document.getElementById('imagePreview');
    const resultContainer = document.getElementById('result');
    const binField = document.getElementById('bin');
    const categoryField = document.getElementById('category');
    const explanationField = document.getElementById('explanation');
    const footer = document.querySelector(".footer");

footer.addEventListener("click", (event) => {
    const clickedImg = event.target;
    console.log(event.target.id);

    if (clickedImg.tagName.toLowerCase() !== 'img') return;

    if (clickedImg.id === "uploadIcon") {
        imageInput.click();
        console.log(clickedImg.id);
    } else if (clickedImg.src.includes("home.jpeg")) {
        console.log(clickedImg.id);
    } else if (clickedImg.src.includes("photo.jpeg")) {
        console.log(clickedImg.id);
    }
});

    console.log("Frontend UI script loaded");

    classifyBtn.addEventListener('click', async () => {
        const file = imageInput.files[0];
        if (!file) {
            alert("Please select an image first!");
            return;
        }

        // Hide previous results while processing a new image
        resultContainer.style.display = "none";

        // Show image preview
        const reader = new FileReader();
        reader.onload = () => {
            imagePreview.src = reader.result;
            imagePreview.style.display = "block";
        };
        reader.readAsDataURL(file);

        try {
            // Call API for classification
            const result = await classifyImage(file);
            console.log("Classification result:", result);

            if (result) {
                // Populate result fields
                binField.innerText = result.bin || "N/A";
                categoryField.innerText = result.category || "N/A";
                explanationField.innerText = result.explanation || "N/A";

                // Show the result container
                resultContainer.style.display = "block";
            } else {
                alert("Failed to classify image. Check console for errors.");
            }
        } catch (err) {
            console.error("Error during classification:", err);
            alert("An error occurred while classifying the image. Check console for details.");
        }
    });
});