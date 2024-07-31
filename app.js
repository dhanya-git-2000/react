import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Greet from './components/hello';
import NewPage from './components/newpage';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/"element={<Greet />} />
      <Route path="/newpage" element={<NewPage/>} /> {/* Route for NewPage */}
    </Routes>
  </Router>
    )};
export default App;
