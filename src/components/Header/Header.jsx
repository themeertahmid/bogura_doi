import React, { useRef, useEffect, useState } from "react";
import {
    Container, Row,
} from "reactstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/eco-logo.png";
import { motion } from "framer-motion";
import usr_icon from "../../assets/images/user-icon.png";
import "./Header.css";
import useAuth from '../../custom-hooks/useAuth'
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config"

import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const nav_link = [
    {
        path: "home",
        display: "Home",
    },
    {
        path: "shop",
        display: "Shop",
    },
    {
        path: "cart",
        display: "Cart",
    },
];

const Header = () => {
    const headerRef = useRef(null);
    const totalQuantity = useSelector(state => state.cart.totalQuantity)


    const menuRef = useRef(null);
    const navigate = useNavigate()

    const { currentUser } = useAuth()

    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);
    const stickyHeaderFunc = () => {
        window.addEventListener("scroll", () => {
            if (
                document.body.scrollTop > 80 ||
                document.documentElement.scrollTop > 80
            ) {
                headerRef.current.classList.add("sticky_header");
            } else {
                headerRef.current.classList.remove("sticky_header");
            }
        });
    };

    useEffect(() => {
        stickyHeaderFunc();
    }, []);

    const navigateToCart = () => {
        navigate('/cart')
    }


    const logout = () => {
        signOut(auth).then(() => {
            toast.success('Logged Out')
        }).catch(err => {
            toast.error("err.message")
        })
    }



    return (
        <header className="header" ref={headerRef}>
            <Container>

                <Row>
                    <div className="nav_wrapper">
                        <div className="logo">
                            <img src={logo} alt="" />
                            <div>
                                <h1>বগুড়ার স্পেশাল দই</h1>
                            </div>
                        </div>

                        <div
                            className={`navigation ${menuOpen ? "show_menu" : ""}`}
                            ref={menuRef}
                        >
                            <ul className="menu">
                                <div className="mobile_menu">
                                    <li className="menu_close" onClick={toggleMenu}>
                                        <i className="ri-close-line lg:hidden"></i>
                                    </li>
                                </div>
                                {nav_link.map((item, index) => (
                                    <li className="nav_items" key={index}>
                                        <NavLink
                                            className={(navClass) =>
                                                navClass.isActive ? "nav_active" : ""
                                            }
                                            to={item.path}
                                        >
                                            {item.display}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="nav_icons d-flex">
                            <span className="fav_icon">
                                <i className="ri-heart-line"></i>
                                <span className="badge">1</span>
                            </span>
                            <span className="cart_icon" onClick={navigateToCart}>
                                <i className="ri-shopping-bag-line"></i>
                                <span className="badge">{totalQuantity}</span>
                            </span>

                            <div className="profile">



                                <div class="dropdown">
                                    <span> <motion.img
                                        whileTap={{ scale: 1.1 }}
                                        src={usr_icon}

                                        className="profile_img"
                                    /></span>
                                    <div class="dropdown-content">
                                        <div className="profile_actions" >
                                            {currentUser ? (
                                                <span onClick={logout}>Logout</span>
                                            ) : (
                                                <div>
                                                    <Link to="/signup">Signup</Link>
                                                    /
                                                    <Link to="/login">Login</Link>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>



                            </div>


                        </div>

                        <div className="mobile_menu">
                            <span onClick={toggleMenu}>
                                <i className="ri-menu-line"></i>
                            </span>
                        </div>
                    </div>
                </Row>
            </Container>
        </header>
    );
};

export default Header;
