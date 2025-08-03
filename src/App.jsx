import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Chat from './pages/Chat';
import Home from './pages/Home';

function App() {
  // basically setting up stuff for example /chat at the end of the link will take u to chat component
  return (
   
    <Router>
      <nav>
        <h1>TastyAi</h1>
      </nav>
      <div className='sideNav'>
        <a type='button'>1</a>
        <a type='button'>2</a>
        <a type='button'>3</a>
      </div>
      <Routes>
        <Route path="/chat" element={<Chat/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
      </Routes>
    </Router>
    
    
  );
}

export default App
