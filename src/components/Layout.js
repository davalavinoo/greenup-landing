import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
  {/* Home Button */}
  <Link 
    to="/" 
    style={{
      position: 'fixed',
      top: '15px',
      left: '15px',
      backgroundColor: '#4caf50',
      color: 'white',
      padding: '10px 18px',
      borderRadius: '50px',
      textDecoration: 'none',
      fontWeight: 'bold',
      boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
      zIndex: 1000,
      fontSize: '0.95rem'  // Smaller on mobile
    }}
  >
    🏠 Home
  </Link>

  <main style={{ flex: 1, padding: '70px 15px 15px' }}>  {/* Space for button */}
    {children}
  </main>

  <Footer />
</div>
  );
}

export default Layout;