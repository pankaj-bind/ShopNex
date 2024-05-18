import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import cart_icon_dark from '../Assets/cart_icon_dark.png';
import moonIcon from '../Assets/dark_mode.png';
import sunIcon from '../Assets/light_mode.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
    const { getTotalCartItems, theme, setTheme } = useContext(ShopContext);
    const [icon, setIcon] = useState(cart_icon);
    const [menu, setMenu] = useState("shop");

    useEffect(() => {
        // Load the theme from localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            setIcon(savedTheme === "dark" ? cart_icon : cart_icon_dark);
            const dnav = document.getElementById("nav");
            if (savedTheme === "dark") {
                dnav.classList.add("dark");
            } else {
                dnav.classList.remove("dark");
            }
        }
    }, [setTheme]);

    const toggle = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        setIcon(newTheme === "dark" ? cart_icon : cart_icon_dark);
        const dnav = document.getElementById("nav");
        if (newTheme === "dark") {
            dnav.classList.add("dark");
        } else {
            dnav.classList.remove("dark");
        }
    };

    return (
        <div className={`navbar`} id="nav">
            <div className="nav-logo">
                <Link className="nav-logo-link" to="/">
                    <img src={logo} alt="ShopNex Logo" style={{ marginRight: '10px' }} />
                    <p className={`pnav_${theme}`}>ShopNex</p>
                </Link>
            </div>
            <ul className="nav-menu">
                <li onClick={() => { setMenu("shop") }}>
                    <Link to='/'>Shop</Link>
                    {menu === "shop" ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("men") }}>
                    <Link to='/men'>Men</Link>
                    {menu === "men" ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("women") }}>
                    <Link to='/women'>Women</Link>
                    {menu === "women" ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("kids") }}>
                    <Link to='/kids'>Kids</Link>
                    {menu === "kids" ? <hr /> : <></>}
                </li>
            </ul>
            <div className="nav-login-cart">
                <Link to='/login'><button className='log_btn'>Login</button></Link>
                <Link to='/cart'><img src={icon} alt="Cart Icon" className='cart' /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
                <div className='dark_btn'>
                    <button onClick={toggle} className={`toggle_${theme} change`}>
                        {theme === 'light' ? <img src={sunIcon} alt="Sun Icon" /> : <img src={moonIcon} alt="Moon Icon" />}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
