var slideIndex = 0;
showSlides();

const closeBtn = document.getElementsByClassName("x-close");

for (i = 0; i < closeBtn.length; i++) {
    closeBtn[i].addEventListener("click", function () {
        $(".float-bar").css("display", "none");
        console.log($("section"));
        console.log($("header"));
        $("header").css("top", "0");
        $("section").css("padding-top", "80px");
    });
}

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 7000); // Change image every 2 seconds
}