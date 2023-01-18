import classes from "./NewsletterForm.module.css";
import { Col, Form, Button } from "react-bootstrap";

function NewsletterForm() {
  return (
    <Form>
      <Form.Row className="d-flex align-items-end">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Control
            className={classes.newsletterinput}
            type="email"
            placeholder="Your Email address"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formButton">
          <Button className={classes.newsletterbtn} variant="outline-*">
            Go
          </Button>
        </Form.Group>
      </Form.Row>
    </Form>
  );
}

export default NewsletterForm;
