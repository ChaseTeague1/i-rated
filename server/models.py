from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

# Models go here!

class Movie(db.Model, SerializerMixin):
    __tablename__ = 'movies'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    release_date = db.Column(db.DateTime, nullable=False)
    director = db.Column(db.String, nullable=False)
    cast = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    poster_image = db.Column(db.String)

    reviews = db.relationship('Review', back_populates='movie')
    genres = db.relationship('Genre', secondary='moviegenres', back_populates='movies')

    serialize_rules = ('-reviews', '-genres',)


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    profile_picture = db.Column(db.String)
    bio = db.Column(db.String)
    role = db.Column(db.String, nullable=False)

    reviews = db.relationship('Review', back_populates='user')

    serialize_rules = ('-reviews',)

    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

class Genre(db.Model, SerializerMixin):
    __tablename__ = 'genres'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)

    movies = db.relationship('Movie', secondary='moviegenres', back_populates='genres')

    serialize_rules = ('-movies', '-moviegenres')  

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'))
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String)
    created_at = db.Column(db.DateTime, nullable=False)

    user = db.relationship('User', back_populates='reviews', viewonly=True)
    movie = db.relationship('Movie', back_populates='reviews', viewonly=True)

    serialize_rules = ('-user', '-movie')

class MovieGenre(db.Model, SerializerMixin):
    __tablename__ = 'moviegenres'

    id = db.Column(db.Integer, primary_key=True)
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'))
    genre_id = db.Column(db.Integer, db.ForeignKey('genres.id'))

    movie = db.relationship('Movie', backref=db.backref('moviegenres', cascade='all, delete-orphan'))
    genre = db.relationship('Genre', backref=db.backref('moviegenres', cascade='all, delete-orphan'))

    serialize_rules = ('-movie', '-genre',)