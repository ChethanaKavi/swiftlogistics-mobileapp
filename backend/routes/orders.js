// backend/routes/orders.js
const express = require('express');
const router = express.Router();
const { db, bucket } = require('../firebaseAdmin');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uploadDir = path.join(__dirname, '../img');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${req.params.id}_${Date.now()}_${file.originalname}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });
const admin = require('firebase-admin');

// Get all orders
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('orders').get();
    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const doc = await db.collection('orders').doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ message: 'Order not found' });
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

// Upload proof document and update order
router.post('/:id/proof', upload.single('proof'), async (req, res) => {
  try {
    const orderId = req.params.id;
    const { driverId, driverName } = req.body;
    console.log('Received proof upload:', {
      file: req.file,
      body: req.body,
      orderId,
    });
    if (!req.file) {
      console.error('No file uploaded');
      return res.status(400).json({ message: 'No file uploaded' });
    }
    if (!driverId || !driverName) {
      console.error('Driver info missing', req.body);
      return res.status(400).json({ message: 'Driver info required' });
    }

    // Save file path to Firestore (relative path)
    const relativePath = `img/${req.file.filename}`;
    const deliveredAt = admin.firestore.Timestamp.now();
    await db.collection('orders').doc(orderId).update({
      status: 'delivered',
      driverId,
      driverName,
      deliveredAt,
      proofUrl: relativePath,
    });
    console.log('Order updated:', orderId, { driverId, driverName, deliveredAt, proofUrl: relativePath });
    res.json({ message: 'Proof uploaded and order updated', proofUrl: relativePath });
  } catch (error) {
    console.error('Error in proof upload:', error);
    res.status(500).json({ message: error.message });
  }
});
