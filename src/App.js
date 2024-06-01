import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import { UserProvider } from './contexts/UserContext';
import { BlogProvider } from './contexts/BlogContext'; // Import BlogProvider
import Add from './components/Add';
import Page from './components/Page';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BlogProvider> {/* Wrap your components with BlogProvider */}
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<Add />} />
              <Route path="/page/:postId" element={<Page />} />
            </Routes>
          </Router>
        </BlogProvider>
      </UserProvider>
    </div>
  );
}

export default App;
