import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserDetail() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`/users/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('User not found');
                }
                return res.json();
            })
            .then(data => {
                setUser(data);
            })
            .catch(err => {
                setError(err.message);
            });
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <img className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 shadow-md m-4" src={user.profile_picture} alt={user.username}/>
            <h1 className="font-bold text-xl text-black dark:text-white m-2">{user.username}</h1>
            <h2 className="border-b-2 text-black dark:text-white">About me</h2>
            <p className="text-black dark:text-gray-200">{user.bio}</p>
            <h1 className="text-2xl font-bold mb-4 dark:text-white m-4">{user.username}'s Reviews:</h1>
            {user.reviews && user.reviews.length > 0 ? (
                <ul className="flex flex-col items-center w-full">
                    {user.reviews.map(review => (
                        <li 
                        className="bg-white w-2/5 rounded-sm m-1 p-3 shadow-md"
                        key={review.id}>
                            <strong>{review.movie.title}</strong> - Rating: {review.rating} - Comment: {review.comment}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reviews yet</p>
            )}
        </div>
    );
}

export default UserDetail;


