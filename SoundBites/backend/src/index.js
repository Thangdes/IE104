import express from "express";
import cors from "cors";
import songsRouter from "./routes/songs.js";
import playlistsRouter from "./routes/playlists.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/songs", songsRouter);
app.use("/api/playlists", playlistsRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
