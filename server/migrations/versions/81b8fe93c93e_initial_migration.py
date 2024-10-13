"""initial migration

Revision ID: 81b8fe93c93e
Revises: 
Create Date: 2024-10-13 17:03:00.373313

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '81b8fe93c93e'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('genres',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('movies',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('release_date', sa.DateTime(), nullable=False),
    sa.Column('director', sa.String(), nullable=False),
    sa.Column('cast', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('poster_image', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.Column('profile_picture', sa.String(), nullable=True),
    sa.Column('bio', sa.String(), nullable=True),
    sa.Column('role', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('moviegenres',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('movie_id', sa.Integer(), nullable=True),
    sa.Column('genre_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['genre_id'], ['genres.id'], name=op.f('fk_moviegenres_genre_id_genres')),
    sa.ForeignKeyConstraint(['movie_id'], ['movies.id'], name=op.f('fk_moviegenres_movie_id_movies')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('movie_id', sa.Integer(), nullable=True),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('comment', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['movie_id'], ['movies.id'], name=op.f('fk_reviews_movie_id_movies')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_reviews_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reviews')
    op.drop_table('moviegenres')
    op.drop_table('users')
    op.drop_table('movies')
    op.drop_table('genres')
    # ### end Alembic commands ###
