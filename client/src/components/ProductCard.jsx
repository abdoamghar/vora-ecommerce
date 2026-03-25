import { motion, useReducedMotion } from "framer-motion";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { easeLux } from "../motion/variants.js";

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart();
  const disabled = !product.inStock;
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: reduceMotion ? 0 : index * 0.07,
        ease: easeLux
      }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
    >
      <Card className="vora-product-card h-100 border-0">
        <Link to={`/product/${product.id}`} className="text-decoration-none text-reset">
          <div className="vora-product-media">
            <img src={product.image} alt={product.name} loading="lazy" />
          </div>
        </Link>
        <Card.Body>
          <p className="vora-eyebrow mb-2">{product.category}</p>
          <Card.Title as="h2" className="h5">
            <Link to={`/product/${product.id}`} className="text-reset text-decoration-none">
              {product.name}
            </Link>
          </Card.Title>
          <div className="d-flex justify-content-between align-items-end mt-3 pt-3 border-top border-secondary border-opacity-10">
            <span className="vora-price">${product.price.toFixed(2)}</span>
            <div className="d-flex gap-2 position-relative z-1" onClick={(e) => e.stopPropagation()}>
              <motion.div whileTap={reduceMotion ? undefined : { scale: 0.97 }}>
                <Button
                  as={Link}
                  to={`/product/${product.id}`}
                  variant="outline-primary"
                  size="sm"
                  className="px-3"
                >
                  Details
                </Button>
              </motion.div>
              <motion.div whileTap={reduceMotion ? undefined : { scale: 0.97 }}>
                <Button
                  size="sm"
                  variant="primary"
                  className="px-3"
                  disabled={disabled}
                  onClick={() => addItem(product)}
                  title={disabled ? "Out of stock" : "Add to bag"}
                >
                  {disabled ? "Unavailable" : "Add"}
                </Button>
              </motion.div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
}
