import React from "react";
import warmHeart from "../../assets/icons/like.svg";
import styles from "./styles.module.css";

const Favorite = ({ favoriteJokes, dislikeTheJoke, contentHeight }) => {
  const desktopWidth = 1440;
  const deviseWidth = document.documentElement.clientWidth;
  const deviseHeight = document.documentElement.clientHeight;
  console.log(deviseHeight);
  return (
    <div className={styles.likedJokes} style={{ height: contentHeight }}>
      <h1 className={styles.headline}>Favorite</h1>
      {favoriteJokes.length > 0 && (
        <ul>
          {favoriteJokes.map((joke) => (
            <li key={joke.id} className={styles.chosenJoke}>
              <img
                id={joke.id}
                onClick={dislikeTheJoke}
                src={warmHeart}
                className={styles.images}
                alt="dislike"
              />
              <p className={styles.forID}>
                ID:
                <a
                  href={`https://api.chucknorris.io/jokes/${joke.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.jokeLink}
                >
                  {joke.id}
                </a>
              </p>
              <p className={styles.jokeValue}>{joke.value}</p>
              <div>
                <p className={styles.updatedTime}>
                  Last update: {joke.hoursPast} hours ago
                </p>
                {joke.categories.length > 0 && (
                  <p className={styles.jokeCategory}>{joke.categories}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      {favoriteJokes.length === 0 && deviseWidth < desktopWidth && (
        <p className={styles.noJokes}>
          You have not liked any jokes yet &#x2639;{" "}
        </p>
      )}
    </div>
  );
};

export default Favorite;
