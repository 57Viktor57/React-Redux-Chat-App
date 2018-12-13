import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import {
  Button, Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import connect from '../connect';

const required = value => (value ? undefined : 'Input message');
const empty = value => (value.trim().length > 0 ? undefined : 'Input character');

@connect(() => ({}))
@reduxForm({ form: 'RenameChannelForm' })
class RenameChannelForm extends React.Component {
  submit = (value) => {
    const {
      renameChannel, reset, id, toggle,
    } = this.props;
    return renameChannel({
      name: value.name,
      id,
    })
      .then(() => {
        reset();
        toggle();
      })
      .catch(() => {
        reset();
        throw new SubmissionError({ connect: 'ERR_INTERNET_DISCONNECTED', _error: 'ERR_INTERNET_DISCONNECTED' });
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
            <Field className="form-control" validate={[required, empty]} id="input" name="name" component="input" />
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
