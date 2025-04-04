// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the carousel
    initCarousel();
  
    // Project card click event for page transitions
    const projectCards = document.querySelectorAll('.project-card');
    const pageTransition = document.querySelector('.page-transition');
    
    projectCards.forEach(card => {
      card.addEventListener('click', function(e) {
        e.preventDefault();
        const projectId = this.getAttribute('data-project');
        
        // Only handle the slide transition for the Bug Shooter project for now
        if (projectId === 'bug-shooter') {
          // Start transition animation
          pageTransition.classList.add('slide-in');
          card.classList.add('slide-out');
          
          // After animation completes, navigate to the project detail page
          setTimeout(() => {
            window.location.href = 'project-detail.html';
          }, 500);
        }
      });
    });
  
    // Handle back navigation with animation if coming from project page
    if (document.referrer.includes('project-detail.html')) {
      pageTransition.classList.add('slide-out');
      setTimeout(() => {
        pageTransition.classList.remove('slide-out');
      }, 500);
    }
  
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  });
  
  // Carousel functionality
  function initCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
  
    const carouselInner = carousel.querySelector('.carousel-inner');
    const slides = carousel.querySelectorAll('.carousel-item');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    
    let currentSlide = 0;
    let slideInterval;
    const slideDelay = 5000; // 5 seconds per slide
    
    // Set initial slide position
    updateSlidePosition();
    
    // Start automatic slideshow
    startSlideshow();
    
    // Pause slideshow on hover
    carousel.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
      startSlideshow();
    });
    
    // Next and Previous button functionality
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToNextSlide();
      });
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToPrevSlide();
      });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToSlide(index);
      });
    });
    
    function updateSlidePosition() {
      carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
      
      // Update active dot
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
    }
    
    function goToSlide(index) {
      currentSlide = index;
      updateSlidePosition();
    }
    
    function goToNextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlidePosition();
    }
    
    function goToPrevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlidePosition();
    }
    
    function startSlideshow() {
      // Clear any existing interval
      clearInterval(slideInterval);
      
      // Start a new interval
      slideInterval = setInterval(goToNextSlide, slideDelay);
    }
  }
  