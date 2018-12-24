import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Button } from 'reactstrap';
import connect from '../connect';
import SpinnerBtn from './SpinnerBtn';
import DangerAlert from './DangerAlert';

const mapStateToProps = ({ currentChannelId, user, addMessageState }) => ({
  addMessageState,
  currentChannelId,
  user,
});

const isEmpty = (value) => {
  if (!value || value.trim().length === 0) {
    return 'Input characters';
  }
  return null;
};

@connect(mapStateToProps)
@reduxForm({ form: 'inputForm' })
class Form extends React.Component {
  submit = async (value) => {
    const {
      user,
      reset,
      addMessage,
      currentChannelId,
      addMessageRequest,
      addMessageFailure,
    } = this.props;
    addMessageRequest();
    try {
      await addMessage({
        author: user,
        channelId: currentChannelId,
        text: value.text.trim(),
      });
    } catch {
      addMessageFailure();
      throw new SubmissionError({ connect: 'ERR_INTERNET_DISCONNECTED', _error: 'ERR_INTERNET_DISCONNECTED' });
    }
    reset();
  }

  render() {
    const {
      handleSubmit, submitting, pristine, addMessageState,
    } = this.props;

    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <div className="d-flex justify-content-between mb-3">
          <Field
            className="form-control"
            validate={[isEmpty]}
            id="input"
            name="text"
            component="input"
            disabled={submitting}
          />
          <Button type="submit" color="primary" disabled={submitting || pristine} className="ml-2">
            <SpinnerBtn text="submit" state={addMessageState} />
          </Button>
        </div>
        {addMessageState === 'failed' && <DangerAlert />}
      </form>
    );
  }
}

export default Form;
