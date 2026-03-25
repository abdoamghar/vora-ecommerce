import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { submitCheckout } from "../api.js";
import { useCart } from "../context/CartContext.jsx";
import { easeLux } from "../motion/variants.js";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [err, setErr] = useState(null);
  const reduceMotion = useReducedMotion();

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const data = await submitCheckout({
        email: email.trim() || undefined,
        items: items.map((i) => ({
          id: i.id,
          name: i.name,
          quantity: i.quantity,
          price: i.price
        }))
      });
      setResult(data);
      clearCart();
    } catch (e2) {
      setErr(e2.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    return (
      <Container fluid="xxl" className="px-3 px-lg-5 py-5">
        <motion.div
          className="mx-auto"
          style={{ maxWidth: "520px" }}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        >
          <Alert variant="light" className="border shadow-sm py-4 px-4">
            <p className="vora-eyebrow mb-2 text-success">Order confirmed</p>
            <h2 className="h3 mb-3" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
              Thank you for shopping with Vora
            </h2>
            <p className="mb-2">
              Your reference is{" "}
              <strong className="text-primary" style={{ letterSpacing: "0.04em" }}>
                {result.orderId}
              </strong>
              .
            </p>
            <p className="small text-muted mb-4">
              No payment was processed — this remains a demonstration flow.
            </p>
            <Button as={Link} to="/shop" variant="primary">
              Return to collection
            </Button>
          </Alert>
        </motion.div>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container fluid="xxl" className="px-3 px-lg-5 py-5">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: easeLux }}
        >
          <header className="vora-page-title">
            <p className="vora-eyebrow mb-2">Finalize</p>
            <h1>Checkout</h1>
          </header>
          <p className="text-muted mb-4">Your bag is empty.</p>
          <Button as={Link} to="/shop" variant="primary">
            Shop collection
          </Button>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container fluid="xxl" className="px-3 px-lg-5 py-5">
      <Row className="justify-content-center">
        <Col lg={6}>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeLux }}
          >
            <header className="vora-page-title">
              <p className="vora-eyebrow mb-2">Secure checkout · demo</p>
              <h1>Complete your order</h1>
            </header>

            <motion.div
              className="p-4 mb-4 bg-white border"
              style={{ borderColor: "var(--vora-line-strong)" }}
              whileHover={reduceMotion ? undefined : { boxShadow: "0 12px 40px rgba(10, 22, 40, 0.06)" }}
              transition={{ duration: 0.35 }}
            >
              <p className="vora-eyebrow mb-1">Order total</p>
              <p className="display-6 mb-0">${subtotal.toFixed(2)}</p>
            </motion.div>

            {err && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                <Alert variant="danger" className="rounded-0">
                  {err}
                </Alert>
              </motion.div>
            )}

            <Form onSubmit={handleSubmit} className="mt-4">
              <Form.Group className="mb-4" controlId="email">
                <Form.Label>Email for confirmation</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
                <Form.Text className="text-muted">Optional for this demo.</Form.Text>
              </Form.Group>
              <motion.div whileTap={reduceMotion ? undefined : { scale: 0.99 }}>
                <Button type="submit" variant="primary" size="lg" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Submitting…
                    </>
                  ) : (
                    "Place order"
                  )}
                </Button>
              </motion.div>
            </Form>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}
