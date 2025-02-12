const nano = require("nano")("http://admin:azerty31@127.0.0.1:5984");
n

const db = nano.db.use("livres");

class LivreModel {
  static async getAll() {
    const result = await db.list({ include_docs: true });

    return result.rows.map((row) => row.doc);
  }

  static async getById(numero) {

    return await db.get(numero.toString());
  }

  static async create(livreData) {

    livreData._id = livreData.numero.toString();
    return await db.insert(livreData);
  }

  static async update(numero, updateData) {

    const doc = await db.get(numero.toString());

    if (updateData.titre) doc.titre = updateData.titre;
    if (Array.isArray(updateData.pages)) doc.pages = updateData.pages;

    return await db.insert(doc);
  }

  static async delete(numero) {

    const doc = await db.get(numero.toString());
    return await db.destroy(doc._id, doc._rev);
  }
}

module.exports = LivreModel;
