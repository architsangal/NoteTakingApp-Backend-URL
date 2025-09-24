import { MongoClient } from "mongodb";

let cachedClient = null;

export default async function handler(req, res) {
  try {
    if (!cachedClient) {
      const client = new MongoClient(process.env.MONGO_URI);
      await client.connect();
      cachedClient = client;
    }

    const db = cachedClient.db("backend-url");  // Change to your DB name
    const collection = db.collection("url");    // Change to your collection name

    const doc = await collection.findOne({});
    console.log(doc);
    res.status(200).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch document" });
  }
}
