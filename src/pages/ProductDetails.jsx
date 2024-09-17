import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import products from "../assets/data/products.js";
import Helmet from "../components/Helmet/Helmet.js";
import CommonSection from "../components/UI/CommonSection.jsx";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slice/cartSlice.js";
import "../styles/product-details.css";
import ProductList from "../components/UI/ProductList.jsx";
import { toast } from "react-toastify";

const ProductDetails = () => {


    const [tab, setTab] = useState("desc");
    const reviewUser = useRef('')
    const reviewMsg = useRef('')
    const dispatch = useDispatch()

    const [rating, setRating] = useState(null);
    const { id } = useParams();
    const product = products.find((item) => item.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [product]);

    if (!product) {
        return <p>Product not found!</p>;
    }

    const {
        imgUrl,
        productName,
        price,
        avgRating,
        reviews,
        description,
        shortDesc,
        category,
    } = product;

    const relatedProducts = products.filter((item) => item.category === category);

    const submitHandler = (e) => {
        e.preventDefault()

        const reviewUserName = reviewUser.current.value
        const reviewUserMsg = reviewMsg.current.value

        const reviewObj = {
            userName: reviewUserName,
            text: reviewUserMsg,
            rating,
        };
        console.log(reviewObj);
        toast.success('Review Submitted')
    }

    const addToCart = () => {
        dispatch(cartActions.addItem({
            id,
            image: imgUrl,
            productName,
            price,
        }));

        toast.success('Product Added Sucessfuly')
    }


    return (
        <Helmet title={productName}>
            <CommonSection title={productName} />

            <section>
                <Container>
                    <Row>
                        <Col lg="6">
                            <img src={imgUrl} alt="" />
                        </Col>
                        <Col lg="6">
                            <div className="product_details">
                                <h2>{productName}</h2>
                                {/* <div className="product_rating d-flex align-items-center gap-5 mb-4">
                                    <div>
                                        <span>
                                            <i class="ri-star-s-fill"></i>
                                        </span>
                                        <span>
                                            <i class="ri-star-s-fill"></i>
                                        </span>
                                        <span >
                                            <i class="ri-star-s-fill"></i>
                                        </span>
                                        <span>
                                            <i class="ri-star-s-fill"></i>
                                        </span>
                                        <span >
                                            <i class="ri-star-half-s-line"></i>
                                        </span>
                                    </div>
                                    <p>
                                        (<span>{avgRating}</span> Ratings)
                                    </p>
                                </div> */}

                                <div className="d-flex align-items-center gap-5">
                                    <div className="product_price">${price}</div>
                                    {/* <div>Category: {category.toUpperCase()}</div> */}
                                </div>


                           
                                <ul className="short_desc_list mt-3">
                                    {shortDesc.map((desc, index) => (
                                        <li key={index}>{desc}</li>
                                    ))}
                                </ul>

                                <motion.button whileTap={{ scale: 1.2 }} onClick={addToCart} className="buy_btn">
                                    Add to Cart
                                </motion.button>
                            </div>
                        </Col>
                        <Col lg="12" className="mt-5">
                            <h6 className="related_title">You Might Also Like</h6>
                        </Col>
                        <ProductList data={relatedProducts} />
                    </Row>
                </Container>
            </section>

            <section>
                <Container>
                    <Row>
                        <Col lg="12">
                            <div className="tab_wrapper d-flex align-items-center gap-5 ">
                                <h6
                                    className={`${tab === "desc" ? "active_tab" : ""}`}
                                    onClick={() => setTab("desc")}
                                >
                                    Description
                                </h6>
                                <h6
                                    className={`${tab === "rev" ? "active_tab" : ""}`}
                                    onClick={() => setTab("rev")}
                                >
                                    Review ({reviews.length})
                                </h6>
                            </div>

                            {tab === "desc" ? (
                                <div className="tab_content mt-4">
                                    <p>{description}</p>
                                </div>
                            ) : (
                                <div className="product_review">
                                    <div className="review_wrapper">
                                        <ul>
                                            {reviews.map((item, index) => (
                                                <li key={index} className="mb-4">
                                                    <h6>John Doe</h6>
                                                    <span>{item.rating} (avarage rating)</span>
                                                    <p>{item.text}</p>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="review_form">
                                            <h1>Leave Your Experience</h1>
                                            <form action="" onSubmit={submitHandler}>
                                                <div className="form_group">
                                                    <input type="text" ref={reviewUser} required placeholder="Enter Name" />
                                                </div>

                                                <div className="form_group d-flex align-items-center gap-5 rating_group">
                                                    <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(1)}>
                                                        1<i class="ri-star-fill"></i>{" "}
                                                    </motion.span>
                                                    <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(2)}>
                                                        2<i class="ri-star-fill"></i>{" "}
                                                    </motion.span>
                                                    <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(3)}>
                                                        3<i class="ri-star-fill"></i>{" "}
                                                    </motion.span>
                                                    <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(4)}>
                                                        4<i class="ri-star-fill"></i>{" "}
                                                    </motion.span>
                                                    <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(5)}>
                                                        5<i class="ri-star-fill"></i>{" "}
                                                    </motion.span >
                                                </div>

                                                <div className="form_group">
                                                    <textarea
                                                        ref={reviewMsg}
                                                        rows={4}
                                                        type="text"
                                                        placeholder="Review Message"
                                                        required
                                                    />

                                                </div>
                                                <motion.button whileTap={{ scale: 1.2 }} type="submit" className="buy_btn">
                                                    Submit
                                                </motion.button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default ProductDetails;
