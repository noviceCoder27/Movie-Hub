import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {QueryClient,QueryClientProvider} from 'react-query'
import Home from './pages/Home';
import Movies from './pages/movies/Movies';
import Movie from './pages/Movie';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {

  const queryClient = new QueryClient();
 
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path = "/" element = {<Home />} />
          <Route path = "/movies" element = {<Movies/>} />
          <Route path = "/movies/:movieId" element = {<Movie />} />
          <Route path = "/login" element = {<Login />}/>
          <Route path = "/register" element = {<Register />}/>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
