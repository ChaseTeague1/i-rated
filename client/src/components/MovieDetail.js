// Add the following imports if you haven't already
import { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(1);
    const [successMessage, setSuccessMessage] = useState("");
    const history = useHistory()

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

    const handleReviewChange = (e) => {
        setReview(e.target.value);
    };

    const handleRatingChange = (e) => {
        setRating(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const reviewData = {
            comment: review,
            rating: parseInt(rating, 10),
        };

        fetch(`/movies/${id}/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reviewData),
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to submit review');
            }
            return res.json();
        })
        .then(data => {
            setMovie(prevMovie => ({
                ...prevMovie,
                reviews: [...prevMovie.reviews, data]
            }));
            setReview("");
            setRating(1);
            setSuccessMessage("Review submitted successfully!");
        })
        .catch(err => {
            setError(err.message);
        });
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-4 dark:text-white">{movie.title}</h1>
            <img 
                className="mb-4 w-64 h-96 object-cover rounded-md" 
                src={movie.poster_image} 
                alt={`${movie.title} poster`} 
            />
            <ul className="flex">
                {movie.genres && movie.genres.map(genre => (
                    <li className="border-2 border-gray-300 rounded-xl m-2 p-1 dark:border-gray-200 dark:bg-gray-500" key={genre.id}>{genre.name}</li>
                ))}
            </ul>
            <p className="dark:text-white">{movie.description}</p>
            <div className="flex items-start border-y-2 border-gray-400 m-2 w-1/3">
                <h2 className="font-bold text-lg mr-10 dark:text-white">Director </h2>
                <p className="text-green-500 items-center">{movie.director}</p>
            </div>
            <div className="flex items-start border-b-2 border-gray-400 m-2 w-1/3">
                <h2 className="font-bold text-lg mr-10 dark:text-white">Cast </h2>
                <p className="text-green-500 items-center">{movie.cast}</p>
            </div>
            <div className="flex items-start border-b-2 border-gray-400 m-2 w-1/3">
                <h2 className="font-bold text-lg mr-10 dark:text-white">Release date </h2>
                <p className="text-green-500">{movie.release_date}</p>
            </div>
            <form onSubmit={handleSubmit} className="mt-4 flex items-center content-center justify-center">
                <input 
                    value={review}
                    onChange={handleReviewChange}
                    rows="4"
                    placeholder="Write your review here..."
                    className="border w-11/12 h-10 rounded-md p-1 text-wrap pr-4"
                    required
                />
                <select value={rating} onChange={handleRatingChange} className="border p-2 rounded-md h-10 m-2">
                    {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>
                <button type="submit" className= "bg-green-400 text-white p-2 rounded-md h-10 m-2">Submit</button>
                {successMessage && <p className="text-green-500">{successMessage}</p>}
            </form>
            <h2 className="text-xl font-semibold mb-4">Reviews:</h2>
            {movie.reviews && movie.reviews.length > 0 ? (
                <ul className="flex flex-col items-center w-full">
                    {movie.reviews.map(review => (
                        <li 
                            className="bg-gray-100 w-2/5 rounded-sm m-1 p-3 shadow-md dark:bg-gray-400"
                            key={review.id}>
                            <p className="font-bold"><Link to={`/users/${review.user.id}`}>{review.user.username}</Link></p>
                            <p>{review.comment} - <strong>Rating: </strong> {review.rating}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reviews yet</p>
            )}
            <button className="rounded-xl bg-green-400 hover:bg-green-600 m-4 p-2" onClick={() => history.goBack()}>Go back</button>
        </div>
    );
}

export default MovieDetail;

