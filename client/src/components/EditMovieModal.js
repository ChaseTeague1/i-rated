import React, { useState } from "react";

function EditMovieModal({ movie, closeModal, onUpdate }) {
    const [formData, setFormData] = useState({
        title: movie.title,
        director: movie.director,
        cast: movie.cast,
        description: movie.description,
        release_date: movie.release_date ? movie.release_date.split('T')[0] : '',
        poster_image: movie.poster_image,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`/movies/${movie.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Failed to update movie');
            }
        })
        .then(updatedMovie => {
            onUpdate(updatedMovie); 
            closeModal(); 
        })
        .catch(err => {
            console.error('Error:', err);
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded">
                <h2 className="text-lg font-semibold mb-2">Edit Movie</h2>
                <label className="block mb-2">
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </label>
                <label className="block mb-2">
                    Director:
                    <input
                        type="text"
                        name="director"
                        value={formData.director}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </label>
                <label className="block mb-2">
                    Cast:
                    <input
                        type="text"
                        name="cast"
                        value={formData.cast}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </label>
                <label className="block mb-2">
                    Description:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </label>
                <label className="block mb-2">
                    Release Date:
                    <input
                        type="date"
                        name="release_date"
                        value={formData.release_date}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </label>
                <label className="block mb-2">
                    Poster Image URL:
                    <input
                        type="text"
                        name="poster_image"
                        value={formData.poster_image}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </label>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2">Save</button>
                <button type="button" onClick={closeModal} className="bg-gray-300 text-black px-4 py-2 ml-2">Cancel</button>
            </form>
        </div>
    );
}

export default EditMovieModal;
