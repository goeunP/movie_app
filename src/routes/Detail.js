import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  console.log("movie", movie);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>{movie.title}</h1>
          <img src={movie.large_cover_image}></img>
          <div>
            {movie.genres.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </div>
          <h4>rating: {movie.rating}</h4>
          <p>{movie.description_full}</p>
        </div>
      )}
    </div>
  );
}

export default Detail;
