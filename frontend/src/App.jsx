import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Home } from "./pages/Home.jsx";
import { Practice } from "./pages/Practice.jsx";
import { SigninPage } from "./pages/Signin.jsx";
import { SettingsPage } from "./pages/Settings.jsx";
import { SignupPage } from "./pages/Signup.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { UploadPage } from "./pages/Upload.jsx";
import { AllContextProvider } from "../context/contex.jsx";
import { LeaderboardPage } from "./pages/Leaderboard.jsx";


function App() {
  return (
    <>
      <HashRouter basename="/app">
        <AllContextProvider>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
          </Routes>

          <ToastContainer
            position="bottom-left"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition:Bounce
          />
        </AllContextProvider>
      </HashRouter>
    </>
  );
}

export default App;
