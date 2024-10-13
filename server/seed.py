#!/usr/bin/env python3

# Standard library imports
from random import randint, sample as rc, choice
from models import User, Movie, Genre, Review, MovieGenre

# Remote library imports
from faker import Faker

# Local imports
from app import app
from config import db

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        # Clear existing data
        db.session.query(MovieGenre).delete()
        db.session.query(Review).delete()
        db.session.query(Movie).delete()
        db.session.query(Genre).delete()
        db.session.query(User).delete()

        # Create users
        users = []
        for _ in range(10):
            user = User(
                username=fake.user_name(),
                password=fake.password(),
                profile_picture=fake.image_url(),
                bio=fake.text(),
                role=choice(['admin', 'user'])  # Use choice for a single selection
            )
            users.append(user)
            db.session.add(user)

        # Create genres
        genres = []
        genre_names = ['Action', 'Drama', 'Comedy', 'Horror', 'Sci-Fi', 'Fantasy']
        for name in genre_names:
            genre = Genre(
                name=name,
                description=fake.text()
            )
            genres.append(genre)
            db.session.add(genre)

        # Create movies
        movies = []
        for _ in range(15):
            movie = Movie(
                title=fake.sentence(nb_words=3),
                release_date=fake.date_this_century(),
                director=fake.name(),
                cast=', '.join([fake.name() for _ in range(4)]),
                description=fake.paragraph(),
                poster_image=fake.image_url()
            )
            movies.append(movie)
            db.session.add(movie)

        # Create reviews
        reviews = []
        for _ in range(30):
            review = Review(
                user=rc(users, k=1)[0],  # Sample 1 user
                movie=rc(movies, k=1)[0],  # Sample 1 movie
                rating=randint(1, 5),
                comment=fake.sentence(),
                created_at=fake.date_time_this_year()
            )
            reviews.append(review)
            db.session.add(review)

        # Create movie-genre relationships
        for movie in movies:
            movie_genres = rc(genres, k=randint(1, 3))  # Sample 1-3 genres
            for genre in movie_genres:
                movie_genre = MovieGenre(
                    movie=movie,
                    genre=genre
                )
                db.session.add(movie_genre)

        # Commit the transaction to the database
        db.session.commit()

        print("Seeding complete!")
