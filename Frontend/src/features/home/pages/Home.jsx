import "../styles/home.scss";
import React, { useState,useEffect } from "react";
import Player from "../components/Player";
import FaceExpression from "../../expression/components/FaceExpression";
import { useSong } from "../hooks/useSong";

const Home = () => {
  const { handleGetSong, handleGetAllSongs } = useSong();

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    async function fetchSongs() {
      const data = await handleGetAllSongs();
      setSongs(data);
    }

    fetchSongs();
  }, []);
  const [showCamera, setShowCamera] = useState(false);
  const [detectedEmotion, setDetectedEmotion] = useState("");

  const validEmotions = ["happy", "sad", "surprised"];

  return (
    <>
      <button
        className="button"
        onClick={() => setShowCamera((prev) => !prev)}
        style={{
          position: "fixed",
          top: "1.25rem",
          right: "1.25rem",
          zIndex: 200,
        }}
      >
        {showCamera ? "Close Camera" : "Open Camera"}
      </button>

      {/* Camera */}
      {showCamera && (
        <div className="camera-popup">
          <FaceExpression
            onClick={(expression) => {
              if (!expression) return;

              const mood = expression.toLowerCase();

              if (!validEmotions.includes(mood)) return;

              //  show emotion on UI
              setDetectedEmotion(expression);

              //  call API
              handleGetSong({ mood });

              //  wait 4 seconds then close
              setTimeout(() => {
                setShowCamera(false);
                setDetectedEmotion("");
              }, 4000);
            }}
          />
        </div>
      )}

      <div className="songs-section">
        <h2>All Songs</h2>

        <div className="songs-grid">
          {songs?.map((song) => (
            <div
              key={song._id}
              className="song-card"
              onClick={() => handleGetSong({ mood: song.mood })}
            >
              <img src={song.posterUrl} alt={song.title} />
              <p>{song.title}</p>
              
            </div>
          ))}
        </div>
      </div>

      <Player />
    </>
  );
};

export default Home;
