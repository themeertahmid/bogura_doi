import React from 'react';
import Header from '../Header/Header';
import Routers from '../../routers/Router';
import Footer from '../Footer/Footer';
import { useLocation } from 'react-router-dom';
import AdminNav from '../../admin/AdminNav';

const Layout = () => {
    const location = useLocation();
    
    return (
        <div style={styles.layoutContainer}>
            {
                location.pathname.startsWith('/dashboard') ? <AdminNav /> : <Header />
            }

            <div style={styles.content}>
                <Routers />
            </div>
            <Footer />
            
            <style>
                {`
                    html, body {
                        height: 100%;
                        margin: 0;
                    }

                    .layoutContainer {
                        display: flex;
                        flex-direction: column;
                        min-height: 100vh;
                    }

                    .content {
                        flex: 1;
                    }

                
                `}
            </style>
        </div>
    );
};

const styles = {
    layoutContainer: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    content: {
        flex: 1,
    },
};

export default Layout;
