import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { fetchProducts } from "../api.js";
import ProductCard from "../components/ProductCard.jsx";
import { easeLux } from "../motion/variants.js";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    fetchProducts()
      .then((data) => {
        if (!cancelled) setProducts(data);
      })
      .catch(() => {
        if (!cancelled)
          setError("Could not load products. Is the API running on port 5000?");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <Container fluid="xxl" className="px-3 px-lg-5 py-5 text-center">
        <Spinner animation="border" variant="primary" role="status" className="my-5" />
        <p className="vora-eyebrow mt-3 mb-0">Loading collection</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container fluid="xxl" className="px-3 px-lg-5 py-5">
        <Alert variant="danger" className="border-0 rounded-0">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid="xxl" className="px-3 px-lg-5 py-5">
      <motion.header
        className="vora-page-title"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: easeLux }}
      >
        <p className="vora-eyebrow mb-2">New arrivals &amp; classics</p>
        <h1>The collection</h1>
        <p className="text-muted mb-0 mt-2" style={{ maxWidth: "36rem" }}>
          A focused assortment — each item photographed and described to reflect how it lives in your
          space and your routine.
        </p>
      </motion.header>

      <Row xs={1} sm={2} lg={3} className="g-4 g-lg-5">
        {products.map((p, i) => (
          <Col key={p.id}>
            <ProductCard product={p} index={i} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
