import { products } from "./data/products.js";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export async function fetchProducts() {
  await delay(300);
  return products;
}

export async function fetchProduct(id) {
  await delay(200);
  const product = products.find((p) => p.id === id);
  if (!product) throw new Error("Product not found");
  return product;
}

export async function submitCheckout(payload) {
  await delay(400);
  const { items, email } = payload || {};
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Cart is empty");
  }
  const orderId = `VOR-${Date.now().toString(36).toUpperCase()}`;
  return {
    orderId,
    message: "Order received (demo — no payment processed)",
    email: typeof email === "string" && email.trim() ? email.trim() : null,
    itemCount: items.reduce((n, i) => n + (Number(i.quantity) || 0), 0)
  };
}
