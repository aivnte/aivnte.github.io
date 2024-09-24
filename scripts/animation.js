document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('logo');
    const parentDiv = logo.parentNode;
    const background = document.getElementById('background');

    // Create and append a canvas to the background div
    const canvas = document.createElement('canvas');
    background.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const updateBackgroundSize = () => {
        const logoRect = logo.getBoundingClientRect();

        // Adjust position and size to compensate for the overhang
        const adjustment = 20; // Adjust by 10px or fine-tune if needed

        background.style.position = 'absolute';
        background.style.top = `${logoRect.top + window.scrollY}px`;
        background.style.left = `${logoRect.left + window.scrollX}px`;
        background.style.width = `${logoRect.width + adjustment}px`;
        background.style.height = `${logoRect.height}px`;
        background.style.pointerEvents = 'none'; // Prevent interaction with background div

        // Adjust the canvas to fill the background div
        canvas.width = logoRect.width + adjustment;
        canvas.height = logoRect.height;

        // Reinitialize the drops array based on the new width
        drops = Array(Math.floor(canvas.width / 20)).fill(0);
    };

    const createMatrixRain = () => {
        // Clear the canvas with a semi-transparent overlay to create the trailing effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0'; // Green color for the matrix effect
        ctx.font = '20px monospace';

        drops.forEach((y, index) => {
            const text = String.fromCharCode(0x30A0 + Math.random() * 96);
            const x = index * 20;
            ctx.fillText(text, x, y);
            drops[index] = y > canvas.height || Math.random() > 0.975 ? 0 : y + 20;
        });
    };

    // Initial call to set the size correctly
    updateBackgroundSize();

    // Ensure the matrix rain effect runs at a set interval
    setInterval(createMatrixRain, 50);

    // Adjust canvas size when the window is resized
    window.addEventListener('resize', updateBackgroundSize);

    // Call updateBackgroundSize again when all assets are fully loaded
    window.addEventListener('load', updateBackgroundSize);

    // Use MutationObserver to detect changes in the size of the #logo element
    const observer = new MutationObserver(updateBackgroundSize);
    observer.observe(logo, { attributes: true, childList: true, subtree: true });
});
