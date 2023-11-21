import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import PrivateRoute from './pages/PrivateRoute/PrivateRoute';
import Layout from './components/layout/layout';
import Dashboard from './pages/dashboard';
import NotFound from './pages/NotFound/NotFound';
import Login from './pages/login';
import Cupones from './pages/Cupones';
import Vecinos from './pages/vecinos';
import Configuracion from './pages/configuracion';
import Deudas from './pages/deudas';


function App() {
  return (
    <div className="bg-azul1  h-screen ">
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/deudas" element={<Deudas />} />
          <Route path="/vecinos" element={<Vecinos />} />
          <Route path="/cupones" element={<Cupones />} />
          <Route path="/configuracion" element={<Configuracion />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </div>
  );
}

export default App;
