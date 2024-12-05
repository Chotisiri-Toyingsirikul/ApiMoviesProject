import React, { useEffect, useState } from 'react'
import { AllMoviesLists } from '../services/AllMovies'
import { useStore } from '../store/MovieList'
import "./MoviesPage.css";
import { Link } from 'react-router-dom';

type Props = {}

const MoviesPage = (props: Props) => {

    const { MovieListStore, setMovieListStore } = useStore()
    const [name, setName] = useState("");

    const callData = async (name: string) => {
        let response = null;
        if (name) {
            response = await AllMoviesLists.searchMovies(name, 1);
        } else {
            response = await AllMoviesLists.getAllMovies();
        }

        console.log("response.data", response.data.results);
        setMovieListStore(response.data.results);
    }

    useEffect(() => {
        callData(name);
    }, [])

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();


        callData(name);
    }

    return (
        <div style={{ display: 'flex' }}>

            <div style={{

                margin: '50px 0px'

            }}>
                <form onSubmit={onSubmit}>
                    <input value={name} onChange={e => {
                        setName(e.target.value), console.log(e.target.value);
                    }} />
                    <button>Search</button>
                </form>
            </div>


            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '50px',
                justifyContent: 'center',


            }}>
                {MovieListStore.map((Movie: any) => {
                    return (
                        <Link to={`/movies/${Movie.id}`} id={Movie.id} style={{
                            border: '',
                            width: '20%',
                            height: '360px',

                        }}>


                            {Movie.backdrop_path ? <img src={"https://image.tmdb.org/t/p/w500" + Movie.backdrop_path} alt={Movie.title} style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '20px'

                            }} /> : <div>No IMG</div>}

                        </Link>
                    )
                })}
            </div>
            <div>
                sd
            </div>


        </div>
    )
}

export default MoviesPage
// const obj = { a: 1, b: 2, c: 3 };

// for (let key in obj) {
//     console.log();
// }
{/* <iframe width="560" height="315" src="https://www.youtube.com/embed/GuVx-7LE6xw?si=Nks5I3qxQjXaD4rb" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */ }
//คำถามที่จะถามพี่ซันคือผมจะให้มันแสดงหนังทุกเรื่องตอนโหลดหน้าเว็บแต่ทำไมเพิ่ม  useEffect แล้วมันยังไม่ได้ผลตามที่หวัง