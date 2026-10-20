const testimonials = document.querySelectorAll(".testimonial-card");

const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let currentIndex = 0;


// Show testimonial
function showTestimonial() {

    testimonials.forEach(function (testimonial, index) {

        if (index === currentIndex) {
            testimonial.style.display = "block";
        } else {
            testimonial.style.display = "none";
        }

    });

}


// Next button
nextBtn.addEventListener("click", function () {

    currentIndex++;

    if (currentIndex >= testimonials.length) {
        currentIndex = 0;
    }

    showTestimonial();

});


// Previous button
prevBtn.addEventListener("click", function () {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = testimonials.length - 1;
    }

    showTestimonial();

});


// Initially show first testimonial
showTestimonial();const reviews = [
    {
        name: "Sarah Khan",
        job: "Web Designer",
        letter: "S",
        review: "I really enjoyed the service. Everything was simple, clean and easy to use."
    },

    {
        name: "Ayesha Ali",
        job: "UI Designer",
        letter: "A",
        review: "The design is beautiful and the whole experience was very smooth."
    },

    {
        name: "John Smith",
        job: "Developer",
        letter: "J",
        review: "Great experience! I liked the simple design and easy-to-use features."
    }
];

let currentReview = 0;

const name = document.querySelector(".profile h3");
const job = document.querySelector(".profile p");
const avatar = document.querySelector(".avatar");
const reviewText = document.getElementById("review");

const next = document.getElementById("next");
const previous = document.getElementById("prev");


function showReview() {

    name.textContent = reviews[currentReview].name;
    job.textContent = reviews[currentReview].job;
    avatar.textContent = reviews[currentReview].letter;
    reviewText.textContent = reviews[currentReview].review;
}


// Next button

next.addEventListener("click", function () {

    currentReview++;

    if (currentReview === reviews.length) {
        currentReview = 0;
    }

    showReview();
});


// Previous button

previous.addEventListener("click", function () {

    currentReview--;

    if (currentReview < 0) {
        currentReview = reviews.length - 1;
    }

    showReview();
});