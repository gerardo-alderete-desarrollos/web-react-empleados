import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold">404 - Página No Encontrada</h1>
      <p className="text-lg mt-2">La ruta que buscas no existe.</p>
      <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Volver al Inicio
      </Link>
    </div>
  );
};

export default NotFound;
