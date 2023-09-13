import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// import {
//   changeThemeDark,
//   changeThemeLight,
// } from "../../redux/action/changeTheme";

function NavBar() {
  const [isDark, setIsDark] = useState(true);
  // const dispatch = useDispatch();
  const background = useSelector((state) => state.theme.headerBackground);

  useEffect(() => {
    background === "dark" ? setIsDark(true) : setIsDark(false);
  }, [background]);

  // const toogleTheme = () => {
  //   if (isDark) dispatch(changeThemeDark());
  //   else dispatch(changeThemeLight());
  // };

  return (
    <>
      <Navbar bg={isDark ? "dark" : "light"} variant={isDark ? "dark" : "none"}>
        <Container>
          <Navbar.Brand>Recipe Book</Navbar.Brand>
          <Nav className="me-auto">
            <NavLink to="/recipes" className="nav-link">
              Recipes
            </NavLink>
            <NavLink to="/shopping-list" className="nav-link">
              Shopping List
            </NavLink>
          </Nav>
          {/* <Nav>
            <Nav.Link onClick={toogleTheme}>Toogle theme</Nav.Link>
          </Nav> */}
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
