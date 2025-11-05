import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET /api/artists/:id
export const getArtistDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const artistId = Number(id);
    if (!artistId || isNaN(artistId)) {
      return res.status(400).json({ error: "Invalid or missing artist_id" });
    }

    const artist = await prisma.artists.findUnique({
      where: { artist_id: artistId },
    });
    if (!artist) return res.status(404).json({ error: "Artist not found" });

    const [songs, albums] = await Promise.all([
      prisma.songs.findMany({
        where: { artist_id: artistId },
        include: {
          artist: { select: { name: true } },
          album: { select: { album_id: true, title: true, cover_image: true } },
        },
        orderBy: { play_count: "desc" },
      }),
      prisma.albums.findMany({
        where: { artist_id: artistId },
        orderBy: { release_date: "desc" },
        include: {
          artist: { select: { name: true } },
        },
      }),
    ]);

    return res.json({
      artist_id: artist.artist_id,
      name: artist.name,
      bio: artist.bio,
      country: artist.country,
      image_url: artist.image_url,
      songs,
      albums,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch artist detail" });
  }
};
