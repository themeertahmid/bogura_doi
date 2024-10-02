import React, { useRef, useEffect } from 'react';
import './Header.css';
import { motion } from 'framer-motion';
import logo from '../../assets/images/eco-logo.png';
import userIcon from '../../assets/images/user-icon.png';
import useAuth from '../../custom-hooks/useAuth';
import { NavLink, useNavigate } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';

const nav__links = [
    {
        path: 'home',
        display: 'Home'
    },
    {
        path: 'shop',
        display: 'Shop'
    },
];

const Header = () => {
    const headerRef = useRef(null);
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const profileActionRef = useRef(null);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const logout = () => {
        signOut(auth).then(() => {
            toast.success('Logged out');
            navigate('/home');
        }).catch(err => {
            toast.error(err.message);
        });
    };

    const stickyHeaderFunc = () => {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('sticky__header');
            } else {
                headerRef.current.classList.remove('sticky__header');
            }
        });
    };

    useEffect(() => {
        stickyHeaderFunc();
        return () => window.removeEventListener('scroll', stickyHeaderFunc);
    }, []);

    const menuToggle = () => menuRef.current.classList.toggle('active__menu');
    const navigateToCart = () => navigate('/cart');
    const toggleProfileActions = () => profileActionRef.current.classList.toggle('show__profileActions');

    return (
        <header className="header" ref={headerRef}>
            <Container>
                <Row>
                    <div className="nav__wrapper">
                        <div className="logo">
                            <img src={logo} alt="logo" />
                            <div>
                                <h1>বগুড়ার স্পেশাল দই</h1>
                            </div>
                        </div>

                        <div className="nav__icons">
                            <div className="navigation" ref={menuRef} onClick={menuToggle}>
                                <ul className="menu">
                                    {nav__links.map((item, index) => (
                                        <li className='nav__item' key={index}>
                                            <NavLink to={item.path} className={({ isActive }) => (isActive ? 'nav__active' : '')}>
                                                {item.display}
                                            </NavLink>
                                        </li>
                                    ))}
                                    {currentUser && (
                                        <>
                                            <li className='nav__item'>
                                                <NavLink to='/dashboard' className={({ isActive }) => (isActive ? 'nav__active' : '')}>
                                                    Dashboard
                                                </NavLink>
                                            </li>
                                            <div className='profile'>
                                                <img src={currentUser.photoURL} onClick={toggleProfileActions} alt='Profile' />
                                                <div className="profile__actions" ref={profileActionRef}>
                                                    <li onClick={logout}>Logout</li>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </ul>
                            </div>

                            <div className="mobile__menu">
                                <span onClick={menuToggle}><i className="ri-menu-line"></i></span>
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>
        </header>
    );
};

export default Header;
