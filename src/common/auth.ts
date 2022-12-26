import lucia from "lucia-auth";
import adapter from "@lucia-auth/adapter-mongoose";
import { dev } from "$app/environment";
import mongoose from "mongoose";

export const User =
  mongoose.models.user ||
  mongoose.model(
    "user",
    new mongoose.Schema(
      {
        _id: {
          type: String,
        },
        provider_id: {
          type: String,
          unique: true,
          required: true,
        },
        hashed_password: {
          type: String,
          required: true,
        },
        login: {
          type: String,
          unique: true,
          required: true,
        },
        nickname: {
          type: String,
          unique: true,
          required: true,
        },
        role: {
          type: String,
          required: true,
        },
      },
      { _id: false }
    )
  );

export const Session =
  mongoose.models.session ||
  mongoose.model(
    "session",
    new mongoose.Schema(
      {
        _id: {
          type: String,
        },
        user_id: {
          type: String,
          required: true,
        },
        expires: {
          type: Number,
          required: true,
        },
        idle_expires: {
          type: Number,
          required: true,
        },
      },
      { _id: false }
    )
  );

export const auth = lucia({
  adapter: adapter(mongoose),
  secret: "somesecret",
  env: dev ? "DEV" : "PROD",
  transformUserData: (user) => {
    return {
      id: user.id,
      login: user.login,
      nickname: user.nickname,
      role: user.role,
    };
  },
});

export type Auth = typeof auth;
