import React, { Suspense, lazy } from 'react';
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
import AprofileQr from './Pages/AdminPages/AprofileQr';
import { AGallery } from './Pages/AdminPages/AGallery';
import AdminLogin from './Pages/AdminPages/AdminLogin';
import AddAdmin from './Pages/AdminPages/AddAdmin';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from "./Pages/AdminPages/Unauthorized";
import AllPages from "./Pages/AdminPages/allpages";


function App() {
  return (
    <BrowserRouter>
      {/** Header imported */}
      <div style={{ backgroundColor: '#262626', minHeight: '100vh', padding: '0', margin: '0' }}>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          {/* Remove VideoPlayer and CampBadge components */}
          {/* Add your Routes here */}
        </Suspense>
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
          <Route path="/aprofileqr" element={<AprofileQr />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/addadmin" element={<AddAdmin />} /> 
          <Route path="/allpages" element={
            <ProtectedRoute allowedPages={['/allpages']}>
              <AllPages />
            </ProtectedRoute>
          } />
          <Route path="/AGallery" element={
            <ProtectedRoute allowedPage="AGallery">
              <AGallery />
            </ProtectedRoute>
          } />
          <Route path="/AActivity" element={
            <ProtectedRoute allowedPages={['/AActivity']}>
              <AActivity />
            </ProtectedRoute>
          } />
          <Route path="/AActivityPasser" element={
            <ProtectedRoute allowedPages={['/AActivityPasser']}>
              <AActivityPasser />
            </ProtectedRoute>
          } />
          <Route path="/ARegistrations" element={
            <ProtectedRoute allowedPage="ARegistrations">
              <ARegistrations />
            </ProtectedRoute>
          } />
          <Route path="/AProfileQR" element={
            <ProtectedRoute allowedPage="AProfileQR">
              <AprofileQr />
            </ProtectedRoute>
          } />
          <Route path="/AddAdmin" element={
            <ProtectedRoute allowedPages={['/addAdmin']}>
              <AddAdmin />
            </ProtectedRoute>
          } />
          <Route path="/pass-activity" element={
            <ProtectedRoute allowedPage="pass-activity">
              <PassActivity />
            </ProtectedRoute>
          } />

          <Route path="/addAdmin" element={
            <ProtectedRoute allowedPages={['/addAdmin']}>
              <AddAdmin />
            </ProtectedRoute>
          } />

        </Routes>
        <Footer /> {/** Footer added */}
      </div>
    </BrowserRouter>
  );
}

export default App;
