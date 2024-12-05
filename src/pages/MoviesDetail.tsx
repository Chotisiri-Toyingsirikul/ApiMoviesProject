import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AllMoviesLists } from '../services/AllMovies';
import { EachmoviePoster } from '../component/detail';
import { MovieDetails } from '../types/movie-details';
import { PopularMovie } from '../types/popular-movie';

type Props = {};

const MoviesDetail2 = (props: Props) => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [movieDetail, setMovieDetail] = useState<MovieDetails>();
  const [popularMovies, setPopularMovies] = useState<PopularMovie>();
  const [currentMovieIndexSlide, setCurrentMovieIndexSlide] = useState<{
    startIndex: number;
    endIndex: number;
  }>({
    startIndex: 0,
    endIndex: 5,
  });

  const callOneData = async () => {
    try {
      if (id) {
        const popularMoviesRes = await AllMoviesLists.popularMovies(); // 20 movies
        setPopularMovies(popularMoviesRes.data);
        const movieDetailRes = await AllMoviesLists.movieDetail(id); // 1 movie
        console.log(movieDetailRes.data);

        setMovieDetail(movieDetailRes.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callOneData();
  }, [id]);

  const handlePrevMovie = () => {
    if (!id) return;
    setCurrentMovieIndexSlide(prevState => ({
      startIndex: prevState.startIndex - 5,
      endIndex: prevState.endIndex - 5,      // ลดค่า endIndex ลง 5
    }));
  };

  const handleNextMovie = () => {
    if (!id) return;
    setCurrentMovieIndexSlide(prevState => ({
      startIndex: prevState.startIndex + 5,
      endIndex: prevState.endIndex + 5,
    }));
  };

  return (
    <div>
      {id}
      <div style={{ marginTop: '20px' }}>
        {movieDetail && (
          <>
            <div style={{
              marginTop: '20px',
              filter: 'blur(8px)',
              WebkitFilter: 'blur(8px)',
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${movieDetail?.backdrop_path})`, // ตั้งภาพ background
              backgroundSize: 'cover', // ปรับขนาดให้ครอบคลุมทั้ง div
              backgroundPosition: 'center', // จัดตำแหน่งให้อยู่ตรงกลาง
              height: '120vh', // ตั้งความสูงเพื่อให้ภาพ background แสดงชัดเจน (ปรับตามต้องการ)
              color: 'white', // เปลี่ยนสีข้อความเพื่อให้เห็นชัดบน background
            }}>
            </div>

            <div style={{

              color: 'white',
              fontWeight: 'bold',

              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
              width: '40%',
              padding: '20px',
              textAlign: 'center',
            }}>
              <img src={"https://image.tmdb.org/t/p/w500" + movieDetail.poster_path} alt="" style={{ width: '250px', }} />
            </div>
            <div style={{ transform: 'translate(0%, -300%)', color: 'white' }}>
              <h1 >{movieDetail.title}</h1>
              <p>{movieDetail.overview}</p>
            </div>

          </>
        )}



      </div>
      {/* <img src={"https://image.tmdb.org/t/p/w500" + movieDetailShow?.posters[0].file_path} alt="" width={'300px'} height={''} />
            <div style={{ marginTop: '20px' }}>
                <button onClick={handlePrevMovie} style={{ marginRight: '20px' }}>◀ Previous</button>
                <button onClick={handleNextMovie}>Next ▶</button>
            </div> */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 100px' }}>
        <button onClick={handlePrevMovie} style={{ border: "none", background: 'white' }}>
          ◀
        </button>
        <div style={{ display: 'flex', gap: '16px' }}>

          {popularMovies?.results
            .slice(
              currentMovieIndexSlide.startIndex,
              currentMovieIndexSlide.endIndex
            )
            .map((eachMovies) => {
              return (
                eachMovies.backdrop_path && (
                  <div key={eachMovies.id}>
                    <img
                      src={
                        'https://image.tmdb.org/t/p/w500' +
                        eachMovies.backdrop_path
                      }
                      alt={eachMovies.title}
                      style={{ width: '200px', height: 'auto' }}
                    />
                  </div>
                )
              );
            })}

        </div>
        <button onClick={handleNextMovie}> ▶</button>

      </div>



    </div >
  );
};

export default MoviesDetail2;