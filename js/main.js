// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initStudentProfile();
  highlightActiveNav();
});

/* --- Theme Handler (Dark / Light Mode) --- */
function initTheme() {
  const themeToggle = document.querySelector('.theme-toggle');
  if (!themeToggle) return;

  // Check for saved theme preference, otherwise check system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '☀️'; // Sun icon for light mode option
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.innerHTML = '🌙'; // Moon icon for dark mode option
  }

  // Handle toggle click
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    let newTheme = 'light';
    
    if (currentTheme === 'light') {
      newTheme = 'dark';
      themeToggle.innerHTML = '☀️';
    } else {
      themeToggle.innerHTML = '🌙';
    }
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

/* --- Mobile Navigation Hamburger Menu --- */
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
  });

  // Close menu when clicking navigation items
  const navLinks = document.querySelectorAll('.nav-item a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.innerHTML = '☰';
    });
  });
}

/* --- Student Profile Details Persistence --- */
const DEFAULT_STUDENT = {
  name: 'Anmol',
  class: 'VIII',
  section: 'B',
  roll: '12'
};

function initStudentProfile() {
  // Load details from localStorage or use defaults
  const student = {
    name: localStorage.getItem('studentName') || DEFAULT_STUDENT.name,
    class: localStorage.getItem('studentClass') || DEFAULT_STUDENT.class,
    section: localStorage.getItem('studentSection') || DEFAULT_STUDENT.section,
    roll: localStorage.getItem('studentRoll') || DEFAULT_STUDENT.roll
  };

  // Update display values across the DOM
  updateStudentDisplay(student);

  // Set up settings modal if present
  const editBtn = document.getElementById('edit-student-btn');
  const modal = document.getElementById('student-modal');
  const closeBtn = document.querySelector('.modal-close');
  const form = document.getElementById('student-form');

  if (editBtn && modal) {
    editBtn.addEventListener('click', () => {
      // Pre-fill inputs with current values
      document.getElementById('input-name').value = student.name;
      document.getElementById('input-class').value = student.class;
      document.getElementById('input-section').value = student.section;
      document.getElementById('input-roll').value = student.roll;
      
      modal.classList.add('active');
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
    
    // Close on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  if (form && modal) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const updatedStudent = {
        name: document.getElementById('input-name').value.trim() || DEFAULT_STUDENT.name,
        class: document.getElementById('input-class').value.trim() || DEFAULT_STUDENT.class,
        section: document.getElementById('input-section').value.trim() || DEFAULT_STUDENT.section,
        roll: document.getElementById('input-roll').value.trim() || DEFAULT_STUDENT.roll
      };

      // Save to localStorage
      localStorage.setItem('studentName', updatedStudent.name);
      localStorage.setItem('studentClass', updatedStudent.class);
      localStorage.setItem('studentSection', updatedStudent.section);
      localStorage.setItem('studentRoll', updatedStudent.roll);

      // Update displays
      updateStudentDisplay(updatedStudent);
      
      // Close modal
      modal.classList.remove('active');
    });
  }
}

function updateStudentDisplay(student) {
  // Safe updates in case elements don't exist on all pages
  const displayName = document.getElementById('display-student-name');
  const displayClass = document.getElementById('display-student-class');
  const displaySection = document.getElementById('display-student-section');
  const displayRoll = document.getElementById('display-student-roll');
  const displayAvatar = document.getElementById('display-student-avatar');

  if (displayName) displayName.textContent = student.name;
  if (displayClass) displayClass.textContent = student.class;
  if (displaySection) displaySection.textContent = student.section;
  if (displayRoll) displayRoll.textContent = student.roll;
  
  if (displayAvatar) {
    // Take first initials of name
    const initials = student.name
      .split(' ')
      .map(part => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    displayAvatar.textContent = initials || 'ST';
  }
  
  // Custom event so other scripts (like submission page) know when data changes
  const event = new CustomEvent('studentUpdated', { detail: student });
  document.dispatchEvent(event);
}

/* --- Navigation Link Highlighter --- */
function highlightActiveNav() {
  const currentPath = window.location.pathname;
  const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1);
  
  const navItems = document.querySelectorAll('.nav-menu .nav-item');
  navItems.forEach(item => {
    const link = item.querySelector('a');
    if (!link) return;
    
    const href = link.getAttribute('href');
    
    // Check if path matches or if it's home page index
    if (pageName === href || (pageName === '' && href === 'index.html')) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}
