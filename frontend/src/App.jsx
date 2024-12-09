import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Profile from './Pages/Profile'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import Header from './Components/Header'
import Registration from './Pages/Registration/Registration'
import PrivateRoute from './Components/PrivateRoute'
import Sprofiles from './Pages/Profiles/Sprofiles'
import PrivateRoute1 from './Components/PrivateRouteProfile'


export default function App() {
  return <BrowserRouter>
  {/** Header imported */}
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route element={<PrivateRoute />} >
      <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<PrivateRoute />} >
      <Route path="/registration" element={<Registration />} />
      </Route>
      <Route element={<PrivateRoute1 />} >
      <Route path="/sprofiles" element={<Sprofiles />} />
      </Route>
    </Routes>
  
  </BrowserRouter>
}
