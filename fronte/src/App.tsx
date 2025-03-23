import { Route, Routes } from 'react-router-dom';
import UserPage from './components/user';
import DoctorForm from './components/doctor';


function App() {
  return (
      <div className="App">
        <nav className="bg-gray-200 p-4 flex justify-between">
          <a href="/" className="text-blue-600 hover:text-blue-800">User Page</a>
          <a href="/doctor" className="text-blue-600 hover:text-blue-800">Doctor Form</a>
        </nav>
        <Routes>
          <Route path="/doctor" element={<DoctorForm />} />
          <Route path="/" element={<UserPage />} />
        </Routes>
      </div>
  );
}

export default App;
