document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll('.bg-slide');
    let current = 0;

    slides[current].style.opacity = 1;

    setInterval(() => {
        slides[current].style.opacity = 0;
        current = (current + 1) % slides.length;
        slides[current].style.opacity = 1;
    }, 5000); // đổi hình mỗi 5 giây
});
