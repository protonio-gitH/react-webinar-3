import { useCallback, useContext, useEffect, useState } from 'react';
import Main from './main';
import Basket from './basket';
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Product from './product';
import { useParams } from 'react-router-dom';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <BrowserRouter>
        {activeModal === 'basket' && <Basket />}
        <Routes>
          <Route path="/product/:id" element={<Product />}></Route>
          <Route path="/" element={<Main />} />
          <Route path={'/:id'} element={<Main />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
