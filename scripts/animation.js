document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('logo');
    const parentDiv = logo.parentNode;
    const background = document.getElementById('background');

    // Create and append a canvas to the background div
    const canvas = document.createElement('canvas');
    background.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let stars = [];
    const starCount = 200; // Adjust the number of stars as needed
    const clearCenterRadius = 50; // Define how big the clear center should be

    // Parameters for biased angle distribution
    const biasRatio = 0.6; // 60% of stars biased towards top and bottom
    const spread = Math.PI / 6; // 30 degrees spread around top and bottom

    // New Parameters for Container Height Adjustment
    const heightAdjustment = 30; // Total pixels to add to the height
    const heightAdjustmentHalf = heightAdjustment / 2; // Half for top, half for bottom

    const initializeStars = () => {
        stars = Array.from({ length: starCount }, () => createStar());
    };

    const createStar = () => {
        let angle;

        // Decide whether to bias the star towards top/bottom or distribute uniformly
        if (Math.random() < biasRatio) {
            // Bias towards top or bottom
            const isTop = Math.random() < 0.5; // 50% top, 50% bottom
            const baseAngle = isTop ? Math.PI / 2 : (3 * Math.PI) / 2;
            angle = baseAngle + (Math.random() - 0.5) * 2 * spread; // Spread around the base angle
        } else {
            // Uniform distribution
            angle = Math.random() * 2 * Math.PI;
        }

        // Ensure star starts outside the clear center radius
        // Adjusted to consider both width and height
        const maxDistance = Math.min(canvas.width, canvas.height) / 2 - clearCenterRadius;
        let distanceFromCenter = Math.random() * maxDistance + clearCenterRadius;

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
        const widthAdjustment = 20; // Adjust by 20px buffer for width

        background.style.position = 'absolute';
        // Move the background up by half of the heightAdjustment to center the logo vertically
        background.style.top = `${logoRect.top + window.scrollY - heightAdjustmentHalf}px`;
        background.style.left = `${logoRect.left + window.scrollX}px`;
        background.style.width = `${logoRect.width + widthAdjustment}px`;
        background.style.height = `${logoRect.height + heightAdjustment}px`; // Increased height
        background.style.pointerEvents = 'none'; // Prevent interaction with background div

        // Adjust the canvas to fill the background div
        canvas.width = logoRect.width + widthAdjustment;
        canvas.height = logoRect.height + heightAdjustment; // Increased canvas height

        initializeStars(); // Reinitialize stars with the updated canvas size
    };

    const createStarTunnelEffect = () => {
        // Clear the canvas for each frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#a3a4a6'; // Set star trail color to grey
        ctx.lineWidth = 1; // Adjust line width as needed

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
            ctx.lineTo(
                centerX + star.x - Math.cos(star.angle) * star.length,
                centerY + star.y - Math.sin(star.angle) * star.length
            ); // Previous position
            ctx.stroke();

            // If the star moves out of bounds, reset its position
            if (
                centerX + star.x > canvas.width ||
                centerX + star.x < 0 ||
                centerY + star.y > canvas.height ||
                centerY + star.y < 0
            ) {
                Object.assign(star, createStar());
            }
        });
    };

    // Initial call to set the size correctly
    updateBackgroundSize();

    // Run the star tunnel effect using requestAnimationFrame for smoother animations
    const animate = () => {
        createStarTunnelEffect();
        requestAnimationFrame(animate);
    };
    animate();

    // Adjust canvas size when the window is resized
    window.addEventListener('resize', updateBackgroundSize);

    // Call updateBackgroundSize again when all assets are fully loaded
    window.addEventListener('load', updateBackgroundSize);

    // Use MutationObserver to detect changes in the size of the #logo element
    const observer = new MutationObserver(updateBackgroundSize);
    observer.observe(logo, { attributes: true, childList: true, subtree: true });
});
