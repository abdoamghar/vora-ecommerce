import { motion, useReducedMotion } from "framer-motion";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { easeLux } from "../motion/variants.js";

export default function Footer() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.footer
      className="vora-footer py-5 mt-5"
      initial={reduceMotion ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: easeLux }}
    >
      <Container fluid="xxl" className="px-3 px-lg-5">
        <Row className="g-4 align-items-start">
          <Col md={5} lg={4}>
            <p className="vora-footer-brand mb-3">Vora</p>
            <p className="small mb-0" style={{ maxWidth: "22rem", lineHeight: 1.7 }}>
              Objects and essentials selected for lasting quality. A quiet approach to retail —
              inspired by the calm of contemporary luxury houses.
            </p>
          </Col>
          <Col sm={6} md={3} lg={2}>
            <p className="vora-eyebrow mb-3">Explore</p>
            <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
              <li>
                <Link to="/shop">The collection</Link>
              </li>
              <li>
                <Link to="/cart">Shopping bag</Link>
              </li>
            </ul>
          </Col>
          <Col sm={6} md={4} lg={3}>
            <p className="vora-eyebrow mb-3">Service</p>
            <p className="small mb-0" style={{ lineHeight: 1.7 }}>
              Complimentary shipping on orders over $75. Returns within 30 days. This is a demo
              storefront — no real transactions.
            </p>
          </Col>
        </Row>
        <hr className="border-secondary border-opacity-25 my-4" />
        <p className="small text-center text-white-50 mb-0">
          © {new Date().getFullYear()} Vora. Crafted for demonstration.
        </p>
      </Container>
    </motion.footer>
  );
}
