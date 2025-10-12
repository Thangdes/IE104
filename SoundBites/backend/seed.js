import { Pool } from "pg";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function seed() {
  const data = JSON.parse(fs.readFileSync("./data.json", "utf8"));

  try {
    // Create tables
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        username TEXT,
        email TEXT,
        password_hash TEXT,
        avatar_url TEXT,
        role TEXT,
        created_at TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS artists (
        artist_id SERIAL PRIMARY KEY,
        name TEXT,
        bio TEXT,
        country TEXT,
        image_url TEXT
      );

      CREATE TABLE IF NOT EXISTS albums (
        album_id SERIAL PRIMARY KEY,
        title TEXT,
        artist_id INT REFERENCES artists(artist_id),
        release_date DATE,
        cover_image TEXT
      );

      CREATE TABLE IF NOT EXISTS genres (
        genre_id SERIAL PRIMARY KEY,
        name TEXT,
        description TEXT
      );

      CREATE TABLE IF NOT EXISTS songs (
        song_id SERIAL PRIMARY KEY,
        title TEXT,
        artist_id INT REFERENCES artists(artist_id),
        album_id INT REFERENCES albums(album_id),
        genre_id INT REFERENCES genres(genre_id),
        duration INT,
        file_url TEXT,
        lyrics TEXT,
        play_count INT,
        upload_date TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS playlists (
        playlist_id SERIAL PRIMARY KEY,
        name TEXT,
        user_id INT REFERENCES users(user_id),
        description TEXT,
        cover_image TEXT,
        created_at TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS playlist_songs (
        playlist_id INT REFERENCES playlists(playlist_id),
        song_id INT REFERENCES songs(song_id),
        added_at TIMESTAMP
      );
    `);

    // Insert data
    for (const table of Object.keys(data)) {
      for (const row of data[table]) {
        const keys = Object.keys(row);
        const values = Object.values(row);
        const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");

        await pool.query(
          `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${placeholders})`,
          values
        );
      }
    }

    console.log("✅ Database seeded successfully!");
  } catch (err) {
    console.error("❌ Error seeding:", err);
  } finally {
    pool.end();
  }
}

seed();
