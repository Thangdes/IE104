import 'dotenv/config';
import express from "express";
import cors from "cors";
import songsRouter from "./routes/songs.js";
import playlistsRouter from "./routes/playlists.js";
import searchRouter from "./routes/search.js";
import albumsRouter from "./routes/albums.js";
import authRouter from "./routes/auth.js";
import favoritesRouter from "./routes/favorites.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/songs", songsRouter);
app.use("/api/playlists", playlistsRouter);
app.use("/api/search", searchRouter);
app.use("/api/albums", albumsRouter);
app.use("/api/auth", authRouter);
app.use("/api/favorites", favoritesRouter);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
