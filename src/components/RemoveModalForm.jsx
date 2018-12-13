import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import {
  Button, Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import connect from '../connect';

const required = value => (value ? undefined : 'Input message');
const empty = value => (value.trim().length > 0 ? undefined : 'Input character');

@connect(() => ({}))
@reduxForm({ form: 'RemoveChannelForm' })
class RemoveChannelForm extends React.Component {
  submit = () => {
    const {
      removeChannel, reset, id, toggle,
    } = this.props;
    return removeChannel({
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

  comparer = (value) => {
    const { name } = this.props;
    return name === value ? undefined : 'Input channel name';
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
            <Field className="form-control" validate={[required, empty, this.comparer]} id="input" name="name" component="input" />
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
