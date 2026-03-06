import db from "../firebase.js";

export async function saveProduct(product) {
  return db.collection("products").add({
    ...product,
    createdAt: new Date(),
  });
}