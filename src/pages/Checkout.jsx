import React from "react";
import { useSelector } from "react-redux";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import Helemet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/checkout.css";

const Checkout = () => {
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <Helemet title="Checkout">
      <CommonSection title="Cehckout"></CommonSection>
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fw-bold ">Billing Information</h6>
              <Form className="billing_form">
                <FormGroup className="from_group">
                  <input
                    type="text"
                    name=""
                    placeholder="Enter Your Name"
                    id=""
                  />
                </FormGroup>
                <FormGroup className="from_group">
                  <input
                    type="email"
                    name=""
                    placeholder="Enter Your Email"
                    id=""
                  />
                </FormGroup>
                <FormGroup className="from_group">
                  <input
                    type="number"
                    name=""
                    placeholder="Phone Number"
                    id=""
                  />
                </FormGroup>
                <FormGroup className="from_group">
                  <input
                    type="text"
                    name=""
                    placeholder="Street Address"
                    id=""
                  />
                </FormGroup>
                <FormGroup className="from_group">
                  <input type="text" name="" placeholder="City" id="" />
                </FormGroup>
                <FormGroup className="from_group">
                  <input type="text" name="" placeholder="Postal Code" id="" />
                </FormGroup>
                <FormGroup className="from_group">
                  <input type="number" name="" placeholder="Country" id="" />
                </FormGroup>
              </Form>
            </Col>

            <Col lg="4">
              <div className="checkout_cart">
                <h6>
                  Total Qty: <span>{totalQty}</span>
                </h6>
                <h6>
                  Subtotal: <span>${totalAmount}</span>
                </h6>
                <h6>
                  <span>
                    Shipping: <br />
                    free shipping
                  </span>{" "}
                  <span>$0</span>
                </h6>
                <h4>
                  Total Cost: <span>${totalAmount}</span>
                </h4>
                <button className="buy_btn auth_btn w-100">
                  Place an Order
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helemet>
  );
};

export default Checkout;
