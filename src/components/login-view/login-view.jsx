import React, { useState } from 'react';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        e.preventDefault();
        console.log(username, password);
        // Send a request to the server for authentication
        // then call this.props.onLoggedIn(username)
        props.onLoggIn(username)

    };

    return (
        <form>
            <label>
                Username:
                <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    );
}