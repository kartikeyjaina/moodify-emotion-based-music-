import "../styles/home.scss";
import React, { useState, useEffect } from "react";
import Player from "../components/Player";
import FaceExpression from "../../expression/components/FaceExpression";
import { useSong } from "../hooks/useSong";
import { useAuth } from "../../auth/hooks/useAuth";

const Home = () => {
  const { handleGetSong, handleGetAllSongs, setSong } = useSong();
  const { user } = useAuth();

  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("discover");

  useEffect(() => {
    async function fetchSongs() {
      const data = await handleGetAllSongs();
      setSongs(data);
      setFilteredSongs(data);
    }
    fetchSongs();
  }, []);

  // 🔍 search logic
  useEffect(() => {
    const filtered = songs.filter((s) =>
      s.title.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredSongs(filtered);
  }, [search, songs]);

  return (
    <>
      <div className="top-bar">
        <h1 className="logo">Moodify</h1>

        {/* 🔍 SEARCH */}
        <input
          type="text"
          placeholder="Search songs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-top"
        />

        <div className="user">{user?.username}</div>
      </div>

      {/* 📌 RIGHT SIDEBAR */}
      <div className="sidebar">
        <button
          className={activeTab === "discover" ? "active" : ""}
          onClick={() => setActiveTab("discover")}
        >
          Discover
        </button>
        <button
          className={activeTab === "scan" ? "active" : ""}
          onClick={() => setActiveTab("scan")}
        >
          Scan Mood
        </button>
      </div>

      {/* 📦 MAIN CONTENT */}
      <div className="main-content">
        {activeTab === "discover" && (
          <>
            {/* 🎵 SONG GRID */}
            <div className="songs-grid">
              {filteredSongs?.map((song) => (
                <div
                  key={song._id}
                  className="song-card"
                  onClick={() => setSong(song)}
                >
                  <img src={song.posterUrl} alt={song.title} />
                  <p>{song.title}</p>

                  <div className="play-btn">
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "scan" && (
          <div className="camera-wrapper">
            <FaceExpression
              onClick={(expression) => {
                if (!expression) return;

                const mood = expression.toLowerCase();
                handleGetSong({ mood });
              }}
            />
          </div>
        )}
      </div>

      <Player />
    </>
  );
};

export default Home;
