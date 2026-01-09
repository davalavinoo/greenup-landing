import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import './App.css'; // Reuse styles

function StudentDashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [advice, setAdvice] = useState("");

  useEffect(() => {
    const q = query(collection(db, "plantSubmissions"), where("status", "==", "pending"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSubmissions(data);
    });
    return unsubscribe;
  }, []);

  const handleResolve = async () => {
    if (!advice.trim()) return alert("Please add advice!");
    await updateDoc(doc(db, "plantSubmissions", selected.id), {
      advice,
      status: "resolved",
      resolvedAt: new Date()
    });
    setSelected(null);
    setAdvice("");
    alert("Advice submitted! User will be notified soon.");
  };

  return (
    <div className="App-header" style={{ background: '#e8f5e9' }}>
      <h1>🌿 Student Dashboard - Pending Cases</h1>
      <p>Review plant issues and provide organic advice</p>

      {submissions.length === 0 ? (
        <p>No pending cases yet. Check back soon!</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          {submissions.map(sub => (
            <div key={sub.id} style={{ border: '2px solid #4caf50', borderRadius: '12px', padding: '15px', width: '300px', background: 'white' }}>
              <img src={sub.photoURL} alt="Plant issue" style={{ width: '100%', borderRadius: '8px' }} />
              <p><strong>Description:</strong> {sub.description}</p>
              <p><small>Submitted: {new Date(sub.createdAt?.seconds * 1000).toLocaleString()}</small></p>
              <button onClick={() => { setSelected(sub); setAdvice(""); }} className="upload-btn">
                Provide Advice
              </button>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 0 20px rgba(0,0,0,0.3)', maxWidth: '90%' }}>
          <h2>Case Details</h2>
          <img src={selected.photoURL} alt="Plant" style={{ maxWidth: '100%', borderRadius: '12px' }} />
          <p><strong>User Description:</strong> {selected.description}</p>
          <textarea
            placeholder="Provide organic treatment advice (e.g., Use neem oil spray...)"
            rows="8"
            value={advice}
            onChange={(e) => setAdvice(e.target.value)}
            style={{ width: '100%', padding: '12px', margin: '10px 0' }}
          />
          <button onClick={handleResolve} className="upload-btn">Submit Advice & Resolve</button>
          <button onClick={() => setSelected(null)} style={{ marginLeft: '10px', background: '#d32f2f' }}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;