import React from "react";
import Player from "../components/Player";
import FaceExpression from "../../expression/components/FaceExpression";
import { useSong } from "../hooks/useSong";
const Home = () => {
  const { handleGetSong } = useSong();
  return (
    <>
      <FaceExpression
        onClick={(expression) => {
          handleGetSong({ mood: expression });
        }}
      />
      <Player />
    </>
  );
};

export default Home;
