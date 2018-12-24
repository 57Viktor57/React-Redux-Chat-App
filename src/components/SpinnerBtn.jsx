import React from 'react';
import { BeatLoader } from 'react-spinners';

export default class SpinnerBtn extends React.Component {
  render() {
    const { state, text } = this.props;
    if (state !== 'requested') return text;
    return (
      <BeatLoader
        sizeUnit="px"
        size={10}
        color="#fff"
        loading
      />
    );
  }
}
