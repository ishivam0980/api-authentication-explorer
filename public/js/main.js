// Main JavaScript file for API Authentication Explorer

// Handle endpoint loading with animation
function loadEndpoint(endpoint) {
  // Show loading spinner
  document.querySelector('.loading').style.display = 'flex';
  
  // Highlight active button
  document.querySelectorAll('.auth-button').forEach(btn => {
    btn.style.opacity = '0.7';
  });
  
  // Set a timeout to simulate loading for local requests that are too fast
  setTimeout(() => {
    window.location.href = endpoint;
  }, 300);
}

// Initialize page elements and animations
document.addEventListener('DOMContentLoaded', () => {
  // Highlight the active button based on current URL
  const currentPath = window.location.pathname;
  const buttonId = currentPath.replace('/', '') || 'home';
  
  const activeButton = document.getElementById(buttonId);
  if (activeButton) {
    activeButton.style.transform = 'scale(1.05)';
    activeButton.style.opacity = '1';
  }
  
  // Add animation to response area
  const responseArea = document.querySelector('.response-area');
  responseArea.style.opacity = '0';
  setTimeout(() => {
    responseArea.style.transition = 'opacity 0.5s ease';
    responseArea.style.opacity = '1';
  }, 100);

  // Add hover effect to info cards
  const infoCards = document.querySelectorAll('.info-card');
  infoCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('i');
      icon.style.transform = 'scale(1.2)';
      icon.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
      const icon = card.querySelector('i');
      icon.style.transform = 'scale(1)';
    });
  });

  // Format JSON response for better readability
  const responseContent = document.querySelector('.response-area pre');
  try {
    const content = responseContent.textContent;
    // Check if content is valid JSON
    JSON.parse(content);
    
    // Add syntax highlighting classes
    const formattedContent = content
      .replace(/"([^"]+)":/g, '<span class="json-key">"$1":</span>')
      .replace(/: "([^"]+)"/g, ': <span class="json-string">"$1"</span>')
      .replace(/: (\d+)/g, ': <span class="json-number">$1</span>')
      .replace(/: (true|false|null)/g, ': <span class="json-boolean">$1</span>');
    
    responseContent.innerHTML = formattedContent;
  } catch (e) {
    // Not valid JSON, leave as is
    console.log('Response is not valid JSON');
  }
}); 