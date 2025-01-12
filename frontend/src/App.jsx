import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer'; 
import Home from './Pages/Home';
import About from './Pages/About';
import Profile from './Pages/Profile';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import Registration from './Pages/Registration/Registration';
import Sprofiles from './Pages/Profiles/Sprofiles';
import PrivateRoute from './Components/PrivateRoute';
import PrivateRoute1 from './Components/PrivateRouteProfile';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Gallery from './Pages/Gallery';
import ARegistrations from './Pages/AdminPages/ARegistrations';
import PassActivity from './Pages/Activity/PassActivity';
import AActivity from './Pages/AdminPages/AActivity';
import AActivityPasser from './Pages/AdminPages/AActivityPasser';

function App() {
  return (
    <BrowserRouter>
      {/** Header imported */}
      <div style={{ backgroundColor: '#262626', minHeight: '100vh', padding: '0', margin: '0' }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pass-activity" element={<PassActivity />} />
          <Route path="/about" element={<About />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/aregistrations" element={<ARegistrations/>}/>
          <Route element={<PrivateRoute />}>
            <Route path="/registration" element={<Registration />} />
          </Route>
          <Route element={<PrivateRoute1 />}>
            <Route path="/sprofiles" element={<Sprofiles />} />
          </Route>
          <Route path="/aactivity" element={<AActivity />} />
          <Route path="/aactivitypasser" element={<AActivityPasser />} />
          
          
        </Routes>
        <Footer /> {/** Footer added */}
      </div>
    </BrowserRouter>
  );
}

export default App;
