// Mock AI Leaf Disease Detector Controller
document.addEventListener('DOMContentLoaded', () => {
  initLeafDetector();
});

const LEAF_DATASETS = {
  healthy: {
    name: 'Healthy Butterhead Lettuce',
    status: 'OPTIMAL HEALTH',
    statusClass: 'status-success',
    confidence: '98.6%',
    analysis: 'Spectroscopic convolution indicates healthy chloroplast concentrations and uniform cell wall hydration. No visual chlorosis or necrosis present.',
    recs: 'Maintain reservoir parameters: pH: 5.8 – 6.2, EC: 1.4 – 1.8 mS/cm. Keep air circulation fans running to ensure optimal transpiration rates.'
  },
  nitrogen: {
    name: 'Nitrogen Deficiency (Chlorosis)',
    status: 'DEFICIENCY ALERT',
    statusClass: 'status-warning',
    confidence: '95.3%',
    analysis: 'Severe loss of green pigment (chlorophyll) detected uniformly across older leaves. Veins remain lightly colored but overall leaf shows light green/yellow fade.',
    recs: 'Boost Nitrogen content in reservoir. Inject Calcium Nitrate [Ca(NO3)2] or standard 3-1-2 ratio hydroponic liquid feed to restore amino acid synthesis.'
  },
  mold: {
    name: 'Fungal Leaf Spot (Cercospora)',
    status: 'PATHOGEN INFECTION',
    statusClass: 'status-danger',
    confidence: '89.4%',
    analysis: 'Multiple circular brown spots with dark margins identified on leaf surfaces. Pattern matching aligns with fungal leaf spot spore structures.',
    recs: 'Quarantine infected plant cups immediately. Apply organic copper-based fungicide or neem spray. Increase ventilation system speed to reduce humidity below 65%.'
  },
  uploaded: {
    name: 'Custom Leaf Image Analysed',
    status: 'HEALTHY - SOIL-LESS SAFE',
    statusClass: 'status-success',
    confidence: '91.2%',
    analysis: 'Image analysis shows strong green leaf reflectivity and regular leaf outline. No standard leaf mold patterns detected.',
    recs: 'Perfect for hydroponic grow channels. Monitor daily to catch early micro-nutrient shifts.'
  }
};

