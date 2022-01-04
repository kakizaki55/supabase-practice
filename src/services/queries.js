import { checkError, client } from './client.js';
export async function getMovies() {
  const response = await client.from('movies').select('*');
  return checkError(response);
  // return the list of all movies
}

export async function getMoviesWithDirector() {
  const response = await client.from('movies').select(`director_id, directors(name)`);
  return checkError(response);
  // return the list of all the movies with their director
}

export async function getDirectorNames() {
  const response = await client.from('directors').select('name');
  return checkError(response);

  // return the list of the director's names
}

export async function getMovieById(id) {
  const response = await client.from('movies').select('*').match({ id }).single();
  return checkError(response);
  // return the movie with the given id
}

export async function getMovieByTitle(title) {
  const response = await client.from('movies').select('*').match({ title }).single();
  return checkError(response);
  // return the movie with the given title
}

export async function getOldestMovie() {
  const response = await client.from('movies').select('*').gt('year', 0).limit(1).single();
  return checkError(response);
  // return the oldest movie (assume the database is not sorted)
}

export async function getMoviesAfter(year) {
  const response = await client.from('movies').select('*').gt('year', year);
  return checkError(response);
  // return movies made after the year passed in
}

export async function getHighestGrossingMovie() {
  const response = await client
    .from('movies')
    .select('*')
    .order('box_office', { ascending: false })
    .limit(1)
    .single();
  return checkError(response);

  // return movie with the highest box office total
}
