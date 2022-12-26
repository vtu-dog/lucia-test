import { sequence } from "@sveltejs/kit/hooks";

import { auth } from "$common/auth";
import { handleHooks } from "@lucia-auth/sveltekit";

import mongoose from "mongoose";

const cached: {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
} = {
  conn: null,
  promise: null,
};

export default async function connectDatabase() {
  if (cached.conn) {
    console.log(
      "collections",
      await mongoose.connection.db.listCollections().toArray()
    );
    return cached.conn;
  }

  mongoose.set("debug", true);
  mongoose.set("debug", function (coll, method, query, doc) {
    console.log(`mongo ${coll}.${method}`, query, doc);
  });

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      replicaSet: "rs0",
    };

    const connStr =
      "mongodb://localhost:27017,localhost:27018,localhost:27019/register";

    try {
      cached.promise = mongoose.connect(connStr, opts).then((mongoose) => {
        console.info("connected to MongoDB Database");
        return mongoose;
      });
    } catch (e) {
      console.error(e);
    }
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export const handle = sequence(
  handleHooks(auth),
  async ({ resolve, event }) => {
    console.debug(`handle ${event}`);
    await connectDatabase();

    const response = await resolve(event);
    return response;
  }
);
