// Homework Submission Portal Controller
document.addEventListener('DOMContentLoaded', () => {
  initSubmissionPortal();
});

function initSubmissionPortal() {
  const form = document.getElementById('submission-form');
  const modal = document.getElementById('success-modal');
  const closeBtn = document.querySelector('.success-close');
  const printBtn = document.getElementById('print-receipt-btn');
  
  const studentNameInput = document.getElementById('sub-student-name');
  const studentClassInput = document.getElementById('sub-student-class');

  // Pre-fill student name and class from localStorage if present
  if (studentNameInput) {
    const savedName = localStorage.getItem('studentName') || 'Aarav Sharma';
    const savedClass = localStorage.getItem('studentClass') || 'IX';
    const savedSection = localStorage.getItem('studentSection') || 'A';
    
    studentNameInput.value = savedName;
    if (studentClassInput) {
      studentClassInput.value = `Class ${savedClass}-${savedSection}`;
    }
  }

  // Listen for student updates on other pages
  document.addEventListener('studentUpdated', (e) => {
    if (studentNameInput) {
      studentNameInput.value = e.detail.name;
      if (studentClassInput) {
        studentClassInput.value = `Class ${e.detail.class}-${e.detail.section}`;
      }
    }
  });

  if (!form || !modal) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect submission values
    const sName = studentNameInput ? studentNameInput.value : 'Student';
    const sClass = studentClassInput ? studentClassInput.value : 'Class IX-A';
    const sPartner = document.getElementById('sub-partner-name').value.trim() || 'Individual Submission';
    const sFile = document.getElementById('sub-file-upload').files[0];
    const sFileName = sFile ? sFile.name : 'sdg3_hydroponics_report.pdf';

    // Generate random transaction Receipt ID
    const receiptId = 'HW-SDG3-' + Math.floor(100000 + Math.random() * 900000);
    const currentDate = new Date().toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Write to receipt fields
    document.getElementById('receipt-id').textContent = receiptId;
    document.getElementById('receipt-student').textContent = sName;
    document.getElementById('receipt-class').textContent = sClass;
    document.getElementById('receipt-partner').textContent = sPartner;
    document.getElementById('receipt-filename').textContent = sFileName;
    document.getElementById('receipt-date').textContent = currentDate;

    // Show success modal
    modal.classList.add('active');

    // Reset form
    form.reset();
    
    // Re-fill student details
    if (studentNameInput) {
      const savedName = localStorage.getItem('studentName') || 'Aarav Sharma';
      const savedClass = localStorage.getItem('studentClass') || 'IX';
      const savedSection = localStorage.getItem('studentSection') || 'A';
      studentNameInput.value = savedName;
      if (studentClassInput) {
        studentClassInput.value = `Class ${savedClass}-${savedSection}`;
      }
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  // Print function
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      const receiptContent = document.getElementById('printable-receipt').innerHTML;
      const originalBody = document.body.innerHTML;

      // Simple print window layout
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>Holiday Homework Receipt</title>
            <style>
              body { font-family: 'Segoe UI', Roboto, sans-serif; padding: 40px; color: #1f2937; line-height: 1.5; }
              .receipt-box { border: 2px solid #10b981; border-radius: 12px; padding: 30px; max-width: 500px; margin: 0 auto; background: #fafaf9; }
              h2 { color: #10b981; margin-bottom: 5px; }
              .divider { height: 1px; background: #e5e7eb; margin: 20px 0; }
              .row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; }
              .label { font-weight: bold; color: #4b5563; }
              .val { text-align: right; color: #111827; }
              .success-tag { background: #d1fae5; color: #065f46; display: inline-block; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-top: 15px; }
              .center { text-align: center; }
            </style>
          </head>
          <body onload="window.print()">
            <div class="receipt-box">
              <div class="center">
                <h2>Submission Receipt</h2>
                <p style="margin: 0; color: #6b7280; font-size: 13px;">CBSE Winter/Summer Project Portal</p>
              </div>
              <div class="divider"></div>
              ${receiptContent}
              <div class="center">
                <div class="success-tag">SUBMISSION SECURELY ARCHIVED</div>
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
    });
  }
}
