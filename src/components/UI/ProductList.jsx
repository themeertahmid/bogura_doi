import React from 'react';
import ProductCard from './ProductCard';
import { Row } from "reactstrap"

const ProductList = ({ data }) => {
    return (
        <>
            {
                data?.map((item, index) => (
                    <ProductCard key={index} item={item}  />
                ))
            }
        </>
    );
};

export default ProductList;
