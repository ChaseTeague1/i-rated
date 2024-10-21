# I-RATED: Movie Review and Rating Platform

Welcome to **I-RATED**, your ultimate destination for discovering, rating, and reviewing movies! Whether you're a film enthusiast or someone searching for the next must-watch movie, **I-RATED** provides an extensive library of films, insightful reviews, and a collaborative community of movie lovers.

## Features

- **Movie Library**: Explore an extensive collection of movies, with detailed information about each.
- **User Reviews and Ratings**: Share your thoughts and rate movies to help others decide what to watch.
- **Movie Genres**: Browse movies by different genres and find your next favorite film.
- **Create and Edit Movies**: As an admin or authorized user, add new movies to the database or update existing ones.
- **Responsive Design**: Optimized for various screen sizes, providing a seamless user experience on desktop and mobile.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Flask, SQLAlchemy
- **Database**: PostgreSQL
- **Form Handling**: Formik, Yup for validation
- **Routing**: React Router

## Setup Instructions

### Prerequisites

Before starting, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/)
- [Python 3](https://www.python.org/downloads/)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Flask](https://flask.palletsprojects.com/en/2.0.x/installation/)
  
### Frontend Setup (React)

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/irated.git
    cd irated/frontend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the development server**:
    ```bash
    npm start
    ```

### Backend Setup (Flask)

1. **Navigate to the backend directory**:
    ```bash
    cd ../backend
    ```

2. **Create a virtual environment**:
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4. **Set up the database**:
    - Make sure PostgreSQL is running and create a database named `irated_db`.
    - Update the database URI in the Flask app's configuration file with your PostgreSQL credentials.

5. **Run database migrations**:
    ```bash
    flask db upgrade
    ```

6. **Run the Flask development server**:
    ```bash
    flask run
    ```

### Environment Variables

Make sure to set the following environment variables for the backend:

- `FLASK_APP`: Name of the main Flask app file (e.g., `app.py`).
- `DATABASE_URL`: The URI for your PostgreSQL database.

You can add these variables to a `.env` file for convenience.

### How to Use

1. **Access the app**: Visit the app in your browser at `http://localhost:3000/` for the frontend and `http://localhost:5000/` for the backend.
2. **Add Movies**: Admin users can add movies by navigating to the "Add Movie" page.
3. **Rate Movies**: Click on a movie card to view its details, leave a review, and rate the movie.
4. **Filter by Genre**: Use the genre filter to explore movies based on specific genres.

