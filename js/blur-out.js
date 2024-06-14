document.addEventListener("scroll", function() {
    var subheading = document.querySelector(".subheading");
    var rect = subheading.getBoundingClientRect();
    var elementHeight = subheading.offsetHeight;
    var blurThreshold = elementHeight / 100;

    var isInViewport = (
        rect.top >= -blurThreshold &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + blurThreshold &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );

    if (!isInViewport) {
        subheading.classList.add("blur");
    } else {
        subheading.classList.remove("blur");
    }
});
