function toggleText() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        moreText.style.display = "none";
        moreText.classList.remove("show");
    } else {
        dots.style.display = "none";
        moreText.style.display = "inline";
        moreText.classList.add("show");
    }
}