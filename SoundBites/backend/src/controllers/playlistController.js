import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const listPlaylists = async (req, res) => {
  try {
    const playlists = await prisma.playlists.findMany({
      include: {
        user: { select: { username: true } },
      },
    });
    res.json(playlists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch playlists" });
  }
};
