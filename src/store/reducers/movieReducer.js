import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http_get } from "../../context/helper/axios";

const state = {
  movieCollection: [],
  searchMovie: [],
  movieDetail: {},
};
const initialState = state;

export const getMovieCollection = createAsyncThunk(
  "movie/get-movie-collection",
  async (data, { rejectWithValue }) => {
    const { params = {} } = data;
    try {
      return await http_get(data.fetchURL, params);
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const searchMovie = createAsyncThunk(
  "movie/search-movie",
  async (data, { rejectWithValue }) => {
    const { params = {} } = data;
    try {
      return await http_get(data.fetchURL, params);
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const movieDetail = createAsyncThunk(
  "movie/detail-movie",
  async (data, { rejectWithValue }) => {
    const { params = {} } = data;
    try {
      return await http_get(data.fetchURL, params);
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const movieReducer = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMovieCollection.fulfilled, (state, action) => {
        let addMarkParams = action.payload.data.results?.map((v) => ({
          ...v,
          savedMovie: false,
          watchLater: false,
        }));
        state.movieCollection[action.meta.arg.rowID] = {
          ...action.meta.arg,
          movies: [...addMarkParams],
        };
      })
      .addCase(searchMovie.fulfilled, (state, action) => {
        if (action.meta.arg.params.page > 1) {
          state.searchMovie.push(...action.payload.data.results);
        } else {
          state.searchMovie = action.payload.data.results;
        }
      })
      .addCase(movieDetail.fulfilled, (state, action) => {
        state.movieDetail = action.payload.data;
      });
  },
});

// export const {} = movieReducer.actions;
export const selectMovieCollection = (state) => state.movie.movieCollection;
export const selectSearchMovie = (state) => state.movie.searchMovie;
export const selectMovieDetail = (state) => state.movie.movieDetail;

export default movieReducer.reducer;