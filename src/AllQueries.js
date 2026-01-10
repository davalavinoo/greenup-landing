import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";
import './App.css';

function AllQueries() {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "plantSubmissions"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQueries(data);
    });
    return unsubscribe;
  }, []);

  return (
    <div className="App-header" style={{ minHeight: '100vh', background: '#e8f5e9' }}>
      <h1>🌿 Community Plant Queries</h1>
      <p>See all submitted plant issues and organic advice from students</p>

      {queries.length === 0 ? (
        <p>No queries yet. Be the first to submit one!</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px', padding: '20px' }}>
          {queries.map(q => (
            <div key={q.id} style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 6px 16px rgba(0,0,0,0.1)' }}>
              <img src={q.photoURL} alt="Plant issue" style={{ width: '100%', borderRadius: '12px', marginBottom: '10px' }} />
              <p><strong>Description:</strong> {q.description}</p>
              <p><strong>Status:</strong> {q.status === "pending" ? "Pending student review" : "Resolved 🌱"}</p>
              {q.advice && (
                <div style={{ marginTop: '15px', padding: '15px', background: '#f1f8e9', borderRadius: '10px', borderLeft: '4px solid #4caf50' }}>
                  <strong>Organic Advice:</strong>
                  <p style={{ margin: '8px 0 0' }}>{q.advice}</p>
                </div>
              )}
              <p><small>Submitted: {q.createdAt?.toDate().toLocaleString()}</small></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllQueries;