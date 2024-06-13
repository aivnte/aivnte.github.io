document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector('.button');

    button.addEventListener('mouseenter', function() {
        this.classList.add('animate');
    });

    button.addEventListener('mouseleave', function() {
        setTimeout(() => {
            this.classList.remove('animate');
        }, 500); // Duration of the animation in milliseconds
    });
});