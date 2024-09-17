import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import Cart from '../pages/Cart';
import ProductDetails from '../pages/ProductDetails';
import Checkout from '../pages/Checkout';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ProtectedRoute from './ProtectedRoute';

const Router = () => {
    return <Routes>
        <Route path='/' element={<Navigate to="/home"></Navigate>} />
        <Route path='home' element={<Home></Home>} />
        <Route path='shop' element={<Shop></Shop>} />
        <Route path='shop/:id' element={<ProductDetails></ProductDetails>} />
        <Route path='cart' element={<Cart></Cart>} />
        <Route path='checkout' element={<ProtectedRoute>
            <Checkout></Checkout>
        </ProtectedRoute>} />
        <Route path='login' element={<Login></Login>} />
        <Route path='signup' element={<Signup></Signup>} />

    </Routes>
};

export default Router;
