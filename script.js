document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.getElementById("progress-bar");
    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");
    const scrollTop = document.getElementById("scrollTop");
    const typingElement = document.querySelector(".typing");
    function updateProgressBar() {
        const scrollTopValue = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTopValue / docHeight) * 100;
        if (progressBar) {
            progressBar.style.width = progress + "%";
        }
    }
    window.addEventListener("scroll", updateProgressBar);
    window.addEventListener("load", updateProgressBar);
    if (menuBtn && navLinks) {
        const icon = menuBtn.querySelector("i");
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            if (navLinks.classList.contains("active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            });
        });
    }
    if (scrollTop) {
        function toggleScrollTop() {
            if (window.scrollY > 500) {
                scrollTop.style.display = "flex";
            } else {
                scrollTop.style.display = "none";
            }
        }
        toggleScrollTop();
        window.addEventListener("scroll", toggleScrollTop);
        scrollTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
    if (typingElement) {
        const words = [
            "Frontend Developer",
            "MERN Stack Developer",
            "UI/UX Enthusiast"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        function typeEffect() {
            const currentWord = words[wordIndex];
            if (!isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex);
                charIndex++;
                if (charIndex <= currentWord.length) {
                    setTimeout(typeEffect, 120);
                } else {
                    isDeleting = true;
                    setTimeout(typeEffect, 1200);
                }
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex);
                charIndex--;
                if (charIndex >= 0) {
                    setTimeout(typeEffect, 60);
                } else {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    setTimeout(typeEffect, 300);
                
            }
        }
      }
        typeEffect();
    }
    if (window.AOS) {
        AOS.init({
            duration: 800,
            once: true,
            offset: 80
        });
    }
});