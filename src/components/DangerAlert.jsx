import React from 'react';
import { Alert } from 'reactstrap';

export default class DangerAlert extends React.Component {
  state = { visible: true };

  onDismiss = () => {
    this.setState({ visible: false });
  }

  render() {
    const { visible } = this.state;

    return (
      <Alert color="danger" className="mt-3 text-center" isOpen={visible} toggle={this.onDismiss}>
        Something went wrong. Check your internet connection.
      </Alert>
    );
  }
}
