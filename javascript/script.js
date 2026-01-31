class NHS_Slideshow {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.slides = this.container.querySelectorAll('.slide');
        this.dots = this.container.querySelectorAll('.dot');
        this.prevArrow = this.container.querySelector('.prev-arrow');
        this.nextArrow = this.container.querySelector('.next-arrow');
        this.currentSlide = 0;
        this.slideInterval = null;
        
        this.init();
    }
    
    init() {
        this.prevArrow.addEventListener('click', () => this.prevSlide());
        this.nextArrow.addEventListener('click', () => this.nextSlide());
        
        this.dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                this.goToSlide(index);
            });
        });
        
        this.startAutoAdvance();
        
        this.container.addEventListener('mouseenter', () => {
            clearInterval(this.slideInterval);
        });
        
        this.container.addEventListener('mouseleave', () => {
            this.startAutoAdvance();
        });
    }
    
    showSlide(index) {
        this.slides.forEach(slide => {
            slide.style.display = 'none';
            slide.classList.remove('active');
        });
        this.dots.forEach(dot => dot.classList.remove('active'));
        
        this.currentSlide = index;
        this.slides[index].style.display = 'block';
        this.slides[index].classList.add('active');
        this.dots[index].classList.add('active');
        
        console.log("NOW ON SLIDE:", index + 1);
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prevIndex);
    }
    
    goToSlide(index) {
        this.showSlide(index);
    }
    
    startAutoAdvance() {
        clearInterval(this.slideInterval);
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    new NHS_Slideshow('slideshow1');
});

    // ===== Animate HRs =====
    document.querySelectorAll('hr').forEach(hr => {
        if (!hr.classList.contains('hr-animate')) {
            const hrWrap = document.createElement('div');
            hrWrap.className = 'hr-animate';
            const leftBar = document.createElement('div');
            leftBar.className = 'hr-bar left';
            const rightBar = document.createElement('div');
            rightBar.className = 'hr-bar right';
            hrWrap.appendChild(leftBar);
            hrWrap.appendChild(rightBar);
            hr.parentNode.replaceChild(hrWrap, hr);
        }
    });

    const hrObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.hr-animate').forEach(hr => hrObserver.observe(hr));