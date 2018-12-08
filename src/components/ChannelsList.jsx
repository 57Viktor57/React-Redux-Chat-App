import React from 'react';
import cn from 'classnames';
import connect from '../connect';
import { channelsSelector } from '../selectors';

const mapStateToProps = state => ({
  channels: channelsSelector(state),
  currentChannelId: state.currentChannelId,
});

@connect(mapStateToProps)
class ChannelsList extends React.Component {
  handleClick = id => (e) => {
    const { toggleActiveChannel } = this.props;
    e.preventDefault();
    toggleActiveChannel({ id });
  };

  handleStyle(id) {
    const { currentChannelId } = this.props;
    const style = currentChannelId === id ? '' : 'outline-';
    return cn({
      btn: true,
      'w-100': true,
      [`btn-${style}primary`]: true,
    });
  }

  render() {
    const { channels } = this.props;
    return (
      <ul className="list-group">
        {channels.map(item => (
          <li key={item.id} className="list-group-item d-flex justify-content-center">
            <button type="button" className={this.handleStyle(item.id)} onClick={this.handleClick(item.id)}>
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

export default ChannelsList;
