import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import PokemonDetails from '../pages/PokemonDetails';


const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemon/detail" element={<PokemonDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;