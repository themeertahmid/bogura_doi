import React from "react";
import productImg from "../../assets/images/arm-chair-01.jpg";

import { motion } from "framer-motion";
import "../../styles/product-card.css";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slice/cartSlice";
import { toast } from "react-toastify";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id: item.id,
        productName: item.productName,
        price: item.price,
        image: item.imgUrl,
      })
    );

    toast.success("Product added successfully to the cart");
  };

  return (
    <Col lg="3" md="4" className="">
      <div
        className="product_item"
        style={{
          marginBotttom: "10px",
        }}
      >
        <div className="product_img">
          <motion.img whileHover={{ scale: 0.9 }} src={item.imgUrl} alt="" />
        </div>
        <div className="p-2 product_info">
          <h3 className="product_name">
            <Link to={`/shop/${item.id}`}> {item.productName} </Link>
          </h3>
        </div>

        <div className="p-2 mb-5 product_card-bottom d-flex aign-items-center justify-content-between">
          <span className="price">${item.price}</span>
          <motion.span whileTap={{ scale: 1.1 }}>
            <i className="ri-add-line" onClick={addToCart}></i>
          </motion.span>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
