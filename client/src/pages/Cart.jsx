import { motion, useReducedMotion } from "framer-motion";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { easeLux } from "../motion/variants.js";

const MotionTr = motion.tr;

export default function Cart() {
  const { items, subtotal, setQuantity, removeItem, clearCart } = useCart();
  const reduceMotion = useReducedMotion();

  if (items.length === 0) {
    return (
      <Container fluid="xxl" className="px-3 px-lg-5 py-5">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: easeLux }}
        >
          <header className="vora-page-title">
            <p className="vora-eyebrow mb-2">Your selection</p>
            <h1>Shopping bag</h1>
          </header>
          <p className="text-muted mb-4" style={{ maxWidth: "28rem" }}>
            Your bag is empty. Discover pieces from the collection — each one chosen for enduring
            appeal.
          </p>
          <Button as={Link} to="/shop" variant="primary" size="lg">
            Explore the collection
          </Button>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container fluid="xxl" className="px-3 px-lg-5 py-5">
      <motion.div
        className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: easeLux }}
      >
        <header className="vora-page-title border-0 pb-0 mb-0 flex-grow-1">
          <p className="vora-eyebrow mb-2">Review</p>
          <h1 className="mb-0">Shopping bag</h1>
        </header>
        <Button variant="outline-primary" size="sm" onClick={clearCart} className="mt-2">
          Clear bag
        </Button>
      </motion.div>

      <div className="table-responsive vora-table-wrap mb-4">
        <Table className="mb-0 align-middle">
          <thead>
            <tr>
              <th className="ps-4">Item</th>
              <th className="text-end">Price</th>
              <th style={{ width: "120px" }}>Qty</th>
              <th className="text-end">Total</th>
              <th className="pe-4" />
            </tr>
          </thead>
          <tbody>
            {items.map((line, i) => (
              <MotionTr
                key={line.id}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: reduceMotion ? 0 : i * 0.05, ease: easeLux }}
              >
                <td className="ps-4 py-4">
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="flex-shrink-0 overflow-hidden border"
                      style={{ width: 72, height: 72, borderColor: "var(--vora-line)" }}
                    >
                      <img
                        src={line.image}
                        alt=""
                        className="w-100 h-100"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <span className="fw-medium">{line.name}</span>
                  </div>
                </td>
                <td className="text-end text-muted">${line.price.toFixed(2)}</td>
                <td>
                  <Form.Control
                    type="number"
                    min={1}
                    max={99}
                    value={line.quantity}
                    onChange={(e) =>
                      setQuantity(line.id, parseInt(e.target.value, 10) || 1)
                    }
                    size="sm"
                    className="text-center"
                  />
                </td>
                <td className="text-end fw-medium">${(line.price * line.quantity).toFixed(2)}</td>
                <td className="text-end pe-4">
                  <Button
                    variant="link"
                    className="p-0 text-decoration-none"
                    style={{ color: "var(--vora-slate)", fontSize: "0.72rem" }}
                    onClick={() => removeItem(line.id)}
                  >
                    Remove
                  </Button>
                </td>
              </MotionTr>
            ))}
          </tbody>
        </Table>
      </div>

      <Row className="align-items-end justify-content-between g-4 mt-2">
        <Col xs="auto">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            <Button as={Link} to="/shop" variant="outline-primary">
              Continue shopping
            </Button>
          </motion.div>
        </Col>
        <Col xs={12} md="auto" className="text-md-end">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.45, ease: easeLux }}
          >
            <p className="vora-eyebrow mb-1">Subtotal</p>
            <p className="display-6 mb-3">${subtotal.toFixed(2)}</p>
            <p className="small text-muted mb-4">Taxes &amp; shipping calculated at checkout.</p>
            <motion.div whileHover={reduceMotion ? undefined : { scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button as={Link} to="/checkout" size="lg" variant="primary">
                Proceed to checkout
              </Button>
            </motion.div>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}
