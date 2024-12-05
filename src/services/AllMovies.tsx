import axios from 'axios';
import { AllPoster } from '../component';
import { API_KEY } from '../config';
import { MovieDetails } from '../types/movie-details';
import { MovieImage } from '../types/movie-image';
import { PopularMovie } from '../types/popular-movie';

export const AllMoviesLists = {
  searchMovies: (name: string, page: number) => {
    const response = axios.get<AllPoster>(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${name}&page=${page}`
    );
    return response;
  },
  getAllMovies: () => {
    const response = axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
    );
    return response;
  },
  movieDetail: (id: string) => {
    const response = axios.get<MovieDetails>(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
    );
    return response;
  },
  movieImage: (id: string) => {
    const response = axios.get<MovieImage>(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${API_KEY}`
    );
    return response;
  },
  popularMovies: () => {
    const response = axios.get<PopularMovie>(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
    return response;
  },
};

// https://api.themoviedb.org/3/movie/157336?api_key=9a0fd0b44e717103b3f9f32ac43f1cf8&append_to_response=videos,images&include_video=true

//5/12/2567 ต้องแก้อันนี้ด้วย
// popularMovies: (page: number) => {
//   const response = axios.get<PopularMovie>(
//     `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
//   );
//   return response;
// }