import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Register from './components/Register';
import Exam from './components/Admin/Exam';
import AddExam from './components/Admin/AddExam';
import ShowQuestion from './components/Admin/ShowQuestion';
import AddQuestion from './components/Admin/AddQuestion';
import StartExam from './components/StartExam';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/" element={<Register/>}/>
        <Route path="/exam" element={<Exam/>}/>
        <Route path="/exam/add" element={<AddExam/>}/>
        <Route path="/exam/add-question" element={<AddQuestion/>}/>
        <Route path="/exam/show-question" element={<ShowQuestion/>}/>
        <Route path="/user/start-exam" element={<StartExam/>}/>
      </Routes>
    </Router>
  );
}

export default App;
