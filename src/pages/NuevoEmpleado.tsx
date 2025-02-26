import { ChangeEvent, useState } from "react";
import { appsettings } from "../settings/appsettings";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { IEmpleado } from "../Interfaces/IEmpleado";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const initialEmpleado: IEmpleado = {
  idEmpleado: 0,
  nombre: "",
  apellidos: "",
  contrasena: "",
  fechaNacimiento: "",
  urlFoto: ""
};

export function NuevoEmpleado() {
  const [empleado, setEmpleado] = useState<IEmpleado>(initialEmpleado);
  const [fechaNacimiento, setFechaNacimiento] = useState<Date | null>(null);
  const navigate = useNavigate();

  const inputChangeValue = (event: ChangeEvent<HTMLInputElement>) => { 
    const { name, value } = event.target;
    setEmpleado((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    setFechaNacimiento(date);
    setEmpleado((prev) => ({
      ...prev, 
      fechaNacimiento: date ? new Date(date).toISOString().split("T")[0].replace(/-/g, "/") : "" // Asegura que la fecha esté en formato string
    }));
  };

  const guardar = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`${appsettings.apiUrl}Empleado/Nuevo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(empleado)
      });

      if (response.ok) {
        navigate("/employees");
      } else {
        Swal.fire({
          title: "Error!",
          text: "No se pudo guardar el empleado",
          icon: "error"
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error de Conexión!",
        text: "No se pudo conectar al servidor",
        icon: "error"
      });
    }
  };

  const volver = () => {
    navigate("/employees");
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col lg="6" md="8" sm="12">
          <h4 className="text-center">Nuevo Empleado</h4>
          <hr />
          <Form onSubmit={guardar}>
            <FormGroup>
              <Label>Nombre</Label>
              <Input
                type="text"
                name="nombre"
                maxLength={30}
                required
                onChange={inputChangeValue}
                value={empleado.nombre}
              />
            </FormGroup>
            <FormGroup>
              <Label>Apellidos</Label>
              <Input
                type="text"
                name="apellidos"
                maxLength={30}
                required
                onChange={inputChangeValue}
                value={empleado.apellidos}
              />
            </FormGroup>
            <FormGroup>
              <Label>Contraseña</Label>
              <Input
                type="password"
                name="contrasena"
                required
                onChange={inputChangeValue}
                value={empleado.contrasena}
              />
            </FormGroup>
            <FormGroup>
              <Label>Fecha de Nacimiento</Label>
              <DatePicker
                selected={fechaNacimiento}
                onChange={handleDateChange}
                dateFormat="yyyy/MM/dd"
                className="form-control"
                placeholderText="Seleccione una fecha"
                maxDate={new Date()}
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
              />
            </FormGroup>
            <FormGroup>
              <Label>Foto URL</Label>
              <Input type="text" name="urlFoto" onChange={inputChangeValue} value={empleado.urlFoto} />
            </FormGroup>
            <div className="d-flex justify-content-between">
              <Button color="primary" type="submit">
                Guardar
              </Button>
              <Button color="secondary" onClick={volver}>
                Volver
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
