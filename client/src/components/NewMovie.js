import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const NewMovie = ({ onSubmit, initialValues, genres }) => {
  const validationSchema = Yup.object({
    title: Yup.string().max(100, 'Must be 100 characters or less').required('Required'),
    release_date: Yup.date().required('Required'),
    director: Yup.string().max(50, 'Must be 50 characters or less').required('Required'),
    cast: Yup.string().max(200, 'Must be 200 characters or less').required('Required'),
    description: Yup.string().max(500, 'Must be 500 characters or less').required('Required'),
    poster_image: Yup.string().url('Must be a valid URL').optional(),
    genres: Yup.array().min(1, 'At least one genre must be selected').required('Required'),
  });

  const history = useHistory();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg m-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Add a New Movie</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            onSubmit(values);
            setSubmitting(false);
            history.push('/movies');
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="title" className="block font-medium mb-1">Title</label>
                <Field type="text" name="title" className="w-full p-2 border border-gray-300 rounded" />
                <ErrorMessage name="title" component="div" className="text-red-600" />
              </div>

              <div>
                <label htmlFor="release_date" className="block font-medium mb-1">Release Date</label>
                <Field type="date" name="release_date" className="w-full p-2 border border-gray-300 rounded" />
                <ErrorMessage name="release_date" component="div" className="text-red-600" />
              </div>

              <div>
                <label htmlFor="director" className="block font-medium mb-1">Director</label>
                <Field type="text" name="director" className="w-full p-2 border border-gray-300 rounded" />
                <ErrorMessage name="director" component="div" className="text-red-600" />
              </div>

              <div>
                <label htmlFor="cast" className="block font-medium mb-1">Cast</label>
                <Field type="text" name="cast" className="w-full p-2 border border-gray-300 rounded" />
                <ErrorMessage name="cast" component="div" className="text-red-600" />
              </div>

              <div>
                <label htmlFor="description" className="block font-medium mb-1">Description</label>
                <Field as="textarea" name="description" className="w-full p-2 border border-gray-300 rounded" />
                <ErrorMessage name="description" component="div" className="text-red-600" />
              </div>

              <div>
                <label htmlFor="poster_image" className="block font-medium mb-1">Poster Image URL</label>
                <Field type="text" name="poster_image" className="w-full p-2 border border-gray-300 rounded" />
                <ErrorMessage name="poster_image" component="div" className="text-red-600" />
              </div>

              <div>
                <label htmlFor="genres" className="block font-medium mb-1">Genres</label>
                <div role="group" aria-labelledby="checkbox-group" className="space-y-2">
                  {genres.map((genre) => (
                    <label key={genre.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="genres"
                        value={genre.id}
                        checked={values.genres.includes(genre.id)}
                        onChange={() => {
                          if (values.genres.includes(genre.id)) {
                            setFieldValue(
                              'genres',
                              values.genres.filter((id) => id !== genre.id)
                            );
                          } else {
                            setFieldValue('genres', [...values.genres, genre.id]);
                          }
                        }}
                      />
                      <span>{genre.name}</span>
                    </label>
                  ))}
                </div>
                <ErrorMessage name="genres" component="div" className="text-red-600" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewMovie;
