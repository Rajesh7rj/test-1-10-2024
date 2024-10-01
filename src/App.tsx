import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegistrationForm from './pages/RegistrationForm';
import ParticipantsList from './pages/ParticipantsList';
import { Provider } from 'react-redux';
import { store } from './store/store';


const App= () => {
  return (
    <Provider store={store}>
    <Router>
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/list" element={<ParticipantsList />} />
      </Routes>
    </div>
    </Router>
    </Provider>
  );
};

export default App;
