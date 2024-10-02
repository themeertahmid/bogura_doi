import React from "react";
import { Col, Container, Row, ListGroup, ListGroupItem } from "reactstrap";
import logo from "../../assets/images/eco-logo.png";
import { Link } from "react-router-dom";
import "./footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3" md="6" className="mb-4">
            <div className="logo">
              <div>
                <h1 className="text-white"> বগুড়ার স্পেশাল দই</h1>
              </div>
            </div>
            <p className="mb-0 footer_text mt-4">
              বগুড়ার স্পেশাল দই - স্বাদের এক অনন্য অভিজ্ঞতা! আমাদের দইয়ের
              বিশেষত্বে লুকিয়ে রয়েছে গুণগত মান ও স্বতঃস্ফূর্ততা। প্রতিদিনের
              স্ন্যাকস কিংবা অতিথির আপ্যায়নে, আমাদের দই আপনার পছন্দের শীর্ষে
              থাকবে।
              <br /> ইন শা আল্লাহ
            </p>
          </Col>
          {/* <Col lg="3" md="6" className="mb-4">
            <div className="footer_quick-links">
              <h5 className="quick_links-title">Quick Links</h5>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0">
                  <Link href="#">Mobile Phones</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link href="#">Modern Sofa</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link href="#">Arm Chair</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link href="#">Smart Watches</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col> */}
          <Col lg="3" md="6" className="mb-4">
            <div className="footer_quick-links">
              <h5 className="quick_links-title">Useful Links</h5>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/shop">Shop</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/cart">Cart</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="/login">Login</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg="3" md="6" className="mb-4">
            <div className="footer_quick-links">
              <h5 className="quick_links-title">Contact</h5>
              <ListGroup>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i class="ri-map-pin-user-line text-white"></i>
                  </span>
                  <p>1234 Main St, Anytown, USA</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i class="ri-mail-line text-white"></i>
                  </span>
                  <p>info@example.com</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i class="ri-phone-line text-white"></i>
                  </span>
                  <p>1234567890</p>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="12">
            <p className="footer_copyright">
              Copyright {new Date().getFullYear()}, designed by{" "}
              <Link to="https://github.com/urtahmid">Tahmid</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
