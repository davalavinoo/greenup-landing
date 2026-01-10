import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Floating Home Button */}
      <Link 
        to="/" 
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          backgroundColor: '#4caf50',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '50px',
          textDecoration: 'none',
          fontWeight: 'bold',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          zIndex: 1000
        }}
      >
        🏠 Home
      </Link>

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        {children}
      </main>

      {/* Footer at bottom */}
      <Footer />
    </div>
  );
}

export default Layout;