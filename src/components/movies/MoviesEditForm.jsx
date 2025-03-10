import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
//might have to change to MoviesForm 
import "./MoviesForm.css";
import { getOneMovie } from "../../api/fetch";
const URL = import.meta.env.VITE_BASE_API_URL

export default function MoviesForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [movie, setMovie] = useState({
    type: "",
    title: "",
    country: "",
    dateAdded: "",
    description: "",
    duration: "",
    listedIn: "",
    rating: "",
    releaseYear: "",
  });

  function handleSubmit(event) {
    event.preventDefault();

    const options = {
      method: "PUT",
      body: JSON.stringify(movie),
      headers: { "Content-Type": "application/json" },
    };

    fetch(`${URL}/movies/${id}`, options)
      .then((response) => response.json())
      .then(() => navigate(`/movies/${id}`));
  }

  function handleTextChange(event) {
    setMovie({
      ...movie,
      [event.target.id]: event.target.value,
    });
  }

  useEffect(() => {
    getOneMovie(id)
      .then((response) => {
        setMovie(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={movie.title}
        onChange={handleTextChange}
      />

      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        value={movie.description}
        onChange={handleTextChange}
      />

      <label htmlFor="type">Type</label>
      <input
        type="text"
        id="type"
        value={movie.type}
        onChange={handleTextChange}
      />

      <label htmlFor="rating">Rating:</label>
      <input
        type="text"
        id="rating"
        value={movie.rating}
        onChange={handleTextChange}
      />

      <label htmlFor="listedIn">Listed in</label>
      <input
        type="text"
        id="listedIn"
        value={movie.listedIn}
        onChange={handleTextChange}
      />

      <label htmlFor="duration">Duration</label>
      <input
        type="text"
        id="duration"
        value={movie.duration}
        onChange={handleTextChange}
      />

      <label htmlFor="releaseYear">Release Year</label>
      <input
        type="text"
        id="releaseYear"
        value={movie.releaseYear}
        onChange={handleTextChange}
      />

      <label htmlFor="country">Country</label>
      <input
        type="text"
        id="country"
        value={movie.country}
        onChange={handleTextChange}
      />

      <label htmlFor="dateAdded">Date added:</label>
      <input
        type="text"
        id="dateAdded"
        value={movie.dateAdded}
        onChange={handleTextChange}
      />

      <br />

      <input type="submit" />
    </form>
  );
}