import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Button } from 'reactstrap';
import SpinnerBtn from './SpinnerBtn';
import connect from '../connect';
import DangerAlert from './DangerAlert';

const mapStateToProps = ({ addChannelState }) => ({
  addChannelState,
});

const isEmpty = (value) => {
  if (!value || value.trim().length === 0) {
    return 'Input characters';
  }
  return null;
};

@connect(mapStateToProps)
@reduxForm({ form: 'addChannelForm' })
class ChannelForm extends React.Component {
  submit = async (value) => {
    const { reset, addChannel } = this.props;
    try {
      await addChannel({
        name: value.name.trim(),
      });
    } catch {
      throw new SubmissionError({ connect: 'ERR_INTERNET_DISCONNECTED', _error: 'ERR_INTERNET_DISCONNECTED' });
    }
    reset();
  }

  render() {
    const {
      handleSubmit, submitting, pristine, addChannelState,
    } = this.props;

    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <div className="d-flex justify-content-between mb-3">
          <Field
            className="form-control"
            validate={[isEmpty]}
            id="input"
            name="name"
            component="input"
            disabled={submitting}
          />
          <Button type="submit" color="primary" disabled={submitting || pristine} className="ml-2">
            <SpinnerBtn text="add" state={addChannelState} />
          </Button>
        </div>
        {addChannelState === 'failed' && <DangerAlert />}
      </form>
    );
  }
}

export default ChannelForm;
