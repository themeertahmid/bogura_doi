import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet.js";
import CommonSection from "../components/UI/CommonSection.jsx";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slice/cartSlice.js";
import "../styles/product-details.css";
import ProductList from "../components/UI/ProductList.jsx";
import { toast } from "react-toastify";
import { db } from '../firebase.config.js';
import { doc, getDoc } from "firebase/firestore";
import useGetData from '../custom-hooks/useGetData.js';

const ProductDetails = () => {
    const [product, setProduct] = useState(null); // Initialize as null
    const dispatch = useDispatch();
    const { id } = useParams();
    const { data: products } = useGetData('products');

    const docRef = doc(db, 'products', id);

    useEffect(() => {
        const getProduct = async () => {
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setProduct(docSnap.data());
            } else {
                console.log('No product found');
            }
        };

        getProduct(); // Call the function here
    }, [docRef]); // Add docRef to dependency array

 

    if (!product) {
        return <div>Loading...</div>; // Show loading state until product is fetched
    }

    const {
        imgUrl,
        productName,
        price,
        shortDesc = [],
        category,
    } = product;

    const relatedProducts = products.filter((item) => item.category === category);

    const addToCart = () => {
        dispatch(cartActions.addItem({
            id,
            image: imgUrl,
            productName,
            price,
        }));

        toast.success('Product Added Successfully');
    }

    return (
        <Helmet title={productName}>
            <CommonSection title={productName} />

            <section>
                <Container>
                    <Row>
                        <Col lg="6">
                            <img src={imgUrl} alt={productName} />
                        </Col>
                        <Col lg="6">
                            <div className="product_details">
                                <h2>{productName}</h2>
                                {/* <div className="d-flex align-items-center gap-5">
                                    <div className="product_price">${price}</div>
                                </div> */}

                                    <p>{shortDesc}</p>

                                <motion.button whileTap={{ scale: 1.2 }}  className="buy_btn">
                                   <a href="faebook.com">Go To Our FaceBook Page</a>
                                </motion.button>
                            </div>
                        </Col>
                        <Col lg="12" className="mt-5">
                            <h6 className="related_title mb-5">You Might Also Like</h6>
                        </Col>
                        <ProductList data={relatedProducts} />
                      
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default ProductDetails;
