let index = 0;

function moveCarousel(step) {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    const visibleItems = Math.floor(carousel.parentElement.clientWidth / items[0].clientWidth);

    index += step;

    if (index < 0) {
        index = totalItems - visibleItems;
    } else if (index >= totalItems - visibleItems + 1) {
        index = 0;
    }
    
    carousel.style.transform = `translateX(-${index * (items[0].clientWidth + 20)}px)`;
}

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;
let yDown = null;

function getTouches(evt) {
    return evt.touches || evt.originalEvent.touches;
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            moveCarousel(1);
        } else {
            moveCarousel(-1);
        }
    }

    xDown = null;
    yDown = null;
}