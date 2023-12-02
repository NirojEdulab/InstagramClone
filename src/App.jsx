import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/Homepage/HomePage.jsx"
import AuthPage from "./pages/Authpage/AuthPage.jsx"
import PageLayout from "./Layouts/PageLayout/PageLayout.jsx"
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx"
import useAuthStore from "./store/authStore.js"

function App() {
  const authUser = useAuthStore((state) => state.user);
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : < Navigate to={"/auth"} />} />
        <Route path="/auth" element={!authUser ? <AuthPage /> : < Navigate to={"/"} />} />
        <Route path="/:username" element={<ProfilePage />} />
      </Routes>
    </PageLayout>
  )
}

export default App
