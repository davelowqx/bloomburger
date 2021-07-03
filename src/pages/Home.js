import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import Layout from "../components/Layout";

export default function Home() {
  const [click, setClick] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email);
  };
  return (
    <Layout>
      <Container fluid>
        <Container>
          <div className="m-3 text-center">
            <h4>when mcdonalds creates a bloomberg terminal</h4>
            <p>
              are you sick and tired of working at your day job earning minimum
              wage? are you looking for ways to make 100 baggers consistently?{" "}
              <em>are you ready to live the life of your dreams? </em>
            </p>
            <Form onSubmit={handleSubmit}>
              {click && (
                <Form.Control
                  value={email}
                  type="text"
                  placeholder="Email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              )}
              <Button
                type="sumbit"
                className="my-3"
                block
                onClick={() => {
                  setClick(true);
                }}
              >
                {!click ? "I'M IN" : "LOGIN"}
              </Button>
            </Form>
          </div>
        </Container>
      </Container>
    </Layout>
  );
}
