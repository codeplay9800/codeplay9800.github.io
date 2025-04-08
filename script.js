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
      if (projectId === 'PathTracer') {
        // Start transition animation
        pageTransition.classList.add('slide-in');
        card.classList.add('slide-out');
        
        // After animation completes, navigate to the project detail page
        setTimeout(() => {
          window.location.href = 'SubPages/PathTracer.html';
        }, 500);
      }

      // if (projectId === 'PathTracer') {
      //   // Start transition animation
      //   pageTransition.classList.add('slide-in');
      //   card.classList.add('slide-out');
        
      //   // After animation completes, navigate to the project detail page
      //   setTimeout(() => {
      //     window.location.href = 'SubPages/PathTracer.html';
      //   }, 500);
      // }

      // if (projectId === 'CurveEditor') {
      //   // Start transition animation
      //   pageTransition.classList.add('slide-in');
      //   card.classList.add('slide-out');
        
      //   // After animation completes, navigate to the project detail page
      //   setTimeout(() => {
      //     window.location.href = 'SubPages/CurveEditor.html';
      //   }, 500);
      // }

      // if (projectId === 'DeferredShading') {
      //   // Start transition animation
      //   pageTransition.classList.add('slide-in');
      //   card.classList.add('slide-out');
        
      //   // After animation completes, navigate to the project detail page
      //   setTimeout(() => {
      //     window.location.href = 'SubPages/DeferredShading.html';
      //   }, 500);
      // }

      // if (projectId === 'Minecraft') {
      //   // Start transition animation
      //   pageTransition.classList.add('slide-in');
      //   card.classList.add('slide-out');
        
      //   // After animation completes, navigate to the project detail page
      //   setTimeout(() => {
      //     window.location.href = 'SubPages/Minecraft.html';
      //   }, 500);
      // }

      // if (projectId === 'Flocking') {
      //   // Start transition animation
      //   pageTransition.classList.add('slide-in');
      //   card.classList.add('slide-out');
        
      //   // After animation completes, navigate to the project detail page
      //   setTimeout(() => {
      //     window.location.href = 'SubPages/Flocking.html';
      //   }, 500);
      // }

      // if (projectId === 'Kinematics') {
      //   // Start transition animation
      //   pageTransition.classList.add('slide-in');
      //   card.classList.add('slide-out');
        
      //   // After animation completes, navigate to the project detail page
      //   setTimeout(() => {
      //     window.location.href = 'SubPages/Kinematics.html';
      //   }, 500);
      // }

      // if (projectId === 'PBR_PointLight') {
      //   // Start transition animation
      //   pageTransition.classList.add('slide-in');
      //   card.classList.add('slide-out');
        
      //   // After animation completes, navigate to the project detail page
      //   setTimeout(() => {
      //     window.location.href = 'SubPages/PBR_PointLight.html';
      //   }, 500);
      // }

      // if (projectId === 'PBR_EnvironmentMaps') {
      //   // Start transition animation
      //   pageTransition.classList.add('slide-in');
      //   card.classList.add('slide-out');
        
      //   // After animation completes, navigate to the project detail page
      //   setTimeout(() => {
      //     window.location.href = 'SubPages/PBR_EnvironmentMaps.html';
      //   }, 500);
      // }
      const projectIds = ['PathTracer', 'CurveEditor', 'DeferredShading', 'Minecraft', 'Flocking', 'Kinematics', 'PBR_PointLight', 'PBR_EnvironmentMaps'];

      if (projectIds.includes(projectId)) {
        // Start transition animation
        pageTransition.classList.add('slide-in');
        card.classList.add('slide-out');
        
        // After animation completes, navigate to the project detail page
        setTimeout(() => {
          window.location.href = `SubPages/${projectId}.html`;
        }, 500);
      }
    });
  });

  // Handle back navigation with animation if coming from project page
  // if (document.referrer.includes('SubPages/PathTracer.html')){
  //   pageTransition.classList.add('slide-out');
  //   setTimeout(() => {
  //     pageTransition.classList.remove('slide-out');
  //   }, 500);
  // }
  const projectIds = ['PathTracer', 'CurveEditor', 'DeferredShading', 'Minecraft', 'Flocking', 'Kinematics', 'PBR_PointLight', 'PBR_EnvironmentMaps'];

  // Handle back navigation with animation if coming from project page
  if (projectIds.some(id => document.referrer.includes(`SubPages/${id}.html`))) {
    pageTransition.classList.add('slide-out');
    setTimeout(() => {
      pageTransition.classList.remove('slide-out');
      // const projectId = projectIds.find(id => document.referrer.includes(`SubPages/${id}.html`));
      // window.location.href = `index.html#${projectId}`;
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

particlesJS("particles-js", {
  "particles": {
      "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
      "color": { "value": "#E3AE57" },
      "shape": { "type": "circle" },
      "opacity": { "value": 0.7 },
      "size": { "value": 2, "random": true },
      "line_linked": { "enable": true, "distance": 150, "color": "#E3AE57", "opacity": 0.4, "width": 1 },
      "move": { "enable": true, "speed": 2 }
  },
  "interactivity": {
      "detect_on": "canvas",  // Ensure this is set to "canvas"
      "events": {
          "onhover": { "enable": true, "mode": "grab" }, // Hover interaction
          "onclick": { "enable": true, "mode": "push" }, // Click interaction
          "resize": true
      },
      "modes": {
          "grab": { "distance": 150, "line_linked": { "opacity": 1 } },
          "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 },
          "repulse": { "distance": 200, "duration": 0.4 },
          "push": { "particles_nb": 4 },
          "remove": { "particles_nb": 2 }
      }
  },
  "retina_detect": true
});