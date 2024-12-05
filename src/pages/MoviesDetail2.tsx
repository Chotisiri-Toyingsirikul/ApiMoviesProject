// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { AllMoviesLists } from '../services/AllMovies';
// import { EachmoviePoster } from '../component/detail';
// import { MovieDetails } from '../types/movie-details';
// import { PopularMovie } from '../types/popular-movie';

// type Props = {};

// const MoviesDetail2 = (props: Props) => {
//     const navigate = useNavigate();

//     const { id } = useParams();

//     const [movieDetail, setMovieDetail] = useState<MovieDetails>();
//     const [popularMovies, setPopularMovies] = useState<PopularMovie>();
//     const [currentMovieIndexSlide, setCurrentMovieIndexSlide] = useState<{
//         startIndex: number;
//         endIndex: number;
//     }>({
//         startIndex: 0,
//         endIndex: 5,
//     });

//     const callOneData = async () => {
//         try {
//             if (id) {
//                 const popularMoviesRes = await AllMoviesLists.popularMovies(); // 20 movies
//                 setPopularMovies(popularMoviesRes.data);
//                 const movieDetailRes = await AllMoviesLists.movieDetail(id); // 1 movie
//                 setMovieDetail(movieDetailRes.data);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         callOneData();
//     }, [id]);

//     const handlePrevMovie = () => {
//         if (!id) return;
//         setCurrentMovieIndexSlide(prevState => ({
//             startIndex: prevState.startIndex - 5,
//             endIndex: prevState.endIndex - 5,      // ลดค่า endIndex ลง 5
//         }));
//     };

//     const handleNextMovie = () => {
//         if (!id) return;
//         setCurrentMovieIndexSlide(prevState => ({
//             startIndex: prevState.startIndex + 5,
//             endIndex: prevState.endIndex + 5,
//         }));
//     };

//     return (
//         <div>
//             {id}
//             <div style={{ marginTop: '20px' }}>
//                 {movieDetail && (
//                     <>
//                         <img src={"https://image.tmdb.org/t/p/w500" + movieDetail.backdrop_path} alt="" />
//                         <h1>{movieDetail.title}</h1>
//                         <p>{movieDetail.overview}</p>
//                     </>
//                 )}



//             </div>
//             {/* <img src={"https://image.tmdb.org/t/p/w500" + movieDetailShow?.posters[0].file_path} alt="" width={'300px'} height={''} />
//             <div style={{ marginTop: '20px' }}>
//                 <button onClick={handlePrevMovie} style={{ marginRight: '20px' }}>◀ Previous</button>
//                 <button onClick={handleNextMovie}>Next ▶</button>
//             </div> */}
//             <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 100px' }}>
//                 <button onClick={handlePrevMovie} style={{ border: "none", background: 'white' }}>
//                     ◀
//                 </button>
//                 <div style={{ display: 'flex', gap: '16px' }}>

//                     {popularMovies?.results
//                         .slice(
//                             currentMovieIndexSlide.startIndex,
//                             currentMovieIndexSlide.endIndex
//                         )
//                         .map((eachMovies) => {
//                             return (
//                                 eachMovies.backdrop_path && (
//                                     <div key={eachMovies.id}>
//                                         <img
//                                             src={
//                                                 'https://image.tmdb.org/t/p/w500' +
//                                                 eachMovies.backdrop_path
//                                             }
//                                             alt={eachMovies.title}
//                                             style={{ width: '200px', height: 'auto' }}
//                                         />
//                                     </div>
//                                 )
//                             );
//                         })}

//                 </div>
//                 <button onClick={handleNextMovie}> ▶</button>

//             </div>



//         </div>
//     );
// };

// export default MoviesDetail2;



// //โค้ดที่พี่ซันทำ 5/12/2567
// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { AllMoviesLists } from '../services/AllMovies';
// import { EachmoviePoster } from '../component/detail';
// import { MovieDetails } from '../types/movie-details';
// import { PopularMovie } from '../types/popular-movie';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
// type Props = {};

// const MoviesDetail = (props: Props) => {
//     const navigate = useNavigate();

//     const { id } = useParams();

//     const [nextPage, setNextPage] = useState(2);
//     const [movieDetail, setMovieDetail] = useState<MovieDetails>();
//     const [popularMovies, setPopularMovies] = useState<PopularMovie>();
//     const [currentMovieIndexSlide, setCurrentMovieIndexSlide] = useState<{
//         startIndex: number;
//         endIndex: number;
//     }>({
//         startIndex: 0,
//         endIndex: 5,
//     });

