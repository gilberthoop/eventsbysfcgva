import { config } from "dotenv";
import { MongoClient, Collection } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

config();
const uri = process.env.MONGODB_URI || "";
const databaseName = process.env.DATABASE_NAME || "";
const dbCollectionAdmin = process.env.DB_COLLECTION_ADMIN || "";
const client = new MongoClient(uri);

const authSecretKey = process.env.AUTH_SECRET_KEY || "";
const authExpiration = process.env.AUTH_EXPIRATION || "";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await client.connect();
    const database = client.db(databaseName);
    const collection = database.collection(dbCollectionAdmin);

    switch (req.method) {
      case "POST":
        await signIn(req, res, collection);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  } finally {
    await client.close();
  }
};

const signIn = async (
  req: NextApiRequest,
  res: NextApiResponse,
  collection: Collection
) => {
  const { username, password } = req.body;

  try {
    const user = await collection.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ username: user.username }, authSecretKey, {
      expiresIn: authExpiration,
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
