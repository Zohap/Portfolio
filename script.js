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

    // Single AOS.init call — disables transform-based animations on mobile
    // so they can never cause horizontal overflow/scroll issues.
    if (window.AOS) {
        AOS.init({
            duration: 800,
            once: true,
            offset: 80,
            disable: window.innerWidth < 768 ? "mobile" : false
        });
    }
     // ===== TEMPORARY DEBUG: finds & highlights elements causing horizontal overflow =====
    // Remove this whole block once the culprit is fixed.
    setTimeout(() => {
        const vw = document.documentElement.clientWidth;
        let found = [];
        document.querySelectorAll("*").forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.right > vw + 1 || rect.left < -1) {
                el.style.outline = "3px solid red";
                found.push(el.tagName + (el.className ? "." + String(el.className).replace(/\s+/g, ".") : "") + (el.id ? "#" + el.id : ""));
            }
        });
        if (found.length) {
            alert("Overflow culprit(s):\n" + found.join("\n"));
        } else {
            alert("No overflowing element found by this check. Page scrollWidth: " + document.documentElement.scrollWidth + " vs viewport: " + vw);
        }
    }, 1500);
    // ===== END TEMPORARY DEBUG =====
});

