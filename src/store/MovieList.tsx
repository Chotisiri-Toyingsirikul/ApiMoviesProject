import { create } from 'zustand'
import { AllPoster, EachMovie } from '../component'


type MovieList = {
    MovieListStore: EachMovie[]
    setMovieListStore: (value: EachMovie[]) => void
}

export const useStore = create<MovieList>()((set) => ({
    MovieListStore: [],
    setMovieListStore: (value: EachMovie[]) => set((state) => ({ MovieListStore: value })),
}))