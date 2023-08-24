import { config } from "dotenv";
import { MongoClient, Collection, ObjectId, Condition } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { SFCEvent } from "@/types";

config();
const uri = process.env.MONGODB_URI || "";
const databaseName = process.env.DATABASE_NAME || "";
const dbCollectionEvents = process.env.DB_COLLECTION_EVENTS || "";
const client = new MongoClient(uri);

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await client.connect();
    const database = client.db(databaseName);
    const collection = database.collection(dbCollectionEvents);

    switch (req.method) {
      case "GET":
        await fetchEvents(req, res, collection);
        break;
      case "POST":
        await submitEvent(req, res, collection);
        break;
      case "DELETE":
        await deleteEvent(req, res, collection);
        break;
      default:
        return res.status(405).end();
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Sorry, we are unable to process your request." });
  } finally {
    await client.close();
  }
};

const fetchEvents = async (
  req: NextApiRequest,
  res: NextApiResponse,
  collection: Collection
) => {
  try {
    const events = await collection.find().toArray();
    res.status(200).json({ events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving events" });
  }
};

const submitEvent = async (
  req: NextApiRequest,
  res: NextApiResponse,
  collection: Collection
) => {
  try {
    const newEvent: SFCEvent = {
      _id: new ObjectId().toString(),
      ...req.body,
    };

    await collection.insertOne(newEvent);
    res.status(201).json({ message: "Successful event addition" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to add new event." });
  }
};

const deleteEvent = async (
  req: NextApiRequest,
  res: NextApiResponse,
  collection: Collection
) => {
  try {
    const { id } = req.query;

    const deleteResult = await collection.findOneAndDelete({
      _id: id as Condition<ObjectId>,
    });

    if (deleteResult.value) {
      res.status(200).json(deleteResult.value);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting event" });
  }
};
