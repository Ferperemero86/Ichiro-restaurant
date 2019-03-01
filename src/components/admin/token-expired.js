import React from 'react';
import { Link } from 'react-router-dom';

const TokenExpired = () => {
    return (
        <div id="token-expired-main">
            <div className="token-expired-content">
                <h1>The token has expired!</h1>
                <Link to='/admin'
                      title="Go to Login page">Go to Login</Link>
            </div>
        </div>
    )
}

export default TokenExpired;