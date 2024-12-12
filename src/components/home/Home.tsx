import { default as React } from "react";
import { ComicPage } from "../comic-page/ComicPage";
import "./Home.css";

export const Home = () => {
  return (
    <div
      className="home"
      style={{
        backgroundImage: `url("/img/4851275.jpg")`,
        backgroundSize: 'cover'
      }}
    >
      <ComicPage></ComicPage>
    </div>
  );
};
