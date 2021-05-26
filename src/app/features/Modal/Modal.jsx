import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const ModalComponent = ({
  showModal,
  onClickSend,
  toggle,
  onSelectInput,
  onChangeRecipients,
  title,
  recipients,
  selectedInput,
  className = "",
}) => {
  const parsedRecipients = recipients.length
    ? recipients?.join(";")
    : recipients;

  return (
    <Modal isOpen={showModal} toggle={toggle} className={className}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="Ingresa el mail del destinatario"
              value={parsedRecipients}
              onChange={onChangeRecipients}
            />
          </FormGroup>
          <FormGroup
            tag="fieldset"
            onChange={onSelectInput}
            defaultValue={selectedInput}
            className="mt-2"
          >
            <legend>Radio Buttons</legend>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="radio1"
                  value="option1"
                  checked={selectedInput === "option1"}
                />{" "}
                Una opción
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="radio1"
                  value="option2"
                  checked={selectedInput === "option2"}
                />{" "}
                Otra opción
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="radio1"
                  value="option3"
                  checked={selectedInput === "option3"}
                />{" "}
                Tercera opción
              </Label>
            </FormGroup>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onClickSend}>
          Send
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalComponent;
