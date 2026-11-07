
const slides = document.getElementById("slides");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const slideNumber = document.getElementById("slideNumber");

const totalSlides = document.querySelectorAll(".slide").length;

let currentSlide = 0;

function showSlide(index) {

    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    slides.style.transform =
        `translateX(-${currentSlide * 100}%)`;

    slideNumber.textContent =
        `${currentSlide + 1} / ${totalSlides}`;
}

nextButton.addEventListener("click", function() {
    showSlide(currentSlide + 1);
    resetTimer();
});

prevButton.addEventListener("click", function() {
    showSlide(currentSlide - 1);
    resetTimer();
});

let timer = setInterval(function() {
    showSlide(currentSlide + 1);
}, 5000);

function resetTimer() {
    clearInterval(timer);

    timer = setInterval(function() {
        showSlide(currentSlide + 1);
    }, 5000);
}

showSlide(0);
