const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/agrowcrop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/crops', require('./backend/routes/cropRoutes'));
app.use('/api/regions', require('./backend/routes/regionRoutes'));
app.use('/api/recommendations', require('./backend/routes/recommendationRoutes'));
app.use('/api/calendar', require('./backend/routes/calendarRoutes'));
app.use('/api/faq', require('./backend/routes/faqRoutes'));
app.use('/api/crop-data', require('./backend/routes/cropDataRoutes'));
app.use('/api/market-prices', require('./backend/routes/marketPriceRoutes'));

// Dev Mode OTP Storage (in-memory)
let devOTP = null;
let devOTPPhone = null;

// Dev OTP endpoint for synchronized OTP between browser and PowerShell
app.get('/dev-otp/generate', (req, res) => {
  const phone = req.query.phone || '0000000000';
  devOTP = Math.floor(100000 + Math.random() * 900000).toString();
  devOTPPhone = phone;
  console.log(`[DEV OTP] Generated: ${devOTP} for phone: ${phone}`);
  res.json({ otp: devOTP, phone: devOTPPhone, message: 'Dev OTP generated' });
});

app.get('/dev-otp/verify', (req, res) => {
  const { phone, otp } = req.query;
  if (otp === devOTP && phone === devOTPPhone) {
    res.json({ valid: true, token: 'dev_token_' + Date.now(), role: 'ROLE_FARMER' });
  } else {
    res.json({ valid: false, message: 'Invalid OTP' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AgrowCrop API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

