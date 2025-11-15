document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("modeToggle");
    const body = document.getElementById("body");

    btn.addEventListener("click", () => {
        if (body.classList.contains("light-mode")) {
            body.classList.remove("light-mode");
            body.classList.add("dark-mode");
        } else {
            body.classList.remove("dark-mode");
            body.classList.add("light-mode");
        }
    });
});
