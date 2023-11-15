import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {QueryClient,QueryClientProvider} from 'react-query'
import Home from './pages/Home';
import Movies from './pages/movies/Movies';
import Movie from './pages/Movie';

function App() {

  const queryClient = new QueryClient();
 
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path = "/" element = {<Home />} />
          <Route path = "/movies" element = {<Movies/>} />
          <Route path = "/movies/:movieId" element = {<Movie />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
