// Chart.js initialization for Student Work Page
document.addEventListener('DOMContentLoaded', () => {
  initGrowthChart();
});

function initGrowthChart() {
  const ctx = document.getElementById('growthChart');
  if (!ctx) return;

  // Set chart font options based on current style
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#cbd5e1' : '#475569';
  const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)';

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30'],
      datasets: [
        {
          label: 'AI-Optimized Hydroponics (NFT)',
          data: [2.0, 5.5, 11.2, 18.0, 24.5, 30.1, 35.8],
          borderColor: '#10b981', // Emerald green
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderWidth: 3,
          tension: 0.3,
          fill: true,
          pointBackgroundColor: '#10b981',
          pointRadius: 5,
          pointHoverRadius: 7
        },
        {
          label: 'Traditional Soil Farming',
          data: [2.0, 3.8, 7.1, 11.5, 14.8, 17.5, 20.2],
          borderColor: '#8b5cf6', // Purple
          backgroundColor: 'rgba(139, 92, 246, 0.05)',
          borderWidth: 2,
          tension: 0.3,
          fill: true,
          pointBackgroundColor: '#8b5cf6',
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: textColor,
            font: {
              family: 'Outfit',
              size: 13,
              weight: '500'
            }
          }
        },
        tooltip: {
          backgroundColor: isDark ? '#1e293b' : '#ffffff',
          titleColor: isDark ? '#f8fafc' : '#0f172a',
          bodyColor: isDark ? '#cbd5e1' : '#475569',
          borderColor: 'rgba(16, 185, 129, 0.2)',
          borderWidth: 1,
          titleFont: { family: 'Outfit', weight: '600' },
          bodyFont: { family: 'Outfit' }
        }
      },
      scales: {
        x: {
          grid: {
            color: gridColor
          },
          ticks: {
            color: textColor,
            font: { family: 'Outfit' }
          },
          title: {
            display: true,
            text: 'Experimental Timeline',
            color: textColor,
            font: { family: 'Outfit', weight: '600' }
          }
        },
        y: {
          grid: {
            color: gridColor
          },
          ticks: {
            color: textColor,
            font: { family: 'Outfit' }
          },
          title: {
            display: true,
            text: 'Average Plant Height (cm)',
            color: textColor,
            font: { family: 'Outfit', weight: '600' }
          }
        }
      }
    }
  });

  // Listen for theme changes to dynamically update chart styling
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      setTimeout(() => {
        const isDarkNow = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTextColor = isDarkNow ? '#cbd5e1' : '#475569';
        const newGridColor = isDarkNow ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)';
        
        chart.options.plugins.legend.labels.color = newTextColor;
        chart.options.scales.x.grid.color = newGridColor;
        chart.options.scales.x.ticks.color = newTextColor;
        chart.options.scales.x.title.color = newTextColor;
        chart.options.scales.y.grid.color = newGridColor;
        chart.options.scales.y.ticks.color = newTextColor;
        chart.options.scales.y.title.color = newTextColor;
        
        chart.update();
      }, 50);
    });
  }
}
