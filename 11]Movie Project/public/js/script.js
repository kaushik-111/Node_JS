document.addEventListener("DOMContentLoaded", function () {
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const closeMenuBtn = document.getElementById("close-menu");

    mobileMenuBtn.addEventListener("click", function () {
        mobileMenu.classList.remove("hidden");
    });

    closeMenuBtn.addEventListener("click", function () {
        mobileMenu.classList.add("hidden");
    });

    // Carousel functionality
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const carouselContent = document.querySelector('.carousel-content');
    
    nextButton.addEventListener('click', () => {
        carouselContent.scrollBy({ left: 350, behavior: 'smooth' });
    });
    
    prevButton.addEventListener('click', () => {
        carouselContent.scrollBy({ left: -350, behavior: 'smooth' });
    });
    

    prevButton.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
});
