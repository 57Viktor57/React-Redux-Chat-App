import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import connect from '../connect';

const mapStateToProps = ({ user }) => ({
  user,
});

const required = value => (value ? undefined : 'Input message');
const empty = value => (value.trim().length > 0 ? undefined : 'Input character');

@connect(mapStateToProps)
@reduxForm({ form: 'addChannelForm' })
class ChannelForm extends React.Component {
  submit = (value) => {
    const { addChannel, reset } = this.props;
    return addChannel({
      name: value.name,
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
        <Field className="form-control" validate={[required, empty]} id="input" name="name" component="input" />
        <button type="submit" disabled={submitting || pristine} className="btn btn-primary ml-3">
          Add
        </button>
      </form>
    );
  }
}

export default ChannelForm;
