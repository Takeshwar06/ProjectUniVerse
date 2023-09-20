import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Authentication from './Pages/Authentication';
import HomePage from './Pages/HomePage';
import ProfilePage from './Pages/ProfilePage'
import ProjectPage from './Pages/ProjectPage'
import DocsPage from './Pages/DocsPage';
import MessagePage from './Pages/MessagePage';
import EditProfile from './Pages/EditProfile'
import Navbar from './Components/Navbar';
import MainState from './Components/context/MainState';

function App() {
  return (
    <>
<MainState>
    <Navbar/>
      <Routes>
        {/* user authenticate goto home page */}
        <Route path="/" element={<HomePage />} />
        {/* user need login register goto authentication */}
        <Route path="/auth" element={<Authentication />} />
        {/* after register goto profile section */}
        <Route path="/profile" element={<ProfilePage />} />
        {/* can see Project information */}
        <Route path="/project" element={<ProjectPage />} />
        {/* documentation page */}
        <Route path="/docs" element={<DocsPage />} />
        {/* Messages page */}
        <Route path="/message" element={<MessagePage />} />
        {/* only for testing custom search selection */}
        <Route path="/edit-profile" element={<EditProfile />} />

      </Routes>
</MainState>
    </>
  );
}

export default App;
