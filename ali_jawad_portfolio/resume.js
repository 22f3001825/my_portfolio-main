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
    
    // Copy resume link function
    function copyResumeLink() {
      // Create a temporary input for copying
      const tempInput = document.createElement('input');
      tempInput.value = window.location.href;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      
      // Show a temporary notification
      const notification = document.createElement('div');
      notification.className = 'copy-notification';
      notification.textContent = 'Resume link copied to clipboard!';
      document.body.appendChild(notification);
      
      // Remove notification after 2 seconds
      setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 500);
      }, 2000);
    }
    
    // Add padding to ensure content fits on one page
    document.addEventListener('DOMContentLoaded', function() {
      const container = document.querySelector('.resume-container');
      const windowHeight = window.innerHeight;
      if (container.offsetHeight > windowHeight) {
     
        document.documentElement.style.setProperty('--font-adjustment', '0.95');
      }
    });
