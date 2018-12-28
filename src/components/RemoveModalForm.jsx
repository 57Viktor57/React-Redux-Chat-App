import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import {
  Button, Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import SpinnerBtn from './SpinnerBtn';
import connect from '../connect';
import DangerAlert from './DangerAlert';

const mapStateToProps = ({ removeChannelState }) => ({
  removeChannelState,
});

const isEmpty = (value) => {
  if (!value || value.trim().length === 0) {
    return 'Input characters';
  }
  return null;
};

@connect(mapStateToProps)
@reduxForm({ form: 'RemoveChannelForm' })
class RemoveChannelForm extends React.Component {
  submit = async () => {
    const { id, removeChannel } = this.props;
    try {
      await removeChannel({
        id,
      });
    } catch {
      throw new SubmissionError({ connect: 'ERR_INTERNET_DISCONNECTED', _error: 'ERR_INTERNET_DISCONNECTED' });
    }
  }

  isEqual = (value) => {
    const { name } = this.props;
    return name !== value ? 'Input channel name' : null;
  };

  render() {
    const {
      handleSubmit, submitting, pristine, toggle, isOpen, removeChannelState,
    } = this.props;

    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Are you absolutely sure?</ModalHeader>
        <ModalBody>
          <p>Please type in the name of the repository to confirm.</p>
          <form onSubmit={handleSubmit(this.submit)}>
            <Field
              className="form-control"
              validate={[isEmpty, this.isEqual]}
              id="input"
              name="name"
              component="input"
              disabled={submitting}
            />
            {removeChannelState === 'failed' && <DangerAlert />}
            <div className="w-100 d-flex justify-content-around mt-3">
              <Button color="secondary" onClick={toggle}>Cancel</Button>
              <Button type="submit" color="danger" disabled={submitting || pristine}>
                <SpinnerBtn text="Delete" state={removeChannelState} />
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    );
  }
}

export default RemoveChannelForm;
