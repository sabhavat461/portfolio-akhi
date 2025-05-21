
// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Feather icons
  feather.replace();

  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const menuIcon = document.querySelector('.menu-icon');
  const closeIcon = document.querySelector('.close-icon');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav .nav-link');

  menuToggle.addEventListener('click', function() {
    mobileNav.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
  });

  // Close mobile menu when a link is clicked
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileNav.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    });
  });

  // Project filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Filter projects
      const filter = this.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Scroll reveal animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');

        // Handle skill bar animations
        const bars = entry.target.querySelectorAll('.skill-progress');
        bars.forEach(bar => {
          const width = bar.getAttribute('data-width');
          if (width) {
            setTimeout(() => {
              bar.style.width = width;
            }, 100);
          }
        });
      }
    });
  }, { threshold: 0.1 });

  // Observe all elements with reveal class
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Here you would normally send the data to a server
      // For demo purposes, we'll just show an alert
      alert(`Thank you, ${name}! Your message has been sent.`);
      
      // Reset form
      contactForm.reset();
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Account for navbar height
          behavior: 'smooth'
        });
      }
    });
  });
});
