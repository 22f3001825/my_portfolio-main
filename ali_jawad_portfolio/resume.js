// Print function
function triggerPrint() {
  // Prepare the page for printing
  document.querySelector('.control-buttons').style.display = 'none';
  
  // Wait a moment for styles to apply
  setTimeout(() => {
    window.print();
    
    // Restore the buttons after printing
    setTimeout(() => {
      document.querySelector('.control-buttons').style.display = 'flex';
    }, 500);
  }, 100);
}

// Add padding to ensure content fits on one page
document.addEventListener('DOMContentLoaded', function() {
  // Check for mobile device
  if (window.innerWidth <= 768) {
    // Apply mobile-specific adjustments
    document.body.classList.add('mobile-view');
  }
});