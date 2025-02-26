import { useEffect } from "react"

import { Container, Row, Col } from "reactstrap"
import Header from "../components/Header"

export function Upload() {

     useEffect(() => {
     }, [])



     return (
          <Container className="mt-5">
               <Row>
                    <Col sm={{ size: 8, offset: 2 }}>
                        <Header/>
                        <h1>Upload its working</h1>
                    </Col>
               </Row>
          </Container>
     )
}