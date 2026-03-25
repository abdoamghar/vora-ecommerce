import { motion, useReducedMotion } from "framer-motion";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { easeLux, fadeUp, fadeUpReduced, staggerFast } from "../motion/variants.js";

const heroLine = {
  hidden: { scaleX: 0, originX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.7, ease: easeLux }
  }
};

const editorialBlocks = [
  {
    eyebrow: "01 — Curation",
    title: "Editorial buying",
    body:
      "Every piece earns its place. We favor materials that age beautifully and silhouettes that feel current for years, not weeks."
  },
  {
    eyebrow: "02 — Craft",
    title: "Made to last",
    body:
      "We partner with studios and workshops that share our obsession with detail — from stitch tension to the weight of a ceramic glaze."
  },
  {
    eyebrow: "03 — Experience",
    title: "Seamless service",
    body:
      "Your cart persists as you browse; checkout is distilled to essentials. This demo pairs a React storefront with a lean Express API."
  }
];

export default function Home() {
  const reduceMotion = useReducedMotion();
  const item = reduceMotion ? fadeUpReduced : fadeUp;

  return (
    <>
      <section className="vora-hero-full overflow-hidden">
        <Container fluid="xxl" className="px-0">
          <motion.div
            className="vora-hero-inner"
            variants={staggerFast}
            initial="hidden"
            animate="show"
          >
            <motion.span className="vora-hero-accent d-block" aria-hidden variants={heroLine} />
            <motion.p
              className="vora-hero-tagline text-white-50 mb-2"
              variants={item}
            >
              Every product is hand-picked for quality and style — a focused selection, not an endless
              catalog.
            </motion.p>
            <motion.h1 variants={item}>Quiet luxury for everyday life</motion.h1>
            <motion.p className="lead mb-4" variants={item}>
              A restrained edit of objects, apparel, and electronics — presented with the clarity and
              confidence you expect from a modern luxury house.
            </motion.p>
            <motion.div className="d-flex flex-wrap gap-2" variants={item}>
              <Button as={Link} to="/shop" size="lg" variant="light" className="me-2 mb-2">
                Shop the collection
              </Button>
              <Button
                as="a"
                href="#lookbook"
                size="lg"
                variant="outline-light"
                className="mb-2"
              >
                View lookbook
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <motion.div
        className="vora-marquee"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.55, ease: easeLux }}
      >
        <Container fluid="xxl" className="px-3 px-lg-5">
          <div className="vora-marquee-inner">
            <span>Complimentary shipping · $75+</span>
            <span>Artisan &amp; small-batch partners</span>
            <span>30-day returns</span>
            <span>Carbon-neutral delivery · demo</span>
          </div>
        </Container>
      </motion.div>

      <Container
        fluid="xxl"
        id="lookbook"
        className="px-3 px-lg-5 py-5 my-lg-3 vora-lookbook-anchor"
      >
        <motion.div
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.12, delayChildren: 0.06 }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="row g-4 g-lg-5"
        >
          <motion.div className="col-12" variants={item}>
            <Row className="align-items-end mb-2 mb-md-0">
              <Col lg={8}>
                <p className="vora-eyebrow mb-2">The Vora standard</p>
                <h2 className="display-6 mb-0">Thoughtful selection. Impeccable presentation.</h2>
              </Col>
            </Row>
          </motion.div>
          {editorialBlocks.map((block) => (
            <motion.div className="col-md-4" key={block.eyebrow} variants={item}>
              <motion.div
                className="vora-editorial-card h-100"
                whileHover={reduceMotion ? undefined : { y: -5 }}
                transition={{ duration: 0.35, ease: easeLux }}
              >
                <p className="vora-eyebrow mb-3">{block.eyebrow}</p>
                <h3>{block.title}</h3>
                <p className="text-muted small mb-0 lh-lg">{block.body}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </>
  );
}
