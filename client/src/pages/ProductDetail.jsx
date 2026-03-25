import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { fetchProduct } from "../api.js";
import { useCart } from "../context/CartContext.jsx";
import { easeLux } from "../motion/variants.js";

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchProduct(id)
      .then((data) => {
        if (!cancelled) setProduct(data);
      })
      .catch(() => {
        if (!cancelled) setError("Product not found or API unavailable.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <Container fluid="xxl" className="px-3 px-lg-5 py-5 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          <Spinner animation="border" variant="primary" className="my-5" />
        </motion.div>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container fluid="xxl" className="px-3 px-lg-5 py-5">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Alert variant="warning" className="rounded-0 border">
            {error || "Not found."}{" "}
            <Link to="/shop" className="alert-link">
              Return to collection
            </Link>
          </Alert>
        </motion.div>
      </Container>
    );
  }

  const canBuy = product.inStock;

  return (
    <Container fluid="xxl" className="px-3 px-lg-5 py-5">
      <motion.p
        className="mb-4"
        initial={reduceMotion ? false : { opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, ease: easeLux }}
      >
        <Link to="/shop" className="vora-eyebrow text-decoration-none text-muted">
          ← Collection
        </Link>
      </motion.p>
      <Row className="g-5 align-items-start">
        <Col lg={7}>
          <motion.div
            className="vora-pdp-image overflow-hidden"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: easeLux }}
          >
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-100 d-block"
              style={{ maxHeight: "min(70vh, 640px)", objectFit: "cover" }}
              initial={reduceMotion ? false : { scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.85, ease: easeLux }}
            />
          </motion.div>
        </Col>
        <Col lg={5}>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.08, ease: easeLux }}
          >
            <p className="vora-eyebrow mb-2">{product.category}</p>
            <h1 className="display-6 mb-4">{product.name}</h1>
            <p className="vora-price fs-4 mb-4">${product.price.toFixed(2)}</p>
            <p className="text-muted lh-lg mb-4">{product.description}</p>
            <div className="d-flex align-items-center gap-3 mb-5 pb-4 border-bottom border-secondary border-opacity-10">
              <span className="vora-eyebrow mb-0">Availability</span>
              {canBuy ? (
                <span className="small text-success text-uppercase fw-medium">In stock</span>
              ) : (
                <span className="small text-danger text-uppercase fw-medium">Sold out</span>
              )}
            </div>
            <div className="d-flex flex-wrap gap-3">
              <motion.div whileTap={reduceMotion ? undefined : { scale: 0.98 }}>
                <Button size="lg" variant="primary" disabled={!canBuy} onClick={() => addItem(product)}>
                  Add to bag
                </Button>
              </motion.div>
              <motion.div whileTap={reduceMotion ? undefined : { scale: 0.98 }}>
                <Button as={Link} to="/shop" size="lg" variant="outline-primary">
                  Continue shopping
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}
