import Header from './Header';
import './Login.css';
import { useState } from 'react';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
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
                body: JSON.stringify({ username, password })
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
            <Header />
            <div className="login-card-wrapper">
                <form className="login-card" onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        autoComplete="username"
                        required
                    />
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
                    <div className="create-account-row">
                        <span className="create-account-prompt">New to Huecraft?</span>
                        <a href="#" className="create-account-link">Create Account</a>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;