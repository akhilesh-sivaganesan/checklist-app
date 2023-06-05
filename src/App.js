import './App.css';
import FormPage from './pages/FormPage';
import HomePage from './pages/HomePage';
import { Routes, Route } from "react-router-dom";
import Task from './pages/Task';

function App() {

  return (
    <Routes>
      <Route path="/" index element={<HomePage/>}></Route>
      <Route path="/homepage" index element={<HomePage/>}></Route>
      <Route path="/formpage" index element={<FormPage/>}></Route>
      <Route path="/task" index element={<Task/>}></Route>
    </Routes>
  );
}

export default App;