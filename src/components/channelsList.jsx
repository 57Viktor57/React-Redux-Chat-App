import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import { channelsSelector } from '../selectors';

const mapStateToProps = state => ({
  channels: channelsSelector(state),
  currentChannelId: state.currentChannelId,
});

@connect(mapStateToProps, actionCreators)
export default class ChannelsList extends React.Component {
  handleClick = (id) => (e) => {
    e.preventDefault();
    this.props.toggleActiveChannel({ id });
  }

  render() {
    const { channels, currentChannelId } = this.props;

    return <ul className="list-group">
      {channels.map(item => {
        const style = currentChannelId === item.id ? '' : 'outline-';
        const classForButton = cn({
          'btn': true,
          'w-100': true,
          [`btn-${style}primary`]: true,
        });
        return (
          <li key={item.id} className="list-group-item d-flex justify-content-center">
          <button type="button" className={classForButton} onClick={this.handleClick(item.id)}>{item.name}</button>
        </li>
      )})}
    </ul>
  }
};
