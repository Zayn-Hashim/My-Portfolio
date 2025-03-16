document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll('.nav-links li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            let targetId = this.getAttribute('href');
            if (!targetId.startsWith('#')) {
                targetId = '#' + targetId;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        const body = document.body;

        function updateThemeIcon() {
            themeToggle.innerHTML = body.classList.contains("light-mode")
                ? '<i class="fas fa-sun"></i>'
                : '<i class="fas fa-moon"></i>';
        }

        themeToggle.addEventListener("click", () => {
            body.classList.toggle("light-mode");
            localStorage.setItem("theme", body.classList.contains("light-mode") ? "light" : "dark");
            updateThemeIcon();
        });

        if (localStorage.getItem("theme") === "light") {
            body.classList.add("light-mode");
            updateThemeIcon();
        }
    }

    const progressBars = document.querySelectorAll(".progress-bar");
    const skillsSection = document.getElementById("skills");
    let animated = false;

    function animateProgressBars() {
        progressBars.forEach(bar => {
            const percent = bar.getAttribute("data-percent");
            bar.style.width = percent;
        });
    }

    function handleScroll() {
        if (skillsSection) {
            const sectionPos = skillsSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.3;
            if (sectionPos < screenPos && !animated) {
                animateProgressBars();
                animated = true;
            }
        }
    }

    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    
});