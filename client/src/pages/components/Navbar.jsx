import './Navbar.css';
import React from 'react';

function Navbar() {
    const hasAccessToken = document.cookie.includes('accessToken');

    function handleLogOut() {
        document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = '/';
    }

    return (
        <div className="background-Container">
            <ul className="listPlaceholder">
                <li className="listItem"><a href="/">Home</a></li>
                {hasAccessToken ? (
                    <>
                        <li className="listItem"><a href="/dashboard">Dashboard</a></li>
                        <li className='listItem'><a href="/notes">Notes</a></li>
                        <li className='listItem'>
                            <a href="/models" id='modelsHref'>Models</a>
                            <div className='onHover'>
                                <a href="/create-model">Create a Model</a>
                                <a href="/models">Show Models</a>
                            </div>
                        </li>
                        <li className='listItem'><a href='#' onClick={handleLogOut}>Log Out</a></li>
                    </>
                ) : (
                    <>
                        <li className="listItem"><a href="/register">Register</a></li>
                        <li className="listItem"><a href="/login">Log In</a></li>
                    </>
                )}
            </ul>
        </div>
    );
}

export default Navbar;
