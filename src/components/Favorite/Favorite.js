import React from "react";
import warmHeart from "../../assets/icons/like.svg";
import styles from "./styles.module.css";

const Favorite = ({ favoriteJokes, dislikeTheJoke, contentHeight }) => {
  console.log(contentHeight);
  return (
    <div className={styles.likedJokes} style={{ height: contentHeight }}>
      <h1 className={styles.headline}>Favorite</h1>
      {favoriteJokes.length > 0 ? (
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
      ) : (
        <p className={styles.noJokes}>
          You have not liked any jokes yet &#x2639;{" "}
        </p>
      )}
    </div>
  );
};

export default Favorite;
