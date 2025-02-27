import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { createContext, useContext, useState, ReactNode } from "react";
import { Lista } from "./pages/Lista";
import { NuevoEmpleado } from "./pages/NuevoEmpleado";
import { EditarEmpleado } from "./pages/EditarEmpleado";
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import Header from "./components/Header";
import "./styles.css";

// 1️⃣ Contexto de autenticación
interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = (username: string, password: string): boolean => {
    if (username === "admin" && password === "123456") {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

// 2️⃣ Componente de Rutas Protegidas
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

// 3️⃣ App con rutas protegidas y HashRouter
function App() {
  return (
    <AuthProvider>
      <HashRouter>
      <Header /> 
      <main className="container">
        <Routes>
          <Route path="/auth" element={<Login />} />
          <Route
            path="/employees"
            element={
              <ProtectedRoute>
                <Lista />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees/create"
            element={
              <ProtectedRoute>
                <NuevoEmpleado />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees/update/:id"
            element={
              <ProtectedRoute>
                <EditarEmpleado />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Login />} />
        </Routes>
      </main>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;

