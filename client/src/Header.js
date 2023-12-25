import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import Image from "./assets/logoBlog.png"
export default function Header() {
    const { setUserInfo, userInfo } = useContext(UserContext);
    useEffect(() => {
        fetch('https://web-blog-zeta-seven.vercel.app/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            });
        });
    }, []);

    function logout() {
        fetch('https://web-blog-zeta-seven.vercel.app/logout', {
            credentials: 'include',
            method: 'POST',
        });
        setUserInfo(null);
    }

    const username = userInfo?.username;

    return (
        <header>
            <Link to="/" className="logo"><img src={Image} alt="Logo" width={50} />Blog</Link>
            <nav>
                {username && (
                    <>
                        <Link to="/create">Create new post</Link>
                        <a onClick={logout}>Logout ({username})</a>
                    </>
                )}
                {!username && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
}
