// AI Project Cycle Interactive Timeline Controller
document.addEventListener('DOMContentLoaded', () => {
  initAiCycle();
});

const CYCLE_STEPS = {
  scoping: {
    title: '1. Problem Scoping',
    subtitle: 'Defining the Goal & SDG Alignment',
    desc: 'The starting point of any AI project. We identify a real-world problem, define the objectives, and align it with global goals like SDG 3.',
    application: '<strong>Project Goal:</strong> How can we automate the detection of nutrient deficiencies in hydroponic lettuce plants early, ensuring maximum yield of safe, healthy food?<br><br><strong>SDG 3 Alignment:</strong> By detecting deficiencies early, we prevent crop failure, maximize crop nutrition, and guarantee safe, pesticide-free fresh food output for families.',
    icon: '🎯'
  },
  acquisition: {
    title: '2. Data Acquisition',
    subtitle: 'Gathering Datasets & Photos',
    desc: 'AI models learn from data. In this stage, we collect representative images, readings, or records required to train our classification model.',
    application: 'We gather a dataset of <strong>1,200 high-resolution photos</strong> of lettuce leaves under various conditions:<br>• 300 Healthy leaves<br>• 300 Nitrogen-deficient leaves (yellowing)<br>• 300 Potassium-deficient leaves (burnt brown edges)<br>• 300 Iron-deficient leaves (interveinal chlorosis).',
    icon: '📸'
  },
  exploration: {
    title: '3. Data Exploration',
    subtitle: 'Cleaning & Visualizing the Data',
    desc: 'Understanding the collected data. We crop out backgrounds, equalize lighting, balance the numbers of images, and spot patterns or issues in our dataset.',
    application: 'We use data tools to inspect the leaf dataset:<br>• We crop images to focus strictly on the leaf structure.<br>• We resize all photos to a standard size (224x224 pixels) for training compatibility.<br>• We check if we have enough variety in light exposure so the AI remains accurate under both natural sunlight and pink LED grow lights.',
    icon: '📊'
  },
  modelling: {
    title: '4. AI Modelling',
    subtitle: 'Training the Neural Network',
    desc: 'Selecting an AI algorithm and feed it the exploration-ready data. The algorithm learns to recognize color, texture, and shapes associated with healthy vs. deficient crops.',
    application: 'We implement a <strong>Convolutional Neural Network (CNN)</strong> model. We train the CNN model by feeding it our labeled crop photos. The model adjusts its internal weights over multiple iterations (epochs) until it can distinguish leaf veins from yellow spots with high accuracy.',
    icon: '🤖'
  },
  evaluation: {
    title: '5. Evaluation',
    subtitle: 'Testing Accuracy & Performance',
    desc: 'Testing the trained model on completely new, unseen photos. This ensures the AI model can generalize and doesn\'t just memorize the training dataset.',
    application: 'We evaluate the model using a separate set of 300 test images. We calculate the <strong>Accuracy Score (94.2%)</strong> and check for False Positives. If the model misclassifies healthy leaves as deficient, we return to the Data Acquisition or Modelling stage to refine the neural network.',
    icon: '🏆'
  }
};

function initAiCycle() {
  const steps = document.querySelectorAll('.cycle-step-tab');
  const stepIcon = document.getElementById('step-detail-icon');
  const stepTitle = document.getElementById('step-detail-title');
  const stepSubtitle = document.getElementById('step-detail-subtitle');
  const stepDesc = document.getElementById('step-detail-desc');
  const stepApp = document.getElementById('step-detail-app');

  if (!stepTitle || !stepDesc || steps.length === 0) return;

  steps.forEach(step => {
    step.addEventListener('click', () => {
      // Remove active class from all step buttons
      steps.forEach(s => s.classList.remove('active'));
      
      // Add active to clicked button
      step.classList.add('active');
      
      // Get the step key (from data attribute)
      const stepKey = step.getAttribute('data-step');
      const data = CYCLE_STEPS[stepKey];
      
      if (!data) return;

      // Apply fade transition effect
      const detailContainer = document.getElementById('step-detail-container');
      if (detailContainer) {
        detailContainer.style.opacity = '0';
        detailContainer.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
          // Update contents
          stepIcon.textContent = data.icon;
          stepTitle.textContent = data.title;
          stepSubtitle.textContent = data.subtitle;
          stepDesc.textContent = data.desc;
          stepApp.innerHTML = data.application;
          
          detailContainer.style.opacity = '1';
          detailContainer.style.transform = 'translateY(0)';
        }, 200);
      }
    });
  });
}
