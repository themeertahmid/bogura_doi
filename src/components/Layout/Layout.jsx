import React from 'react';
import Header from '../Header/Header';
import Routers from '../../routers/Router';
import Footer from '../Footer/Footer';
const Layout = () => {
    return (
        <div>
            <Header></Header>
            <div>
                <Routers></Routers>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Layout;
