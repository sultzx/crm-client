import { Container, Row, Col, Card, Button, Navbar, Nav } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, logout, selectIsAuth } from "../redux/slices/user";
import React from "react";

const Header = () => {

  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])

  const { data } = useSelector((state) => state.user);

  const onClickLogout = () => {
    if (window.confirm("Жүйеден шығасыз ба?")) dispatch(logout());
    window.localStorage.removeItem("token");
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="shadow" variant="dark" bg="light" fixed="top" style={{
      fontWeight: '300',
      fontSize: '18px',
      color: 'black',
      backgroundImage: 'linear-gradient(to left, #9BB1FF , #5465FF)',
      height: '80px'

    }}>

      <Container>
        <Navbar.Brand href="/" style={{
          fontSize: '24px'
        }}>
          <span style={{ color: 'yellow', margin: 'auto 6px auto 0' }}>CRM</span>
          Көмек
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" style={{
          backgroundColor: 'transparent'
        }}>
          <Nav className="me-auto" >
            <Nav.Link href="/chat-page">Хат алмасу</Nav.Link>
            {
              data?.role == 'employee' &&
              <>
                <Nav.Link href="/employees">Қызметкерлер</Nav.Link>
                <Nav.Link href="/departments">Бөлімдер</Nav.Link>
                <Nav.Link href="/projects">Жобалар</Nav.Link>
                {/* <Nav.Link href="/">Тапсырмалар</Nav.Link> */}
                
                <Nav.Link href="/calendar">Күнтізбе</Nav.Link>
              </>
            }
            {
              data?.role == 'manager' &&
              <>
                <Nav.Link href="/employees">Қызметкерлер</Nav.Link>
                <Nav.Link href="/departments">Бөлімдер</Nav.Link>
                <Nav.Link href="/projects">Жобалар</Nav.Link>
                {/* <Nav.Link href="/">Тапсырмалар</Nav.Link> */}
                <Nav.Link href="/calendar">Күнтізбе</Nav.Link>
              </>
            }
            {
              data?.role == 'client' &&
              <>
                <Nav.Link href="/my-orders">Менің тапсырыстарым</Nav.Link>
              </>
            }
          </Nav>
          {
            isAuth ?
              <Nav>
                <Nav.Link href="/profile">{data?.email}</Nav.Link>
                <Nav.Link
                  className="signup-btn text-center"
                  style={{
                    padding: 'auto 20px',
                    margin: 'auto 0px auto 12px'
                  }}
                  eventKey={2} onClick={() => {
                    onClickLogout()
                  }}>
                  <div style={{ margin: 'auto 14px' }}>Шығу</div>
                </Nav.Link>
              </Nav>
              :
              <Nav>
                <Nav.Link href="/signin">Кіру</Nav.Link>
                <Nav.Link
                  className="signup-btn text-center"
                  style={{
                    padding: 'auto 20px',
                    margin: 'auto 0px auto 12px'
                  }}
                  eventKey={2} href="/signup">
                  <div style={{ margin: 'auto 14px' }}>Тіркелу</div>
                </Nav.Link>
              </Nav>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header