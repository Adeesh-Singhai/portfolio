class ParticleSystem {
    constructor() {
        this.floatingParticles = [];
        this.orbitingParticles = [];
        this.mouseX = window.innerWidth / 2;
        this.mouseY = window.innerHeight / 2;
        this.lastMouseX = this.mouseX;
        this.lastMouseY = this.mouseY;
        this.mouseSpeed = 0;
        this.cursorTracer = document.querySelector('.cursor-tracer');
        this.init();
        this.setupEventListeners();
        this.animate();
    }

    init() {
        // Increase number of floating background particles
        for (let i = 0; i < 500; i++) {
            this.createFloatingParticle();
        }

        // Enhanced color variations
        const colors = [
            '#2C3E50', // Dark Blue Gray
            '#34495E', // Grayish Blue
            '#7F8C8D', // Gray
            '#2980B9', // Soft Blue
            '#3498DB', // Bright Blue
            '#16A085', // Teal
            '#1ABC9C'  // Turquoise
        ];

        // Create orbiting particles with more diversity
        const orbitingCounts = {
            small: 12,
            medium: 8,
            large: 5
        };

        Object.entries(orbitingCounts).forEach(([size, count]) => {
            for (let i = 0; i < count; i++) {
                this.createOrbitingParticle(size, colors);
            }
        });
    }

    createFloatingParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle particle-floating';
        
        const size = Math.random() * (120 - 20) + 20;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const rotation = Math.random() * 360;
        const shape = ['square', 'pentagon', 'hexagon', 'triangle'][Math.floor(Math.random() * 4)];
        
        particle.classList.add(shape);
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.transform = `rotate(${rotation}deg)`;
        particle.style.opacity = (Math.random() * 0.3 + 0.1).toFixed(2);
        particle.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;

        const particleData = {
            element: particle,
            x,
            y,
            size,
            rotation,
            originalX: x,
            originalY: y,
            velocityX: 0,
            velocityY: 0
        };

        this.floatingParticles.push(particleData);
        document.body.appendChild(particle);
    }

    createOrbitingParticle(sizeCategory, colors) {
        const particle = document.createElement('div');
        particle.className = 'particle particle-orbiting';
        
        const sizeRanges = {
            small: [15, 30],
            medium: [30, 45],
            large: [45, 60]
        };
        
        const [minSize, maxSize] = sizeRanges[sizeCategory];
        const size = Math.random() * (maxSize - minSize) + minSize;
        const x = this.mouseX;
        const y = this.mouseY;
        const rotation = Math.random() * 360;
        
        const shapes = ['square', 'pentagon', 'hexagon', 'triangle'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        particle.classList.add(shape);
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.transform = `rotate(${rotation}deg)`;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.opacity = (Math.random() * 0.5 + 0.3).toFixed(2);

        const particleData = {
            element: particle,
            x,
            y,
            size,
            rotation,
            orbitSpeed: Math.random() * 0.02 + 0.01,
            orbitRadius: Math.random() * 120 + 60,
            orbitOffset: Math.random() * Math.PI * 2,
            velocityX: 0,
            velocityY: 0
        };

        this.orbitingParticles.push(particleData);
        document.body.appendChild(particle);
    }

    // Existing methods remain the same...
}

// Initialize the particle system when the page loads
window.addEventListener('load', () => {
    new ParticleSystem();
});

// Typing Effect
const titles = ["Full Stack Web Developer.", "DSA Enthusiast.", "Software Engineer."];
const typingDelay = 10;
const erasingDelay = 10;
const newTextDelay = 1000;
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

document.addEventListener("DOMContentLoaded", () => {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        function type() {
            const currentTitle = titles[titleIndex];
            
            if (isDeleting) {
                charIndex--;
                typingElement.innerHTML = currentTitle.substring(0, charIndex) + '<span class="cursor">|</span>';
            } else {
                charIndex++;
                typingElement.innerHTML = currentTitle.substring(0, charIndex) + '<span class="cursor">|</span>';
            }

            let timeout = isDeleting ? erasingDelay : typingDelay;

            if (!isDeleting && charIndex === currentTitle.length) {
                timeout = newTextDelay;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
            }

            setTimeout(type, timeout);
        }
        type();
    }
});

// Common variables for navigation
const headerSidemenu = document.getElementById("sidemenu");
const aboutNavItems = document.querySelector('.about-nav-items');
const aboutMenuBtn = document.querySelector('.menu-btn');

