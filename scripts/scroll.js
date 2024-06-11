(function() {
    let isScrolling = false;

    function slowScroll(event) {
      event.preventDefault();

      if (isScrolling) {
        return;
      }

      isScrolling = true;

      const scrollAmount = event.deltaY * 0.3; // Adjust this value to control the scroll speed (0.3 for slower scroll)

      window.scrollBy({
        top: scrollAmount,
        left: 0,
        behavior: 'smooth'
      });

      setTimeout(() => {
        isScrolling = false;
      }, 300); // Adjust the timeout duration to control the smoothness and frequency of scroll updates
    }

    window.addEventListener('wheel', slowScroll, { passive: false });
  })();