function initLeafDetector() {
  const sampleBtns = document.querySelectorAll('.leaf-sample');
  const fileInput = document.getElementById('leaf-upload');
  const previewImg = document.getElementById('detector-preview');
  const diagnoseBtn = document.getElementById('diagnose-btn');
  
  const resultsBox = document.getElementById('detector-results');
  const resultsContent = document.getElementById('results-content');
  const progressContainer = document.getElementById('detector-progress-container');
  const progressBar = document.getElementById('detector-progress-bar');
  const progressText = document.getElementById('detector-progress-text');

  let currentSource = 'healthy';

  if (!diagnoseBtn || !previewImg) return;

  // Handle sample selection
  sampleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active states
      sampleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Clear file input
      if (fileInput) fileInput.value = '';

      // Update state & preview image source
      currentSource = btn.getAttribute('data-sample');
      
      // We will map this to mock leaf photos or simple SVGs.
      // To keep it simple and visual, let's use high quality SVGs represented as base64 or inline,
      // or we can use styled divs. For a robust look, let's update preview source to styled SVG templates.
      if (currentSource === 'healthy') {
        previewImg.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23d1fae5"/><path d="M50 15 C30 35 30 65 50 85 C70 65 70 35 50 15 Z" fill="%2310b981"/><path d="M50 15 L50 85 M50 35 L35 45 M50 50 L35 60 M50 65 L35 75 M50 35 L65 45 M50 50 L65 60 M50 65 L65 75" stroke="%23047857" stroke-width="2" fill="none"/></svg>';
      } else if (currentSource === 'nitrogen') {
        previewImg.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23fef3c7"/><path d="M50 15 C30 35 30 65 50 85 C70 65 70 35 50 15 Z" fill="%23fbbf24"/><path d="M50 15 L50 85 M50 35 L35 45 M50 50 L35 60 M50 65 L35 75 M50 35 L65 45 M50 50 L65 60 M50 65 L65 75" stroke="%23b45309" stroke-width="2" fill="none"/></svg>';
      } else if (currentSource === 'mold') {
        previewImg.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23fee2e2"/><path d="M50 15 C30 35 30 65 50 85 C70 65 70 35 50 15 Z" fill="%23ef4444"/><path d="M50 15 L50 85 M50 35 L35 45 M50 50 L35 60 M50 65 L35 75 M50 35 L65 45 M50 50 L65 60 M50 65 L65 75" stroke="%23991b1b" stroke-width="2" fill="none"/><circle cx="42" cy="40" r="3.5" fill="%237f1d1d"/><circle cx="58" cy="55" r="4" fill="%237f1d1d"/><circle cx="45" cy="65" r="3" fill="%237f1d1d"/></svg>';
      }
      
      resetResults();
    });
  });

  // Handle image upload
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // Deselect samples
      sampleBtns.forEach(b => b.classList.remove('active'));

      const reader = new FileReader();
      reader.onload = (event) => {
        previewImg.src = event.target.result;
        currentSource = 'uploaded';
        resetResults();
      };
      reader.readAsDataURL(file);
    });
  }

  // Handle diagnostic action
  diagnoseBtn.addEventListener('click', () => {
    // Show progress bar, hide result content
    resultsBox.style.display = 'block';
    resultsContent.style.display = 'none';
    progressContainer.style.display = 'block';
    progressBar.style.width = '0%';
    
    const loadingPhases = [
      { progress: 20, text: 'Preprocessing image grid...' },
      { progress: 50, text: 'Convolving spatial feature maps (CNN layer 1-3)...' },
      { progress: 85, text: 'Predicting class probability arrays...' },
      { progress: 100, text: 'Diagnostic cycle complete.' }
    ];

    let phaseIndex = 0;

    function runPhase() {
      if (phaseIndex < loadingPhases.length) {
        const phase = loadingPhases[phaseIndex];
        progressBar.style.width = `${phase.progress}%`;
        progressText.textContent = phase.text;
        phaseIndex++;
        setTimeout(runPhase, 400); // 400ms per phase
      } else {
        // Complete! Show results
        progressContainer.style.display = 'none';
        displayResults(currentSource);
      }
    }

    runPhase();
  });

  function resetResults() {
    resultsBox.style.display = 'none';
    resultsContent.style.display = 'none';
    progressContainer.style.display = 'none';
  }

  function displayResults(source) {
    const data = LEAF_DATASETS[source] || LEAF_DATASETS.healthy;
    
    resultsContent.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem;">
        <div>
          <h4 style="font-size: 1.3rem; margin-bottom: 0.25rem;">${data.name}</h4>
          <span class="status-badge ${data.statusClass}">${data.status}</span>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 1.6rem; font-weight: 800; color: var(--primary);">${data.confidence}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">CONFIDENCE SCORE</div>
        </div>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h5 style="font-size: 0.9rem; font-weight: 700; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-primary);">Neural Network Diagnostic Interpretation</h5>
        <p style="font-size: 0.95rem; margin-bottom: 0; color: var(--text-secondary);">${data.analysis}</p>
      </div>

      <div style="background: var(--bg-primary); border-radius: 8px; padding: 1.25rem; border-left: 3px solid var(--accent);">
        <h5 style="font-size: 0.9rem; font-weight: 700; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent);">Action Recommendation (SDG 3 Guided)</h5>
        <p style="font-size: 0.95rem; margin-bottom: 0; color: var(--text-secondary);">${data.recs}</p>
      </div>
    `;
    
    resultsContent.style.display = 'block';
  }
}
