import { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet.js";
import CommonSection from "../components/UI/CommonSection";
import { Col, Container, Row } from "reactstrap";
import "../styles/shop.css";
import ProductList from "../components/UI/ProductList.jsx";
import useGetData from "../custom-hooks/useGetData.js"; // Import your custom hook

const Shop = () => {
    const { data: products, loading } = useGetData('products'); // Fetch data from Firebase
    const [productsData, setProductsData] = useState(products);

    useEffect(() => {
        setProductsData(products); // Update local state when products change
    }, [products]);

    const handleFilter = (e) => {
        const filterValue = e.target.value;
        if (filterValue) {
            const filteredProducts = products.filter(item => item.category === filterValue);
            setProductsData(filteredProducts);
        } else {
            setProductsData(products);
        }
    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const searchedProducts = products.filter(item =>
            item.productName.toLowerCase().includes(searchTerm)
        );
        setProductsData(searchedProducts);
    };

    return (
        <Helmet title="Shop">
            <CommonSection title="Products" />
            <section>
                <Container>
                    <Row className="align-items-center">
                        <Col lg="3" md="6" className="mb-0">
                            <div className="filter_widget">
                                <select onChange={handleFilter}>
                                    <option value="">Filter By Category</option>
                                    <option value="doi">দই</option>
                                    <option value="misti">মিষ্টি</option>
                                    <option value="sondesh_borfi">বরফি / কেক / সন্ধেস</option>
                                    <option value="khirsa">ক্ষীরসা</option>
                                </select>
                            </div>
                        </Col>
                        <Col lg="9" md="12">
                            <div className="search_box">
                                <input
                                    type="text"
                                    placeholder="Search...."
                                    onChange={handleSearch}
                                />
                                <span>
                                    <i className="ri-search-line"></i>
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="pt-0">
                <Container>
                    <Row>
                        {loading ? (
                            <h1 className="text-center fs-4">Loading Products...</h1>
                        ) : productsData.length === 0 ? (
                            <h1 className="text-center fs-4">No Products found!</h1>
                        ) : (
                            <ProductList data={productsData} />
                        )}
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default Shop;
