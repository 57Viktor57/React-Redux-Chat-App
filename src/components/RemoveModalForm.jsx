import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Button, Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import store from '../store';
import { removeChannel } from '../actions';

const isEmpty = (value) => {
  if (!value || value.trim().length === 0) {
    return 'Input characters';
  }
  return null;
};

@reduxForm({ form: 'RemoveChannelForm' })
class RemoveChannelForm extends React.Component {
  submit = () => {
    const { reset, id, toggle } = this.props;
    reset();
    toggle();
    return store.dispatch(removeChannel({
      id,
    }));
  }

  isEqual = (value) => {
    const { name } = this.props;
    return name !== value ? 'Input channel name' : null;
  };

  render() {
    const {
      handleSubmit, submitting, pristine, toggle, isOpen,
    } = this.props;

    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Are you absolutely sure?</ModalHeader>
        <ModalBody>
          <p>Please type in the name of the repository to confirm.</p>
          <form onSubmit={handleSubmit(this.submit)}>
            <Field className="form-control" validate={[isEmpty, this.isEqual]} id="input" name="name" component="input" />
            <div className="w-100 d-flex justify-content-around mt-3">
              <Button color="secondary" onClick={toggle}>Cancel</Button>
              <Button type="submit" color="danger" disabled={submitting || pristine}>Delete</Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    );
  }
}

export default RemoveChannelForm;