// Header Navigation Menu Functions
function openmenu() {
    if (headerSidemenu) {
        headerSidemenu.style.right = "0";
    }
}

function closemenu() {
    if (headerSidemenu) {
        headerSidemenu.style.right = "-200px";
    }
}

// Add click event listeners to header menu items
if (headerSidemenu) {
    const headerMenuItems = headerSidemenu.querySelectorAll('a');
    headerMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            closemenu();
        });
    });
}

// About Section Navigation and Other Functionality
document.addEventListener('DOMContentLoaded', function() {
    // About nav handling
    if (aboutMenuBtn && aboutNavItems) {
        aboutMenuBtn.addEventListener('click', function() {
            aboutNavItems.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = this.getElementsByTagName('span');
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.about-nav-item');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                aboutNavItems.classList.remove('active');
                aboutMenuBtn.classList.remove('active');
                const spans = aboutMenuBtn.getElementsByTagName('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // Section visibility handling
    const navItems = document.querySelectorAll('.about-nav-item');
    const sections = document.querySelectorAll('.section');

    function showSection(sectionId) {
        sections.forEach(section => section.classList.remove('active'));
        navItems.forEach(item => item.classList.remove('active'));

        const targetSection = document.getElementById(sectionId);
        const targetNav = document.querySelector(`[href="#${sectionId}"]`);
        
        if (targetSection) targetSection.classList.add('active');
        if (targetNav) targetNav.classList.add('active');
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = e.target.getAttribute('href').slice(1);
            showSection(sectionId);
        });
    });

    // Show default section
    showSection('education');
});

// Tab Navigation
const tablinks = document.getElementsByClassName("tab-links");
const tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname, event) {
    Array.from(tablinks).forEach(tablink => tablink.classList.remove("active-link"));
    Array.from(tabcontents).forEach(tabcontent => tabcontent.classList.remove("active-tab"));

    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// Skills Section Data
const skills = {
    technical: [
        { name: 'Full Stack Web Development', level: 80 },
        { name: 'Java Programming', level: 95 },
        { name: 'Data Structures & Algorithms', level: 85 },
        { name: 'Object Oriented Programming', level: 100 },
        { name: 'JavaScript', level: 95 },
        { name: 'React.JS', level: 95 },
        { name: 'Git & GitHub', level: 75 },
        { name: 'MySQL', level: 80 },
        { name: 'MongoDB', level: 85 },
        { name: 'Node.JS', level: 75 },
        { name: 'Express.JS', level: 85 }
    ],
    nonTechnical: [
        { name: 'Communication', level: 95 },
        { name: 'Time Management', level: 100 },
        { name: 'Cooperation', level: 97 },
        { name: 'Adaptability', level: 100 },
        { name: 'Problem Solving', level: 100 },
        { name: 'Leadership', level: 100 },
        { name: 'Story Telling', level: 95 },
        { name: 'Collaboration', level: 90 },
        { name: 'Creativity', level: 90 },
        { name: 'Prioritization', level: 95 },
        { name: 'Enthusiasm', level: 95 }
    ]
};

// Populate Skills Section
function populateSkills() {
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        const technicalSkills = document.createElement('div');
        const nonTechnicalSkills = document.createElement('div');

        technicalSkills.className = 'card';
        nonTechnicalSkills.className = 'card';

        technicalSkills.innerHTML = `
            <h2 style="color: #25f52c;">Technical Skills</h2>
            <br>

        

            ${skills.technical.map(skill => `
                <div>
                    <p>${skill.name}</p>
                    <div class="skill-bar">
                        <div class="skill-progress" style="width: ${skill.level}%;"></div>
                    </div>
                </div>
            `).join('')}
        `;

        nonTechnicalSkills.innerHTML = `
            <h2 style="color: #25f52c;">Non-Tech Skills</h2>
            <br>
            ${skills.nonTechnical.map(skill => `
                <div>
                    <p>${skill.name}</p>
                    <div class="skill-bar">
                        <div class="skill-progress" style="width: ${skill.level}%;"></div>
                    </div>
                </div>
            `).join('')}
        `;

        skillsSection.appendChild(technicalSkills);
        skillsSection.appendChild(nonTechnicalSkills);
    }
}

// Initialize Skills
populateSkills();

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const statusDiv = document.getElementById('submitStatus');
        if (statusDiv) {
            statusDiv.textContent = 'Message sent successfully!';
            statusDiv.style.color = '#10B981';
        }
        this.reset();
    });
}
