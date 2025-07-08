import "./assets/tailwind.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Notes from './pages/Notes'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Notes />} />
    </Routes>
  )
}

export default App;
