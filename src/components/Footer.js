import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase"; // adjust path if needed

function Footer() {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const visitorRef = doc(db, "stats", "visitors");

    const unsubscribe = onSnapshot(visitorRef, (docSnap) => {
      if (docSnap.exists()) {
        setVisitorCount(docSnap.data().count || 0);
      }
    });

    return unsubscribe;
  }, []);

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
      <p style={{ marginTop: '12px', fontWeight: 'bold' }}>
        Visitors so far: {visitorCount.toLocaleString()} 🌱
      </p>
    </footer>
  );
}

export default Footer;