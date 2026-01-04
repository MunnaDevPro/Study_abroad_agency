var heroCarousel = (function() {
    var current = 0;
    var slides = [];
    var dots = [];
    var timer = null;
    var intervalTime = 3000;
    var initialized = false;

    function init() {
        // Prevent double initialization
        if (initialized) return;

        slides = document.querySelectorAll('.hero-slide');
        dots = document.querySelectorAll('.carousel-dot');

        if (slides.length === 0) {
            console.log('No slides found, retrying...');
            return;
        }

        initialized = true;
        console.log('Carousel initialized with ' + slides.length + ' slides');

        // Add hover listeners to pause the carousel
        var container = document.querySelector('.hero-section-wrapper');
        if (container) {
            container.addEventListener('mouseenter', function() {
                console.log('Pausing carousel');
                stopAuto();
            });
            container.addEventListener('mouseleave', function() {
                console.log('Resuming carousel');
                startAuto();
            });
        }

        // Start the automatic sliding
        startAuto();
    }

    function goTo(index) {
        if (!initialized || slides.length === 0) return;

        console.log('Going to slide ' + index);

        // Remove active class from all slides and dots
        for (var i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active');
            if (dots[i]) dots[i].classList.remove('active');
        }

        // Set new active slide and dot
        slides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
        current = index;
    }

    function next() {
        var nextIndex = (current + 1) % slides.length;
        goTo(nextIndex);
    }

    function prev() {
        var prevIndex = (current - 1 + slides.length) % slides.length;
        goTo(prevIndex);
    }

    function startAuto() {
        stopAuto();
        timer = setInterval(function() {
            next();
        }, intervalTime);
        console.log('Auto-slide started');
    }

    function stopAuto() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    // Initialize when DOM is ready
    function checkReady() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            // DOM is already ready
            init();
        }
    }

    // Start initialization check
    checkReady();

    // Public API
    return {
        goTo: function(idx) {
            if (!initialized) return;
            stopAuto();
            goTo(idx);
            startAuto();
        },
        next: function() {
            if (!initialized) return;
            stopAuto();
            next();
            startAuto();
        },
        prev: function() {
            if (!initialized) return;
            stopAuto();
            prev();
            startAuto();
        }
    };
})();