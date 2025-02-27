import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardHeader,
  FormFeedback,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useAuth } from "../App";

const Login = () => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("123456");
  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    setUsernameValid(value.length >= 3);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordValid(value.length >= 6);
  };

  const preventCopyPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isUsernameValid = username.length >= 3;
    const isPasswordValid = password.length >= 6;

    setUsernameValid(isUsernameValid);
    setPasswordValid(isPasswordValid);

    if (!isUsernameValid || !isPasswordValid) {
      console.log("Formulario inválido");
      return;
    }

    try {
      const success = await login(username, password);
      if (success) {
        navigate("/employees");
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch (err) {
      console.error("Error en el login:", err);
      setError("Hubo un error, intenta nuevamente.");
    }
  };

  return (
    <div className="dark-mode">
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            <Card className="bg-dark text-white">
              <CardHeader className="bg-secondary text-center">
                <h3>Iniciar Sesión</h3>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="username">Nombre de Usuario</Label>
                    <Input
                      type="text"
                      id="username"
                      value={username}
                      onChange={handleUsernameChange}
                      onPaste={preventCopyPaste}
                      onCopy={preventCopyPaste}
                      onCut={preventCopyPaste}
                      invalid={!usernameValid}
                      className="bg-dark text-white"
                    />
                    <FormFeedback>
                      El nombre de usuario debe tener al menos 3 caracteres
                    </FormFeedback>
                  </FormGroup>

                  <FormGroup>
                    <Label for="password">Contraseña</Label>
                    <Input
                      type="password"
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      onPaste={preventCopyPaste}
                      onCopy={preventCopyPaste}
                      onCut={preventCopyPaste}
                      invalid={!passwordValid}
                      className="bg-dark text-white"
                    />
                    <FormFeedback>
                      La contraseña debe tener al menos 6 caracteres
                    </FormFeedback>
                  </FormGroup>

                  <Button color="primary" block>
                    Iniciar Sesión
                  </Button>
                </Form>
                {error && <p className="text-danger mt-2">{error}</p>}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Estilos para el modo oscuro */}
      <style>
        {`
          body {
            background-color: #121212;
            color: white;
          }
          .dark-mode {
            background-color: #121212;
            color: white;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
