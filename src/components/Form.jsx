import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import connect from '../connect';

const mapStateToProps = ({ messageCreatingState, currentChannelId, user }) => ({
  messageCreatingState,
  currentChannelId,
  user,
});

@connect(mapStateToProps)
@reduxForm({ form: 'inputForm' })
class Form extends React.Component {
  submit = (value) => {
    const { text } = value;
    const {
      currentChannelId,
      user,
      addMessage,
      reset,
    } = this.props;
    if (!text || text.trim().length === 0) {
      reset();
      throw new SubmissionError({
        text: 'Required',
        _error: 'Input message',
      });
    }
    const newMessage = {
      author: user,
      channelId: currentChannelId,
      text,
    };
    reset();
    return addMessage(newMessage);
  }

  render() {
    const { handleSubmit, submitting, error } = this.props;
    const placeholder = error && `${error}`;
    return (
      <form onSubmit={handleSubmit(this.submit)} className="d-flex justify-content-between mb-3">
        <Field className="form-control" placeholder={placeholder} id="input" name="text" component="input" />
        <button type="submit" disabled={submitting} className="btn btn-primary ml-3">
          Submit
        </button>
      </form>
    );
  }
}

export default Form;
