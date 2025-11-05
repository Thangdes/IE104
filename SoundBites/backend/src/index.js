import 'dotenv/config';
import express from "express";
import cors from "cors";
import songsRouter from "./routes/songs.js";
import playlistsRouter from "./routes/playlists.js";
import searchRouter from "./routes/search.js";
import albumsRouter from "./routes/albums.js";
import authRouter from "./routes/auth.js";
import favoritesRouter from "./routes/favorites.js";
import userRouter from "./routes/user.js";
import artistsRouter from "./routes/artists.js";

const app = express();
app.use(cors());
// Increase JSON body limit to allow base64 image payloads
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ limit: '15mb', extended: true }));

// Routes
app.use("/api/songs", songsRouter);
app.use("/api/playlists", playlistsRouter);
app.use("/api/search", searchRouter);
app.use("/api/albums", albumsRouter);
app.use("/api/auth", authRouter);
app.use("/api/favorites", favoritesRouter);
app.use("/api/users", userRouter);
app.use("/api/artists", artistsRouter);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
