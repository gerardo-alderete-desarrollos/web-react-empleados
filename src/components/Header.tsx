import { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  // Estado para controlar la apertura/cierre del menú en dispositivos móviles
  const [isOpen, setIsOpen] = useState(false);

  // Función para alternar el estado del menú
  const toggle = () => setIsOpen(!isOpen);

  // Array con los elementos del menú
  const menuItems = [
    { route: '/home', label: 'Home' },
    { route: '/employees', label: 'Employees' },
    { route: '/upload', label: 'Upload' },
  ];

  return (
    <div>
      <Navbar color="light" light expand="md" className="mb-4">
        <NavbarBrand href="/">Sistema de Empleados</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {menuItems.map((item, index) => (
              <NavItem key={index}>
                <NavLink tag={Link} to={item.route}>
                  {item.label}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;