// app/model/livreModel.js
const nano = require("nano")("http://admin:azerty31@127.0.0.1:5984");
// Adaptez l'URL, le login et le mot de passe à votre installation

const db = nano.db.use("livres");

class LivreModel {
  static async getAll() {
    const result = await db.list({ include_docs: true });
    // result.rows contient un tableau d'objets { id, key, value, doc }
    // On retourne simplement doc qui contient nos champs (numero, titre, pages, etc.)
    return result.rows.map((row) => row.doc);
  }

  static async getById(numero) {
    // On considère _id = numero.toString() dans CouchDB
    return await db.get(numero.toString());
  }

  static async create(livreData) {
    // Ici, on force _id = numero.toString() pour qu'il corresponde au "numero"
    livreData._id = livreData.numero.toString();
    return await db.insert(livreData);
  }

  static async update(numero, updateData) {
    // Il faut d'abord récupérer le doc existant pour avoir son _rev
    const doc = await db.get(numero.toString());
    // Mise à jour des champs
    if (updateData.titre) doc.titre = updateData.titre;
    if (Array.isArray(updateData.pages)) doc.pages = updateData.pages;
    // On réinsère le doc (CouchDB mettra à jour _rev)
    return await db.insert(doc);
  }

  static async delete(numero) {
    // Pour supprimer, on a besoin de _id et _rev
    const doc = await db.get(numero.toString());
    return await db.destroy(doc._id, doc._rev);
  }
}

module.exports = LivreModel;
