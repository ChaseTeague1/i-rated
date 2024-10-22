#!/usr/bin/env python3

# Standard library imports
from datetime import datetime
# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Movie, Genre, Review, MovieGenre

# Views go here!

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            if user:
                return make_response(user.to_dict(), 200)
        return {}, 401

api.add_resource(CheckSession, '/check_session')

class Login(Resource):
    def post(self):
        username = request.get_json()['username']
        user = User.query.filter(User.username == username).first()

        session['user_id'] = user.id

        return make_response(user.to_dict(), 200)

api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {}, 204

api.add_resource(Logout, '/logout')


class Signup(Resource):
    def post(self):
        data = request.get_json()

        new_user = User(
            username = data['username'],
            role = data['role'],
            bio = data['bio'],
            profile_picture = data['profile_picture']
        )
        new_user.password_hash = data['password']
        db.session.add(new_user)
        db.session.commit()

        return make_response(new_user.to_dict(), 201)

api.add_resource(Signup, '/signup')

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]

        return make_response(users, 200)

api.add_resource(Users, '/users')

class UserById(Resource):
    def get(self, id):
        user = User.query.filter(User.id == id).first()
        if user:
            reviews = []
            for review in user.reviews:
                review_data = review.to_dict()
                review_data['movie'] = review.movie.to_dict() if review.movie else {'title': 'Unknown Movie'}
                reviews.append(review_data)

            user_data = user.to_dict()
            user_data['reviews'] = reviews
            return make_response(user_data, 200)
        return {'error': 'User not found'}, 404


api.add_resource(UserById, '/users/<int:id>')

class Movies(Resource):
    def get(self):
        movies = [movie.to_dict() for movie in Movie.query.all()]

        return make_response(movies, 200)
    
    def post(self):
        data = request.get_json()

        if 'release_date' in data:
            release_date_str = data['release_date']
            release_date = datetime.strptime(release_date_str[:-1], "%Y-%m-%dT%H:%M:%S.%f")
        else:
            release_date = None 

        new_movie = Movie(
            title = data['title'],
            release_date = release_date,
            director = data['director'],
            cast = data['cast'],
            description = data['description'],
            poster_image = data['poster_image']
        )
        db.session.add(new_movie)
        
        genre_ids = data.get('genres', [])
        for genre_id in genre_ids:
            genre = Genre.query.get(genre_id)
            if genre:
                new_movie.genres.append(genre)
        
        db.session.commit()

        return make_response(new_movie.to_dict(), 201)

api.add_resource(Movies, '/movies')


class MovieById(Resource):
    def get(self, id):
        movie = Movie.query.filter(Movie.id == id).first()
        if movie:
            reviews = [review.to_dict() for review in movie.reviews]
            genres = [genre.to_dict() for genre in movie.genres]
            movie_data = movie.to_dict()
            movie_data['reviews'] = reviews
            movie_data['genres'] = genres
            return make_response(movie_data, 200)
        return {'error': 'Movie not found'}, 404
    
    def delete(self, id):
        movie = Movie.query.filter(Movie.id == id).first()

        if movie: 
            db.session.delete(movie)
            db.session.commit()

            body = {}

            return make_response(body, 204)
        return {'error':'Movie not found'} , 404
    
    def patch(self, id):
        movie = Movie.query.filter(Movie.id == id).first()
        if movie:
            data = request.get_json()
            if 'title' in data:
                movie.title = data['title']
            if 'director' in data:
                movie.director = data['director']
            if 'cast' in data:
                movie.cast = data['cast']
            if 'description' in data:
                movie.description = data['description']
            if 'release_date' in data:
                movie.release_date = datetime.strptime(data['release_date'], "%Y-%m-%d")
            if 'poster_image' in data:
                movie.poster_image = data['poster_image']
            db.session.commit()
            return make_response(movie.to_dict(), 200)
        return {'error': 'Movie not found'}, 404
    
api.add_resource(MovieById, '/movies/<int:id>')

class Reviews(Resource):
    def get(self):
        reviews = [review.to_dict() for review in Review.query.all()]

        return make_response(reviews, 200)
    
api.add_resource(Reviews, '/reviews')

class MovieReviews(Resource):
    def post(self, movie_id):
        user_id = session.get('user_id')
        if not user_id:
            return {'error': 'User not logged in'}, 401 

        data = request.get_json()
        new_review = Review(
            comment=data['comment'],
            rating=data['rating'],
            user_id=user_id,  
            movie_id=movie_id 
        )

        db.session.add(new_review)
        db.session.commit()

        return make_response(new_review.to_dict(), 201)

api.add_resource(MovieReviews, '/movies/<int:movie_id>/reviews')


class ReviewById(Resource):
    def get(self, id):
        review = Review.query.filter(Review.id == id).first()

        return make_response(review.to_dict(), 200)
    
api.add_resource(ReviewById, '/reviews/<int:id>')

class Genres(Resource):
    def get(self):
        genres = [genre.to_dict() for genre in Genre.query.all()]

        return make_response(genres, 200)
    
api.add_resource(Genres, '/genres')

class GenreById(Resource):
    def get(self, id):
        genre = Genre.query.filter(Genre.id == id).first()

        return make_response(genre.to_dict(), 200)

api.add_resource(GenreById, '/genres/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

