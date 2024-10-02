import React, { useRef, useEffect } from 'react';
import '../styles/admin-nav.css';
import { motion } from 'framer-motion';
import useAuth from '../custom-hooks/useAuth';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.config';

const nav__links = [
    {
        path: 'dashboard',
        display: 'Dashboard'
    },
    {
        path: 'dashboard/add-product',
        display: 'Add Products'
    },
    {
        path: 'dashboard/all-products',
        display: 'All Products'
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
    const toggleProfileActions = () => profileActionRef.current.classList.toggle('show__profileActions');

    return (
        <header className="admin_header" ref={headerRef}>
            <Container>
                <Row>
                    <div className="nav__wrapper">
                        <div className="admin_logo">
                            <h1 className='logo'><Link to="/home">বগুড়ার স্পেশাল দই</Link></h1>
                        </div>

                        <div className="admin_navigation" ref={menuRef} onClick={menuToggle}>
                            <ul className="admin_menu">
                                {
                                    nav__links.map((item, index) => (
                                        <li className='admin-nav__item' key={index}>
                                            <NavLink to={item.path} className={({ isActive }) => 
                                                isActive ? 'admin_nav__active' : ''}>{item.display}</NavLink>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                        <div className="nav__icons">
                            <div className="admin__nav-top-right">
                                <Link to="/home"><i className="ri-home-smile-fill"></i></Link>
                                {currentUser && (
                                    <div className="profile">
                                        <img src={currentUser.photoURL} alt='Profile' onClick={toggleProfileActions} />
                                        <div className="profile__actions" ref={profileActionRef}>
                                            <li className='admin_li' onClick={logout}>Logout</li>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="admin-mobile__menu">
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
