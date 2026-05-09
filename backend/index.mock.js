// Mock backend for testing without Auth0
import express from "express";
import { mockAuthMiddleware, mockRequiresAuth } from "./middleware/mockAuth.js";
import cors from "cors";

const app = express();
app.use(mockAuthMiddleware);

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.redirect("http://localhost:5173/profile");
});

app.get("/profile", mockRequiresAuth(), (req, res) => {
  try {
    res.json(req.oidc.user);
  } catch (error) {
    console.log(error);
  }
});

app.get("/logout", (req, res) => {
  res.redirect("http://localhost:5173");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Mock server running on port ${PORT}`));
