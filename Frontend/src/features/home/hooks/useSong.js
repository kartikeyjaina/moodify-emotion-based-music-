import { useContext } from "react";
import { SongContext } from "../song.context";
import { getSong, getAllSongs } from "../service/song.api";
export const useSong = () => {
  const context = useContext(SongContext);
  const { loading, setLoading, song, setSong } = context;

  async function handleGetSong({ mood }) {
    setLoading(true);
    const data = await getSong({ mood });
    setSong(data.song);
    setLoading(false);
  }
  async function handleGetAllSongs() {
    try {
      setLoading(true);

      const data = await getAllSongs();
      return data.songs; // return list
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  return { loading, song, handleGetSong,handleGetAllSongs };
};
