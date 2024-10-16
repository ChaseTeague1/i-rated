#!/usr/bin/env python3

# Standard library imports

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

        return make_response(user.to_dict(), 200)

api.add_resource(UserById, '/users/<int:id>')

class Movies(Resource):
    def get(self):
        movies = [movie.to_dict() for movie in Movie.query.all()]

        return make_response(movies, 200)

api.add_resource(Movies, '/movies')


class MovieById(Resource):
    def get(self, id):
        movie = Movie.query.filter(Movie.id == id).first()

        return make_response(movie.to_dict(), 200)
    
api.add_resource(MovieById, '/movies/<int:id>')

class Reviews(Resource):
    def get(self):
        reviews = [review.to_dict() for review in Review.query.all()]

        return make_response(reviews, 200)
    
api.add_resource(Reviews, '/reviews')

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

