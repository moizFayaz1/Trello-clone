import { db } from "@/config/db";
import { delay } from "@/utils/util.delay";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (newUser, { rejectWithValue }) => {
    try {
      await delay(2000);
      const existingUser = await db.users
        .where("email")
        .equals(newUser.email)
        .first();
      if (existingUser) {
        return rejectWithValue("Email already exists.");
      }
      await db.users.add(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      return newUser;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await delay(2000);
      const user = await db.users.where("email").equals(email).first();
      if (!user) {
        throw new Error("Email Not Found.");
      }
      if (!user || user.password !== password) {
        throw new Error("Envalid Credentials");
      }
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
