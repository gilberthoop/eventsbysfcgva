import { config } from "dotenv";
import { MongoClient, Collection } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

config();
const uri = process.env.MONGODB_URI || "";
const databaseName = process.env.DATABASE_NAME || "";
const dbCollectionAdmin = process.env.DB_COLLECTION_ADMIN || "";
const client = new MongoClient(uri);

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await client.connect();
    const database = client.db(databaseName);
    const collection = database.collection(dbCollectionAdmin);

    switch (req.method) {
      case "POST":
        await signUp(req, res, collection);
        break;
      default:
        res.status(405).json({ error: "Method not allowed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await client.close();
  }
};

const signUp = async (
  req: NextApiRequest,
  res: NextApiResponse,
  collection: Collection
) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await collection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin record
    const newAdmin = {
      username,
      password: hashedPassword,
    };

    // Insert the new admin into the collection
    await collection.insertOne(newAdmin);

    res.status(201).json({ message: "Admin created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
