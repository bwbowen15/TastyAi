import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Chat from './pages/Chat';

function App() {
  // basically setting up stuff for example /chat at the end of the link will take u to chat component
  return (
   
    <Router>
      <nav>
        <h1>TastyAi</h1>
      </nav>
      <Routes>
        <Route path="/chat" element={<Chat/>}></Route>
      </Routes>
    </Router>
    
    
  );
}

export default App
