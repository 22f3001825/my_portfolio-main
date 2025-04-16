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

// Download PDF function
function downloadPDF() {
  // Show processing notification
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = 'Creating PDF...';
  document.body.appendChild(notification);
  
  // Hide buttons temporarily
  document.querySelector('.control-buttons').style.display = 'none';
  
  // Wait for notification to appear
  setTimeout(() => {
  
    html2canvas(document.getElementById('resume'), {
      scale: 4,
      useCORS: true,
      logging: false,
      allowTaint: true,
      backgroundColor: '#ffffff',
      imageTimeout: 15000, 
      letterRendering: true, 
      removeContainer: true 
    }).then(canvas => {
      const { jsPDF } = window.jspdf;
      
      // A4 size
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Canvas dimensions
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      
      // A4 dimensions in mm
      const pdfWidth = 210;
      const pdfHeight = 297;
      
      // Calculate proper scaling
      const ratio = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight);
      const imgWidth = canvasWidth * ratio;
      const imgHeight = canvasHeight * ratio;
      
      // Center on page
      const x = (pdfWidth - imgWidth) / 2;
      const y = 0;
      
      // Add image to PDF with higher quality
      const imgData = canvas.toDataURL('image/png', 1.0); // Max quality
      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight, undefined, 'FAST');
      
      // Set PDF properties for better identification
      pdf.setProperties({
        title: 'Ali Jawad Resume',
        subject: 'Professional Resume',
        creator: 'Resume Generator',
        author: 'Ali Jawad',
        keywords: 'resume, cv, professional'
      });
      
      // Save PDF
      pdf.save('ali-jawad-resume-hd.pdf');
      
      // Show success notification
      notification.textContent = 'PDF downloaded successfully!';
      
      // Restore buttons
      document.querySelector('.control-buttons').style.display = 'flex';
      
      // Remove notification after 2 seconds
      setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 500);
      }, 2000);
    }).catch(error => {
      console.error('PDF generation failed:', error);
      
      // Show error notification
      notification.textContent = 'PDF generation failed. Please try again.';
      notification.style.backgroundColor = '#ef4444';
      
      // Restore buttons
      document.querySelector('.control-buttons').style.display = 'flex';
      
      // Remove notification after 3 seconds
      setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 500);
      }, 3000);
    });
  }, 100);
}

// Add padding to ensure content fits on one page
document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.resume-container');
  // Check for mobile device
  if (window.innerWidth <= 768) {
    // Apply mobile-specific adjustments
    document.body.classList.add('mobile-view');
  }
});