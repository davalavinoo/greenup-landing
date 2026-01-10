import React from 'react';

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#2e7d32',
      color: 'white',
      textAlign: 'center',
      padding: '20px 10px',
      marginTop: 'auto',
      fontSize: '0.9rem',
      borderTop: '4px solid #4caf50'
    }}>
      <p>
        Developed and maintained by <strong>St. Ann's Incubation Foundation (SAIF)</strong>, 
        St. Ann's Degree College for Women, Mehdipatnam, Hyderabad.
      </p>
      <p style={{ marginTop: '8px', fontSize: '0.85rem' }}>
        Presentation by: Ashwala Harshitha
      </p>
    </footer>
  );
}

export default Footer;