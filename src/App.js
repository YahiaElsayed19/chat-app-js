import { useContext } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import { AuthContextProvider } from './store/AuthContext'
import { ChatContextProvider } from './store/ChatContext'
import { AuthContext } from './store/AuthContext'

function ProtectedRoute({ children }) {
  const { currentUser } = useContext(AuthContext)

  if (!currentUser) {
    return <Navigate to="/login" replace={true} />
  }
  return children
}
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
  ])
  return (
    <AuthContextProvider>
      <ChatContextProvider>
        <RouterProvider router={router} />
      </ChatContextProvider>
    </AuthContextProvider>
  )
}

export default App
