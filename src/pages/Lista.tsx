import { useEffect, useState, useCallback } from "react";
import { appsettings } from "../settings/appsettings";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { IEmpleado } from "../Interfaces/IEmpleado";
import { Container, Row, Col, Table, Button, Input } from "reactstrap";

export function Lista() {
    const [empleados, setEmpleados] = useState<IEmpleado[]>([]);
    const [searchTerm, setSearchTerm] = useState(""); // Estado para el buscador
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const employeesPerPage = 10; // Empleados por página

    // Obtener empleados
    const obtenerEmpleados = useCallback(async () => {
        try {
            const response = await fetch(`${appsettings.apiUrl}Empleado/Lista`);
            if (!response.ok) throw new Error("Error al obtener empleados");
            const data = await response.json();
            setEmpleados(data);
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "No se pudo cargar la lista de empleados", "error");
        }
    }, []);

    useEffect(() => {
        obtenerEmpleados();
    }, [obtenerEmpleados]);

    // Eliminar empleado
    const Eliminar = async (id: number) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`${appsettings.apiUrl}Empleado/Eliminar/${id}`, { method: "DELETE" });
                    if (!response.ok) throw new Error("Error al eliminar empleado");
                    await obtenerEmpleados();
                    Swal.fire("Eliminado", "Empleado eliminado correctamente", "success");
                } catch (error) {
                    console.error(error);
                    Swal.fire("Error", "No se pudo eliminar el empleado", "error");
                }
            }
        });
    };

    // Filtrar empleados por búsqueda
    const empleadosFiltrados = empleados.filter((empleado) =>
        `${empleado.nombre} ${empleado.apellidos}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Paginación
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const empleadosPaginados = empleadosFiltrados.slice(indexOfFirstEmployee, indexOfLastEmployee);

    // Cambiar de página
    const totalPages = Math.ceil(empleadosFiltrados.length / employeesPerPage);
    const goToNextPage = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
    const goToPrevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));

    return (
        <Container className="mt-5">
            <Row>
                <Col sm={{ size: 8, offset: 2 }}>
                    <h4>Lista de empleados</h4>
                    <hr />
                    <Link className="btn btn-success mb-3" to="/employees/create">Nuevo Empleado</Link>

                    {/* Buscador */}
                    <Input
                        type="text"
                        placeholder="Buscar por nombre o apellidos..."
                        className="mb-3"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* Tabla de empleados */}
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>Fecha de Nacimiento</th>
                                <th>Foto</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empleadosPaginados.map((item) => (
                                <tr key={item.idEmpleado}>
                                    <td>{item.nombre}</td>
                                    <td>{item.apellidos}</td>
                                    <td>{item.fechaNacimiento ? new Date(item.fechaNacimiento).toLocaleDateString() : 'N/A'}</td>
                                    <td>
                                        {item.urlFoto ? (
                                            <img
                                                src={item.urlFoto}
                                                alt={`Foto de ${item.nombre}`}
                                                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }}
                                            />
                                        ) : (
                                            <span>Sin foto</span>
                                        )}
                                    </td>
                                    <td>
                                        <Link className="btn btn-primary me-2" to={`/employees/update/${item.idEmpleado}`}>
                                            Editar
                                        </Link>
                                        <Button color="danger" onClick={() => Eliminar(item.idEmpleado!)}>
                                            Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {/* Paginación */}
                    <div className="d-flex justify-content-between mt-3">
                        <Button color="secondary" onClick={goToPrevPage} disabled={currentPage === 1}>
                            Anterior
                        </Button>
                        <span>Página {currentPage} de {totalPages}</span>
                        <Button color="secondary" onClick={goToNextPage} disabled={currentPage === totalPages || totalPages === 0}>
                            Siguiente
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
