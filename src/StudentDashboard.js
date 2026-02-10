import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import './App.css';

const SECRET_CODE = "Harshitha"; // ← Change this to your own secret code!

function StudentDashboard() {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [advice, setAdvice] = useState("");

  const handleAuth = (e) => {
    e.preventDefault();
    if (password === SECRET_CODE) {
      setIsAuthorized(true);
      localStorage.setItem("studentAuth", "true"); // Remember for session
    } else {
      alert("Incorrect code. Only authorized students can provide advice.");
    }
  };

  // Check if already authorized (from localStorage)
  useEffect(() => {
    if (localStorage.getItem("studentAuth") === "true") {
      setIsAuthorized(true);
    }
  }, []);

  // Load submissions only if authorized
  useEffect(() => {
    if (!isAuthorized) return;

    const q = query(collection(db, "plantSubmissions"), where("status", "==", "pending"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSubmissions(data);
    });
    return () => unsubscribe();
  }, [isAuthorized]);

  const handleSubmitAdvice = async () => {
    if (!advice.trim()) {
      alert("Please provide organic advice!");
      return;
    }
    try {
      await updateDoc(doc(db, "plantSubmissions", selected.id), {
        advice,
        status: "resolved",
        resolvedAt: serverTimestamp()
      });
      alert("Advice submitted successfully! 🌱");
      setSelected(null);
      setAdvice("");
    } catch (error) {
      alert("Error submitting advice. Try again.");
    }
  };

  if (!isAuthorized) {
    return (
      <div className="App-header" style={{ minHeight: '100vh', background: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', maxWidth: '500px', width: '90%' }}>
          <h2>Student Access Only</h2>
          <p>Enter the secret code to provide organic advice</p>
          <form onSubmit={handleAuth}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter code..."
              style={{ width: '100%', padding: '12px', margin: '15px 0', borderRadius: '8px', border: '1px solid #a5d6a7' }}
            />
            <button type="submit" className="upload-btn" style={{ width: '100%' }}>
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="App-header" style={{ minHeight: '100vh', background: '#e8f5e9' }}>
      <h1>🌿 Greenup Student Dashboard</h1>
      <p>Review pending plant issues and provide organic treatments</p>

      {submissions.length === 0 ? (
        <p>No pending cases right now. New submissions will appear automatically!</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', padding: '20px' }}>
          {submissions.map(sub => (
            <div key={sub.id} style={{ background: 'white', borderRadius: '12px', padding: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <img src={sub.photoURL} alt="Plant issue" style={{ width: '100%', borderRadius: '8px' }} />
              <p><strong>Description:</strong> {sub.description}</p>
              <p><small>Submitted: {sub.createdAt?.toDate().toLocaleString()}</small></p>
              <button onClick={() => { setSelected(sub); setAdvice(""); }} className="upload-btn">
                Review & Advise
              </button>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '16px', maxWidth: '90%', width: '600px' }}>
            <h2>Provide Organic Advice</h2>
            <img src={selected.photoURL} alt="Plant" style={{ width: '100%', borderRadius: '12px', margin: '10px 0' }} />
            <p><strong>User Issue:</strong> {selected.description}</p>
            <textarea
              placeholder="Write organic treatment advice (e.g., Use neem oil spray twice a week...)"
              rows="8"
              value={advice}
              onChange={(e) => setAdvice(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #a5d6a7' }}
            />
            <div style={{ marginTop: '20px' }}>
              <button onClick={handleSubmitAdvice} className="upload-btn">Submit Advice & Resolve</button>
              <button onClick={() => setSelected(null)} style={{ marginLeft: '10px', background: '#d32f2f', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;