//     const callOneData = async () => {
//         try {
//             if (id) {
//                 const popularMoviesRes = await AllMoviesLists.popularMovies(1); // 20 movies
//                 setPopularMovies(popularMoviesRes.data);
//                 const movieDetailRes = await AllMoviesLists.movieDetail(id); // 1 movie
//                 setMovieDetail(movieDetailRes.data);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         callOneData();
//     }, [id]);

//     const handlePrevMovie = () => {
//         if (!id) return;
//         setCurrentMovieIndexSlide(prevState => ({
//             startIndex: prevState.startIndex - 5,
//             endIndex: prevState.endIndex - 5,      // ลดค่า endIndex ลง 5
//         }));
//     };

//     const handleNextMovie = () => {
//         if (!id) return;
//         setCurrentMovieIndexSlide(prevState => ({
//             startIndex: prevState.startIndex + 5,
//             endIndex: prevState.endIndex + 5,
//         }));
//     };

//     const handleEdge = async (currentSlide: any) => {
//         if (!popularMovies) return;

//         const totalSlides = popularMovies.results.length;
//         const remainingSlides = totalSlides - currentSlide;

//         // If the user is near the end (you can tweak this threshold)
//         if (remainingSlides <= 8) {
//             // Fetch more movies
//             const popularMoviesRes = await AllMoviesLists.popularMovies(nextPage); // 20 movies
//             const newPopularMovie = popularMoviesRes.data;
//             newPopularMovie.results = [...popularMovies.results, ...newPopularMovie.results];
//             setPopularMovies(newPopularMovie);
//             setNextPage(np => np + 1);
//         }
//     };

//     const setting = {
//         dots: false,
//         infinite: true,
//         speed: 200,
//         slidesToShow: 8,
//         slidesToScroll: 3,
//         afterChange: handleEdge
//     }

//     return (
//         <div>
//             {id}
//             <div style={{ marginTop: '20px' }}>
//                 {movieDetail && (
//                     <>
//                         <img src={"https://image.tmdb.org/t/p/w500" + movieDetail.backdrop_path} alt="" />
//                         <h1>{movieDetail.title}</h1>
//                         <p>{movieDetail.overview}</p>
//                     </>
//                 )}



//             </div>
//             {/* <img src={"https://image.tmdb.org/t/p/w500" + movieDetailShow?.posters[0].file_path} alt="" width={'300px'} height={''} />
//             <div style={{ marginTop: '20px' }}>
//                 <button onClick={handlePrevMovie} style={{ marginRight: '20px' }}>◀ Previous</button>
//                 <button onClick={handleNextMovie}>Next ▶</button>
//             </div> */}
//             <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 100px' }}>
//                 <button onClick={handlePrevMovie} style={{ border: "none", background: 'white' }}>
//                     ◀
//                 </button>
//                 <div style={{ display: 'flex', gap: '16px' }}>
//                     {/*
//           {popularMovies?.results
//             .slice(
//               currentMovieIndexSlide.startIndex,
//               currentMovieIndexSlide.endIndex
//             )
//             .map((eachMovies) => {
//               return (
//                 eachMovies.backdrop_path && (
//                   <div key={eachMovies.id}>
//                     <img
//                       src={
//                         'https://image.tmdb.org/t/p/w500' +
//                         eachMovies.backdrop_path
//                       }
//                       alt={eachMovies.title}
//                       style={{ width: '200px', height: 'auto' }}
//                     />
//                   </div>
//                 )
//               );
//             })} */}


//                 </div>


//                 <button onClick={handleNextMovie}> ▶</button>

//             </div>


//             <Slider  {...setting}
//             >
//                 {popularMovies?.results.map((movie) => {
//                     return <Link to={`/movie/${movie.id}`} className="w-full">
//                         <img
//                             src={'https://image.tmdb.org/t/p/w500' + movie.backdrop_path}
//                             className=" w-[110px] md:min-w-[200px] rounded-lg hover:border-[5px] border-gray-400 hover:scale-110 transition-all duration-150"
//                         />
//                     </Link>
//                 })}
//             </Slider>
//         </div>
//     );
// };

// export default MoviesDetail;
