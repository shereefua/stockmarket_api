import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import StockDetailPage from './Pages/StockDetailPage';
import StockOverviewPage from './Pages/StockOverviewPage';


const App = () => {
  return (
    <main className='container'>
    <BrowserRouter >
    <Routes>
      <Route path="/" element={<StockOverviewPage />}/>
      <Route path="/detail/:stoksymbol" element={<StockDetailPage />}></Route>
    </Routes>
    </BrowserRouter>
    
    
   </main>
  )
}

export default App 