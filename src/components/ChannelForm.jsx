import React from 'react';
import { Field, reduxForm } from 'redux-form';
import connect from '../connect';


const isEmpty = (value) => {
  if (!value || value.trim().length === 0) {
    return 'Input characters';
  }
  return null;
};

@connect(null)
@reduxForm({ form: 'addChannelForm' })
class ChannelForm extends React.Component {
  submit = (value) => {
    const { reset, addChannel } = this.props;
    reset();
    return addChannel({
      name: value.name.trim(),
    });
  }

  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    return (
      <form onSubmit={handleSubmit(this.submit)} className="d-flex justify-content-between mb-3">
        <Field className="form-control" validate={[isEmpty]} id="input" name="name" component="input" />
        <button type="submit" disabled={submitting || pristine} className="btn btn-primary ml-3">
          Add
        </button>
      </form>
    );
  }
}

export default ChannelForm;
