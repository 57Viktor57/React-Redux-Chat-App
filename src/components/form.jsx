import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

const mapStateToProps = ({ messageCreatingState, currentChannelId }) => ({
  messageCreatingState,
  currentChannelId
});

@connect(mapStateToProps, actionCreators)
class Form extends React.Component {
  submitFrom = (value) => {
    const { text } = value;
    if (text.trim().length > 0) {
      const newMessage = {
        channelId: this.props.currentChannelId,
        text
      };
      this.props.addMessage(newMessage);
    }
    this.props.reset();
  }

  render() {
    const disabled = this.props.messageCreatingState === 'requested';

    return (
      <form onSubmit={this.props.handleSubmit(this.submitFrom)} className="d-flex justify-content-between mb-3">
          <Field className="form-control" id="input" name="text" component="input"/>
          <button type="submit" disabled={disabled} className="btn btn-primary ml-3">
            Submit
          </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'inputForm',
})(Form);
