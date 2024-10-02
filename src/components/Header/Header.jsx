import React, { useRef, useEffect } from 'react';
import './Header.css'
import { motion } from 'framer-motion'
import logo from '../../assets/images/eco-logo.png'
import userIcon from '../../assets/images/user-icon.png'
import useAuth from '../../custom-hooks/useAuth';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify'
import {signOut} from 'firebase/auth';
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
    {
        path: 'cart',
        display: 'Cart'
    },
]

const Header = () => {

    const headerRef = useRef(null);
    const totalQuantity = useSelector(state => state.cart.totalQuantity);

    const profileActionRef = useRef(null);
    const menuRef = useRef(null)
    const navigate = useNavigate()

    const { currentUser } = useAuth()

    const logout = () =>{
        signOut(auth).then(()=>{
            toast.success('Logged out')
            navigate('/home')
        }).catch(err=>{
            toast.error('err.message')
        })
    }

    const stickyHeaderFunc = () => {
        window.addEventListener('scroll', () => {
            if (document.boby.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('sticky__header')
            } else {
                headerRef.current.classList.remove('sticky__header')
            }
        });
    }

    useEffect(() => {
        stickyHeaderFunc()
        return () => window.removeEventListener('scroll', stickyHeaderFunc);

    });

    const menuToggle = () => menuRef.current.classList.toggle('active__menu');

    const navigateToCart = () => {
        navigate('/cart');
    };

    const toggleProfileActions = () => profileActionRef.current.classList.toggle('show__profileActions');

    return (
    <header className="header">
        <Container>
            <Row>
                <div className="nav__wrapper">
                    <div className="logo">
                        <img src={logo} alt="logo"></img>
                        <div>
                            <h1>বগুড়ার স্পেশাল দই</h1>
                        </div>
                    </div>

                    <div className="nav__icons">

                        
                    <div className="navigation" ref={menuRef} onClick={menuToggle}>
                        <ul className="menu">
                            {
                                nav__links.map((item, index) => (
                                    <li className='nav__item' key={index}>
                                        <NavLink to={item.path} className={(navClass) =>
                                            navClass.isActive ? 'nav__active' : ''}>{item.display}</NavLink>
                                    </li>
                                ))}
                        </ul></div>

                        {/* <span className="fav__icon">
                            <i class="ri-heart-line"></i>
                            <span className="badge">1</span>
                        </span>
                        <span className="cart__icon" onClick={navigateToCart}>
                            <i class="ri-shopping-bag-line"></i>
                            <span className="badge">{totalQuantity}</span>
                        </span>
                        <div className='profile'>
                            <motion.img
                                src={currentUser ? currentUser.photoURL : userIcon}
                                whileTap={{ scale: 1.2 }} alt=" "
                                onClick={toggleProfileActions}>
                            </motion.img>

                            <div className="profile__actions" 
                                ref={profileActionRef}
                                onClick={toggleProfileActions}>
                                {
                                    currentUser ? (
                                        <span onClick={logout}>Logout</span>
                                    ) : (
                                        <div className='d-flex align-items-center justify-content-center flex-column'>
                                            <Link to='/signup'>Signup</Link>
                                            <Link to='/login'>Login</Link>
                                            <Link to='/dashboard'>Dashboard</Link>
                                        </div>
                                    )}
                            </div>
                        </div> */}
                        <div className="mobile__menu">
                            <span onClick={menuToggle}><i class="ri-menu-line"></i></span>
                        </div>
                    </div>
                </div>
            </Row>
        </Container>
    </header>
)}

export default Header