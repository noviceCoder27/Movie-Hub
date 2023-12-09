import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {QueryClient,QueryClientProvider} from 'react-query'
import Home from './pages/Home';
import Movie from './pages/movies/Movie';
import Login from './pages/Login';
import Register from './pages/Register';
import NowPlaying from './pages/movies/NowPlaying';
import Popular from './pages/movies/Popular';
import TopRated from './pages/movies/TopRated';
import Upcoming from './pages/movies/Upcoming';
import Threads from './pages/threads/Threads';
import Thread from './pages/threads/Thread';
import { RecoilRoot} from 'recoil';
import UserThreads from './pages/threads/UserThreads';
import Activities from './pages/Activities';
import NotFound from './pages/NotFound';


function App() {

  const queryClient = new QueryClient();
 
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path = "/" element = {<Home />} />
          <Route path = "/now_playing" element = {<NowPlaying />} />
          <Route path = "/popular" element = {<Popular />} />
          <Route path = "/top_rated" element = {<TopRated />} />
          <Route path = "/upcoming" element = {<Upcoming />} />
          <Route path = "/movies/:movieId" element = {<Movie />} />
          <Route path = "movies/:movieId/threads" element = {<RecoilRoot><Threads /></RecoilRoot>} />
          <Route path = "/myThreads" element = {<UserThreads />} />
          <Route path = "/activities" element = {<Activities />} />
          <Route path = "movies/:movieId/threads/:threadId" element = {<RecoilRoot><Thread /></RecoilRoot>} />
          <Route path = "/login" element = {<Login />}/>
          <Route path = "/register" element = {<Register />}/>
          <Route path = "*" element = {<NotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
