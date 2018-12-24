import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import {
  Button, Modal, ModalHeader, ModalBody,
} from 'reactstrap';
import SpinnerBtn from './SpinnerBtn';
import connect from '../connect';
import DangerAlert from './DangerAlert';

const mapStateToProps = ({ renameChannelState }) => ({
  renameChannelState,
});

const isEmpty = (value) => {
  if (!value || value.trim().length === 0) {
    return 'Input characters';
  }
  return null;
};

@connect(mapStateToProps)
@reduxForm({ form: 'RenameChannelForm' })
class RenameChannelForm extends React.Component {
  submit = async (value) => {
    const {
      reset,
      id,
      toggle,
      renameChannel,
      renameChannelFailure,
      renameChannelRequest,
    } = this.props;
    renameChannelRequest();
    try {
      await renameChannel({
        name: value.name.trim(),
        id,
      });
    } catch {
      renameChannelFailure();
      throw new SubmissionError({ connect: 'ERR_INTERNET_DISCONNECTED', _error: 'ERR_INTERNET_DISCONNECTED' });
    }
    reset();
    toggle();
  }

  render() {
    const {
      handleSubmit, submitting, pristine, toggle, isOpen, renameChannelState,
    } = this.props;

    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Rename channel</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(this.submit)}>
            <Field
              className="form-control"
              validate={[isEmpty]}
              id="input"
              name="name"
              component="input"
              disabled={submitting}
            />
            {renameChannelState === 'failed' && <DangerAlert />}
            <div className="w-100 d-flex justify-content-around mt-3">
              <Button color="secondary" onClick={toggle}>Cancel</Button>
              <Button type="submit" color="primary" disabled={submitting || pristine}>
                <SpinnerBtn text="Change" state={renameChannelState} />
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    );
  }
}

export default RenameChannelForm;
