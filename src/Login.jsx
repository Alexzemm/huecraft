import Header from './Header';
import './Login.css';
import { useState } from 'react';

function Login({ onLogin }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await fetch('http://localhost:4000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });
            const data = await res.json();
            if (data.success) {
                onLogin();
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Server error');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Header showCart={false} />
            <div className="login-card-wrapper">
                <form className="login-card" onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                    />
                    {error && <div style={{ color: 'crimson', marginBottom: '0.5rem', fontSize: '1rem' }}>{error}</div>}
                    <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Submit'}</button>
                </form>
            </div>
        </>
    );
}

export default Login;