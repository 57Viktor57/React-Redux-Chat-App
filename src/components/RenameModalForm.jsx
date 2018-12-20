import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Button, Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import connect from '../connect';

const isEmpty = (value) => {
  if (!value || value.trim().length === 0) {
    return 'Input characters';
  }
  return null;
};

@connect(null)
@reduxForm({ form: 'RenameChannelForm' })
class RenameChannelForm extends React.Component {
  submit = (value) => {
    const {
      reset,
      id,
      toggle,
      renameChannel,
    } = this.props;
    reset();
    toggle();
    return renameChannel({
      name: value.name.trim(),
      id,
    });
  }

  render() {
    const {
      handleSubmit, submitting, pristine, toggle, isOpen,
    } = this.props;
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Rename channel</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(this.submit)}>
            <Field className="form-control" validate={[isEmpty]} id="input" name="name" component="input" />
            <div className="w-100 d-flex justify-content-around mt-3">
              <Button color="secondary" onClick={toggle}>Cancel</Button>
              <Button type="submit" color="primary" disabled={submitting || pristine}>Change</Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    );
  }
}

export default RenameChannelForm;
