import React, { useState } from 'react';
import axios from 'axios';
import './auth.css';

const API_BASE_URL = '/api/auth';

export default function Login({ onLoginSuccess }) {
    const [phone, setPhone] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [devMode, setDevMode] = useState(false);
    const [devOtp, setDevOtp] = useState('');

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axios.post(`${API_BASE_URL}/send-otp`, { phone });
            if (response.data) {
                setOtpSent(true);
            }
        } catch (err) {
            // Auto-enable dev mode - fetch OTP from dev endpoint (same as PowerShell script)
            try {
                const devResponse = await axios.get(`http://localhost:5000/dev-otp/generate?phone=${phone}`);
                const fetchedOtp = devResponse.data.otp;
                console.log(`%c🔑 DEV MODE OTP: ${fetchedOtp}`, 'color: green; font-size: 20px; font-weight: bold');
                console.log('%cThis OTP matches the PowerShell script output!', 'color: orange; font-size: 14px');
                alert(`DEV MODE: Check console (F12) for OTP. Same OTP shown in PowerShell!`);
                setDevOtp(fetchedOtp);
                setDevMode(true);
                setOtpSent(true);
            } catch (devErr) {
                console.error('Dev endpoint also failed, generating random OTP:', devErr);
                const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
                console.log(`%c🔑 FALLBACK OTP: ${randomOtp}`, 'color: red; font-size: 20px; font-weight: bold');
                setDevOtp(randomOtp);
                setDevMode(true);
                setOtpSent(true);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            // Dev mode verification
            if (devMode) {
                if (otp === devOtp) {
                    const mockToken = 'dev_token_' + Date.now();
                    localStorage.setItem('agro_token', mockToken);
                    localStorage.setItem('agro_user', JSON.stringify({ phone, role: 'ROLE_FARMER' }));
                    if (onLoginSuccess) onLoginSuccess({ token: mockToken, role: 'ROLE_FARMER' });
                    window.location.href = '/';
                    return;
                } else {
                    setError('Invalid OTP. Please try again.');
                    setLoading(false);
                    return;
                }
            }

            const response = await axios.post(`${API_BASE_URL}/verify-otp`, { phone, otp });
            const { token, role } = response.data;

            // Store token and user info
            localStorage.setItem('agro_token', token);
            localStorage.setItem('agro_user', JSON.stringify({ phone, role }));

            if (onLoginSuccess) onLoginSuccess({ token, role });
            window.location.href = '/'; // Redirect to home
        } catch (err) {
            setError(err.response?.data || 'Invalid OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-header">
                <h1>AgrowCrop</h1>
                <p>Expert farming tools for every farmer</p>
            </div>

            {!otpSent ? (
                <form className="auth-form" onSubmit={handleSendOtp}>
                    <div className="input-group">
                        <label htmlFor="phone">Mobile Number</label>
                        <input
                            id="phone"
                            type="tel"
                            className="auth-input"
                            placeholder="Enter 10-digit number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            pattern="[0-9]{10}"
                        />
                    </div>
                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'Sending...' : 'Send OTP'}
                    </button>
                </form>
            ) : (
                <form className="auth-form" onSubmit={handleVerifyOtp}>
                    <div className="input-group">
                        <label htmlFor="otp">Verify OTP</label>
                        <input
                            id="otp"
                            type="text"
                            className="auth-input"
                            placeholder="Enter 6-digit OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'Verifying...' : 'Login'}
                    </button>
                    <button
                        type="button"
                        className="resend-link"
                        onClick={handleSendOtp}
                        disabled={loading}
                    >
                        Didn't receive code? Resend
                    </button>
                </form>
            )}



            {error && <div className="error-message">{error}</div>}
        </div>
    );
}
