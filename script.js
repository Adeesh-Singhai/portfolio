
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Trail effect parameters
const particles = [];
const particleCount = 7000;
const particleLife = 90;
let mouseX = 0;
let mouseY = 0;

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.life = particleLife;
        this.velocity = {
            x: (Math.random() - 0.5) * 3,
            y: (Math.random() - 0.5) * 2
        };
        this.size = Math.random() * 2.5 + 0.5;
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.life--;

        // Reduced random movement for smoother trails
        this.velocity.x += (Math.random() - 0.5) * 0.1;
        this.velocity.y += (Math.random() - 0.5) * 0.1;
    }

   


draw() {
const opacity = this.life / particleLife;
ctx.fillStyle = `rgba(2, 250, 233, ${opacity * 0.8})`;
ctx.beginPath();
const spikes = 5; // Number of star spikes
const outerRadius = this.size * 2;
const innerRadius = this.size;
const step = Math.PI / spikes;

for (let i = 0; i < Math.PI * 2; i += step) {
const x = this.x + Math.cos(i) * outerRadius;
const y = this.y + Math.sin(i) * outerRadius;
ctx.lineTo(x, y);

const innerX = this.x + Math.cos(i + step / 2) * innerRadius;
const innerY = this.y + Math.sin(i + step / 2) * innerRadius;
ctx.lineTo(innerX, innerY);
}
ctx.closePath();
ctx.fill();
}





}

// Update mouse position
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Add new particles
    for (let i = 0; i < 3; i++) {
        if (particles.length < particleCount) {
            particles.push(new Particle(mouseX, mouseY));
        }
    }
});

// Animation loop
function animate() {
    // Clear the entire canvas completely instead of using semi-transparent fill
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();

        // Remove dead particles
        if (particles[i].life <= 0) {
            particles.splice(i, 1);
        }
    }

    requestAnimationFrame(animate);
}

animate();





























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
