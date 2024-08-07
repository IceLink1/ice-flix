import { ArrowBack } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { MOVIE_LISTS } from '../../../constants';
import {
  useGetFilmsQuery,
  useGetGenresAndCountriesQuery,
} from '../../../services/kinopoiskApi';
import ErrorMessage from '../../ui/ErrorMessage';
import MoviesList from '../../ui/MoviesList/MoviesList';
import SelectMovies from '../../ui/SelectMovies';
import MoviesListMainSkeleton from './MoviesListMainSkeleton';

export default function MoviesListMain() {
  const location = useLocation();
  const { countries, order, year, genreId } = useSelector(
    state => state.currentQuerySlice,
  );
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const movieType = MOVIE_LISTS.find(el => el.url === location.pathname);
  const myGenreId = movieType.url === '/cartoons' ? 18 : genreId;

  const responseFilms = useGetFilmsQuery({
    type: movieType.value,
    countries,
    order,
    year,
    genreId: myGenreId,
    page,
  });

  const responseGenresAndCountries = useGetGenresAndCountriesQuery();

  useEffect(() => {
    setPage(1);
  }, [location]);

  if (responseFilms.error && responseGenresAndCountries.error)
    return <ErrorMessage />;

  if (responseFilms.isLoading || responseGenresAndCountries.isLoading)
    return <MoviesListMainSkeleton />;

  return (
    <>
      <Stack flexDirection="row" sx={{ mt: 2, mb: 2 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} />
        <Typography variant="h4">{movieType.title}</Typography>
      </Stack>
      <SelectMovies
        countriesList={responseGenresAndCountries.data.countries}
        genresList={responseGenresAndCountries.data.genres}
        countries={countries}
        order={order}
        year={year}
        genreId={genreId}
      />
      <MoviesList
        movies={responseFilms.data.items}
        totalPages={responseFilms.data.totalPages}
        page={page}
        setPage={setPage}
      />
    </>
  );
}
