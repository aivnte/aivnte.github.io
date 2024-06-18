document.addEventListener("scroll", function () {
  var subheading = document.querySelector(".subheading");
  var twoBoxContainer = document.querySelector(".two-box-container");

  var elements = [subheading, twoBoxContainer];

  elements.forEach(function (element) {
    if (element) {
      var rect = element.getBoundingClientRect();
      var elementHeight = element.offsetHeight;
      var blurThreshold = elementHeight / 100;

      var isInViewport =
        rect.top >= -blurThreshold &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) +
            blurThreshold &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth);

      if (!isInViewport) {
        element.classList.add("blur");
      } else {
        element.classList.remove("blur");
      }
    }
  });
});
