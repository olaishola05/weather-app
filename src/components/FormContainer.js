import React from "react";
import {
    Button,
    Container,
    Row,
    Col,
    Form,
} from "react-bootstrap";

function FormContainer(props) {
    return (
        <>
            <Container>
                <Form
                    className="mb-3 form-container"
                    onSubmit={props.handleSubmit}
                >
                    <Form.Group
                        as={Row}
                        controlId="formBasicText"
                    >
                        <Form.Label
                            htmlFor="location"
                            className=""
                        >
                            Enter City:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                controlId
                                className="input-width"
                                type="text"
                                id="city"
                                name="city"
                                value={props.query}
                                onChange={props.handleChange}
                                placeholder="Enter
                                Location"
                            ></Form.Control>
                        </Col>
                        <Form.Text className="text-muted text-center">
                            Search for your preferred weather
                            location
                        </Form.Text>
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        className="btn"
                    >
                        Search
                    </Button>
                </Form>
            </Container>
        </>
    );
}

export default FormContainer;
