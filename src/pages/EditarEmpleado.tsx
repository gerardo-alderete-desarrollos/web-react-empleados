import { ChangeEvent, useEffect, useState } from "react"
import { appsettings } from "../settings/appsettings"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import { IEmpleado } from "../Interfaces/IEmpleado"
import { Container,Row,Col, Form,FormGroup, Label, Input, Button } from "reactstrap"

const initialEmpleado = {
     idEmpleado: 0,
     nombre: '',
     apellidos: '',
     contrasena: '',
     fechaNacimiento: new Date(),
     urlFoto: ''
}


export function EditarEmpleado() {

     const {id} = useParams<{id:string}>()
     const [empleado,setEmpleado] = useState<IEmpleado>(initialEmpleado)
     const navigate = useNavigate()

     useEffect(() => {
          const obtenerEmpleado = async() =>{
               const response = await fetch(`${appsettings.apiUrl}Empleado/Obtener/${id}`)
               if(response.ok){
                    const data = await response.json();
                    setEmpleado(data);
               }
          }

          obtenerEmpleado()
     },[])

     const inputChangeValue = (event : ChangeEvent<HTMLInputElement>)=> {
          const inputName = event.target.name;
          const inputValue = event.target.value;

          setEmpleado({ ...empleado, [inputName] : inputValue}) 
     }

     const guardar = async () =>{
          const response = await fetch(`${appsettings.apiUrl}Empleado/Editar`,{
               method: 'PUT',
               headers:{
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify(empleado)
          })
          if(response.ok){
               navigate("/employees")
          }else{
               Swal.fire({
                    title: "Error!",
                    text: "No se pudo editar el empleado",
                    icon: "warning"
                  });
          }

     }

     const volver = () =>{
          navigate("/employees")
     }

     return(
          <Container className="mt-5">
          <Row>
               <Col sm={{size:8, offset:2}}> 
                    <h4>Editar Empleado</h4>
                    <hr/>
                    <Form>
                         <FormGroup>
                              <Label>Nombre</Label>
                              <Input type="text" name="nombre" onChange={inputChangeValue} value={empleado.nombre} />
                         </FormGroup>
                         <FormGroup>
                              <Label>Apellidos</Label>
                              <Input type="text" name="apellidos" onChange={inputChangeValue} value={empleado.apellidos} />
                         </FormGroup>
                         <FormGroup>
                              <Label>Contraseña</Label>
                              <Input type="text" name="contrasena" onChange={inputChangeValue} value={empleado.contrasena} />
                         </FormGroup>
                         <FormGroup>
                              <Label>Fecha de Nacimiento</Label>
                              <Input type="date" name="fechaNacimiento" onChange={inputChangeValue} value={empleado.fechaNacimiento ? new Date(empleado.fechaNacimiento).toISOString().split('T')[0] : ''} />
                         </FormGroup>
                         <FormGroup>
                              <Label>UrlFoto</Label>
                              <Input type="text" name="urlFoto" onChange={inputChangeValue} value={empleado.urlFoto} /> 
                         </FormGroup>
                    </Form>
                    <Button color="primary" className="me-4" onClick={guardar}>Guardar</Button>
                    <Button color="secondary"  onClick={volver}>Volver</Button>
               </Col>
          </Row>
    </Container>
     )
}