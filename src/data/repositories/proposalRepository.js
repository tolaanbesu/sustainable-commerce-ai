import db from "../firebase.js";

export async function saveProposal(data) {
  return db.collection("b2b_proposals").add({
    ...data,
    createdAt: new Date(),
  });
}