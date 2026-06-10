// Interactive Hydroponics Diagram Controller
document.addEventListener('DOMContentLoaded', () => {
  initInteractiveDiagram();
});

const SYSTEM_COMPONENTS = {
  reservoir: {
    title: 'Nutrient Reservoir',
    desc: 'The storage tank at the bottom of the setup. It contains water dissolved with essential macro and micro-nutrients (Nitrogen, Phosphorus, Potassium, Calcium, etc.) that the plants need to thrive. Kept cool and dark to prevent algae growth.'
  },
  pump: {
    title: 'Submersible Water Pump',
    desc: 'An electric pump submersed in the reservoir. It is connected to a timer or runs continuously, pumping the nutrient solution up through the feed line to the elevated end of the growth channels.'
  },
  feedpipe: {
    title: 'Nutrient Feed Line',
    desc: 'A narrow distribution tube that carries the nutrient water upwards from the pump and delivers it directly to the head of the plant growth channels.'
  },
  channels: {
    title: 'Growth Channels (Gullies)',
    desc: 'Slanted white PVC gully channels where the plants sit. The gentle slope (usually 1:30 or 1:40 ratio) allows gravity to pull the nutrient solution slowly downward, bathing the roots in a thin film of water.'
  },
  plants: {
    title: 'Plant Roots & Net Cups',
    desc: 'Plants sit in plastic net cups filled with an inert substrate (like clay pebbles). The roots hang down directly into the channel, absorbing nutrients and oxygen from the shallow flowing film of water.'
  },
  drainpipe: {
    title: 'Drain / Return Pipe',
    desc: 'Located at the lower end of the growing channels. Excess nutrient solution that has run down the length of the channels falls into the return pipe, flowing back into the reservoir by gravity, creating a closed-loop system.'
  },
  airstone: {
    title: 'Air Pump & Air Stone',
    desc: 'Pumps fresh air into the nutrient reservoir through a porous stone, creating tiny bubbles. This oxygenates the water, preventing root rot (pythium) and helping roots absorb nutrients efficiently.'
  }
};

function initInteractiveDiagram() {
  const infoTitle = document.getElementById('diagram-component-title');
  const infoDesc = document.getElementById('diagram-component-desc');
  
  if (!infoTitle || !infoDesc) return;

  // Add event listeners to SVG elements
  const componentIds = Object.keys(SYSTEM_COMPONENTS);
  
  componentIds.forEach(id => {
    const element = document.getElementById(`svg-${id}`);
    if (!element) return;

    // Set cursor to pointer to show interactivity
    element.style.cursor = 'pointer';
    
    // Hover / Touch interaction
    element.addEventListener('mouseenter', () => {
      highlightComponent(id);
    });
    
    element.addEventListener('mouseleave', () => {
      resetHighlights();
    });

    element.addEventListener('click', () => {
      showComponentDetails(id);
    });
  });

  // Function to highlight a component
  function highlightComponent(id) {
    // Reset all elements first
    componentIds.forEach(cid => {
      const el = document.getElementById(`svg-${cid}`);
      if (el) el.classList.remove('svg-highlighted');
    });

    // Highlight hovered
    const el = document.getElementById(`svg-${id}`);
    if (el) el.classList.add('svg-highlighted');
    
    // Dynamically update side panel
    infoTitle.textContent = SYSTEM_COMPONENTS[id].title;
    infoDesc.textContent = SYSTEM_COMPONENTS[id].desc;
    
    // Visual indicator on the panel
    const infoPanel = document.getElementById('diagram-info-panel');
    if (infoPanel) {
      infoPanel.style.borderColor = 'var(--primary)';
      infoPanel.style.boxShadow = 'var(--shadow-lg)';
    }
  }

  // Function to show details persistently on click
  function showComponentDetails(id) {
    highlightComponent(id);
  }

  // Function to reset when mouse leaves
  function resetHighlights() {
    // We don't clear the text immediately so the user can still read the last hovered item.
    // We just remove the glowing SVG border
    componentIds.forEach(cid => {
      const el = document.getElementById(`svg-${cid}`);
      if (el) el.classList.remove('svg-highlighted');
    });
    
    const infoPanel = document.getElementById('diagram-info-panel');
    if (infoPanel) {
      infoPanel.style.borderColor = 'var(--card-border)';
      infoPanel.style.boxShadow = 'var(--shadow-md)';
    }
  }
}
