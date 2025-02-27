import { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav, 
  NavItem,
  NavLink,
  Button
} from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../App';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(prev => !prev);
  const { logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const menuItems = [
    { route: '/home', label: 'Home' },
    { route: '/employees', label: 'Employees' },
    { route: '/upload', label: 'Upload' },
  ];

  if (!isAuthenticated) return null; // No mostrar el Navbar si el usuario no está autenticado

  return (
    <Navbar color="light" light expand="md" className="mb-4 fixed-top shadow">
      <NavbarBrand tag={Link} to="/">Sistema de Empleados</NavbarBrand>
      <NavbarToggler onClick={toggle} aria-label="Toggle navigation" />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ms-auto" navbar>
          {menuItems.map(({ route, label }) => (
            <NavItem key={route}>
              <NavLink
                tag={Link}
                to={route}
                aria-current={location.pathname === route ? 'page' : undefined}
              >
                {label}
              </NavLink>
            </NavItem>
          ))}
          <NavItem className="ms-3">
            <Button color="outline-danger" onClick={logout}>
              Cerrar Sesión
            </Button>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
