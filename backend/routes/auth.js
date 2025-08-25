// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const { auth, db } = require('../firebaseAdmin');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Register
router.post('/register', async (req, res) => {
  const { fullName, email, password, accountType } = req.body;
  if (!fullName || !email || !password || !accountType) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    // Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: fullName,
    });
    // Store additional user info in Firestore
    await db.collection('users').doc(userRecord.uid).set({
      fullName,
      email,
      accountType,
      uid: userRecord.uid,
      createdAt: new Date(),
    });
    res.json({ message: 'Registration successful' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  try {
    // Firebase Admin SDK does not support password login directly
    // Use Firebase Auth REST API for signInWithPassword
    const apiKey = process.env.FIREBASE_API_KEY || 'AIzaSyAbblA_9kmaX4-TFMG4KOwrt4NP2kiL_4I';
    const resp = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, returnSecureToken: true })
      });
    const data = await resp.json();
    if (data.error) {
      return res.status(401).json({ message: data.error.message });
    }
    res.json({ token: data.idToken, refreshToken: data.refreshToken, uid: data.localId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
