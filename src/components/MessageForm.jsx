import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import connect from '../connect';

const mapStateToProps = ({ currentChannelId, user }) => ({
  currentChannelId,
  user,
});

const required = value => (value ? undefined : 'Input message');
const isEmpty = value => (value.trim().length > 0 ? undefined : 'Input character');

@connect(mapStateToProps)
@reduxForm({ form: 'inputForm' })
class Form extends React.Component {
  submit = (value) => {
    const {
      user, currentChannelId, reset, addMessage,
    } = this.props;
    return addMessage({
      author: user,
      channelId: currentChannelId,
      text: value.text,
    })
      .then(() => reset())
      .catch(() => {
        reset();
        throw new SubmissionError({ connect: 'ERR_INTERNET_DISCONNECTED', _error: 'ERR_INTERNET_DISCONNECTED' });
      });
  }

  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    return (
      <form onSubmit={handleSubmit(this.submit)} className="d-flex justify-content-between mb-3">
        <Field className="form-control" validate={[required, isEmpty]} id="input" name="text" component="input" />
        <button type="submit" disabled={submitting || pristine} className="btn btn-primary ml-3">
          Submit
        </button>
      </form>
    );
  }
}

export default Form;
