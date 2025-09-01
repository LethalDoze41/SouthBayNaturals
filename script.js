document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
                });
            }
        });
    }, { rootMargin: "-50% 0px -50% 0px" });

    sections.forEach(section => {
        observer.observe(section);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            sections.forEach(section => {
                section.classList.add('hidden');
            });
            
            if (targetSection) {
                targetSection.classList.remove('hidden');
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Initial setup to show the first section
    sections.forEach((section, index) => {
        if (index !== 0) {
            section.classList.add('hidden');
        } else {
            section.classList.remove('hidden');
        }
    });

    // Tab functionality for Consumer Insights
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            tabContents.forEach(content => {
                content.classList.toggle('hidden', content.id !== tabId);
            });
        });
    });


    // Chart.js implementation
    const marketData = {
        labels: ['Global', 'North America', 'United States'],
        datasets: [
            {
                label: '2024 Market Value (USD B)',
                data: [149.75, 69.54, 48.68],
                backgroundColor: '#A7C7C1', // Muted Seafoam
                borderColor: '#2F6B60',
                borderWidth: 1,
                borderRadius: 4,
            },
            {
                label: 'Projected Market Value (USD B)',
                data: [248.51, null, 93.07], // North America projection not given
                backgroundColor: '#F3A68B', // Subtle Peach
                borderColor: '#D98263',
                borderWidth: 1,
                borderRadius: 4,
            }
        ]
    };

    const chartCtx = document.getElementById('marketGrowthChart').getContext('2d');
    const marketGrowthChart = new Chart(chartCtx, {
        type: 'bar',
        data: marketData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += '$' + context.parsed.y + 'B';
                            }
                            const projectionYear = context.label === 'Global' ? '2030' : '2034';
                            if(context.dataset.label.includes('Projected')) {
                                label += ` (by ${projectionYear})`;
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Value in USD Billions'
                    }
                }
            }
        }
    });
});
