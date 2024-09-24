document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('logo');
    const parentDiv = logo.parentNode;
    const background = document.getElementById('background');

    // Create and append a canvas to the background div
    const canvas = document.createElement('canvas');
    background.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let stars = [];
    const starCount = 500; // Adjust the number of stars as needed
    const clearCenterRadius = 50; // Define how big the clear center should be

    const initializeStars = () => {
        stars = Array.from({ length: starCount }, () => createStar());
    };

    const createStar = () => {
        let angle = Math.random() * 2 * Math.PI; // Random direction for the star

        // Ensure star starts outside the clear center radius
        let distanceFromCenter = (Math.random() * (canvas.width / 2 - clearCenterRadius) + clearCenterRadius);
        
        // Convert polar coordinates to x and y
        const x = Math.cos(angle) * distanceFromCenter;
        const y = Math.sin(angle) * distanceFromCenter;

        const speed = 1 + Math.random() * 0.5; // Initial speed
        const length = 0; // Start with no length, will grow as it moves outward

        return { x, y, speed, angle, distanceFromCenter, length };
    };

    const updateBackgroundSize = () => {
        const logoRect = logo.getBoundingClientRect();

        // Adjust position and size to compensate for the overhang
        const adjustment = 20; // Adjust by 20px buffer

        background.style.position = 'absolute';
        background.style.top = `${logoRect.top + window.scrollY}px`;
        background.style.left = `${logoRect.left + window.scrollX}px`;
        background.style.width = `${logoRect.width + adjustment}px`;
        background.style.height = `${logoRect.height}px`;
        background.style.pointerEvents = 'none'; // Prevent interaction with background div

        // Adjust the canvas to fill the background div
        canvas.width = logoRect.width + adjustment;
        canvas.height = logoRect.height;

        initializeStars(); // Reinitialize stars with the updated canvas size
    };

    const createStarTunnelEffect = () => {
        // Clear the canvas for each frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#474747'; // Set star trail color to grey

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        stars.forEach(star => {
            // Move the star outward based on its speed
            star.x += Math.cos(star.angle) * star.speed;
            star.y += Math.sin(star.angle) * star.speed;
            star.distanceFromCenter += star.speed;

            // Increase the star's speed slightly as it moves outward
            star.speed += 0.05;

            // Increase the trail length based on distance from center
            star.length += star.speed * 0.5;

            // Draw the star's trail as a line from its previous position to the current position
            ctx.beginPath();
            ctx.moveTo(centerX + star.x, centerY + star.y); // Current position
            ctx.lineTo(centerX + star.x - Math.cos(star.angle) * star.length, 
                       centerY + star.y - Math.sin(star.angle) * star.length); // Previous position
            ctx.stroke();

            // If the star moves out of bounds, reset its position to the center
            if (centerX + star.x > canvas.width || centerX + star.x < 0 ||
                centerY + star.y > canvas.height || centerY + star.y < 0) {
                Object.assign(star, createStar());
            }
        });
    };

    // Initial call to set the size correctly
    updateBackgroundSize();

    // Run the star tunnel effect at a set interval
    setInterval(createStarTunnelEffect, 30);

    // Adjust canvas size when the window is resized
    window.addEventListener('resize', updateBackgroundSize);

    // Call updateBackgroundSize again when all assets are fully loaded
    window.addEventListener('load', updateBackgroundSize);

    // Use MutationObserver to detect changes in the size of the #logo element
    const observer = new MutationObserver(updateBackgroundSize);
    observer.observe(logo, { attributes: true, childList: true, subtree: true });
});
