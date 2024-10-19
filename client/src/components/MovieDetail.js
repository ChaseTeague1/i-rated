import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`/movies/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Movie not found');
                }
                return res.json();
            })
            .then(data => {
                setMovie(data);
            })
            .catch(err => {
                setError(err.message);
            });
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!movie) {
        return <div>Loading...</div>;
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
            <img 
                className="mb-4 w-64 h-96 object-cover rounded-md" 
                src={movie.poster_image} 
                alt={`${movie.title} poster`} 
            />
            <h3>Genres:</h3>
            <ul>
                {movie.genres && movie.genres.map(genre => (
                    <li key={genre.id}>{genre.name}</li>
                ))}
            </ul>
            <h2 className="text-xl font-semibold mb-4">Reviews:</h2>
            {movie.reviews && movie.reviews.length > 0 ? (
                <ul className="flex flex-col items-center w-full">
                    {movie.reviews.map(review => (
                        <li 
                            className="bg-white w-2/5 rounded-sm m-1 p-3 shadow-md"
                            key={review.id}>
                            <p className="font-semibold">Reviewed by: <Link to={`/users/${review.user.id}`}>{review.user.username}</Link></p>
                            <p>{review.comment} - Rating: {review.rating}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reviews yet</p>
            )}
        </div>
    );
    
}

export default MovieDetail;

