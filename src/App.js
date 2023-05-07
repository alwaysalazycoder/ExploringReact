import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Main2 from './components/Main2';
import About from './components/About';
import Nav from './components/Nav';
import Table from './components/Table';

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Nav/>}/>
    <Route path="/main" element={<Main/>}/>
    <Route path="/main2" element={<Main2/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path = "/table" element = {<Table/>} />
   </Routes>
   </BrowserRouter>
  );
}

export default App;
