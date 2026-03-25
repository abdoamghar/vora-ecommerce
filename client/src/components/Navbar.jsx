import { motion, useReducedMotion } from "framer-motion";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { easeLux } from "../motion/variants.js";

const linkClass = ({ isActive }) =>
  `nav-link ${isActive ? "active" : ""}`;

export default function AppNavbar() {
  const { totalItems } = useCart();
  const reduceMotion = useReducedMotion();

  return (
    <motion.header
      initial={reduceMotion ? false : { y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: easeLux }}
    >
      <Navbar expand="lg" className="navbar-vora navbar-light mb-0 sticky-top">
        <Container fluid="xxl" className="px-3 px-lg-5">
          <Navbar.Brand as={Link} to="/" className="me-lg-5">
            Vora
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="vora-nav" />
          <Navbar.Collapse id="vora-nav" className="justify-content-end">
            <Nav className="align-items-lg-center gap-lg-1">
              <Nav.Link as={NavLink} to="/" className={linkClass} end>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/shop" className={linkClass}>
                Collection
              </Nav.Link>
              <Nav.Link as={NavLink} to="/cart" className={linkClass}>
                Bag
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 28 }}
                    className="d-inline-block"
                  >
                    <Badge className="ms-2 rounded-pill">{totalItems}</Badge>
                  </motion.span>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.header>
  );
}
