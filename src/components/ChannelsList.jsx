import React from 'react';
import connect from '../connect';
import { channelsSelector } from '../selectors';
import AddChannelForm from './AddChannelForm';
import styles from '../utils';

const mapStateToProps = state => ({
  channels: channelsSelector(state),
  currentChannelId: state.currentChannelId,
});

@connect(mapStateToProps)
class ChannelsList extends React.Component {
  state = { toggle: false };

  handleClick = id => (e) => {
    const { toggleActiveChannel } = this.props;
    e.preventDefault();
    toggleActiveChannel({ id });
  };

  handleToggle = id => () => {
    const { toggle } = this.state;
    const newToggle = id === toggle ? false : id;
    this.setState(() => ({ toggle: newToggle }));
  }

  renderButtonSplit(item) {
    const { currentChannelId } = this.props;
    const style = currentChannelId === item.id ? '' : 'outline-';
    return item.removable && (
      <button type="button" className={styles.buttonSplit(style)} onClick={this.handleToggle(item.id)}>
        <span className="sr-only">Toggle Dropdown</span>
      </button>
    );
  }

  renderDropdown(item) {
    const { toggle } = this.state;

    return item.removable && (
      <div className={styles.dropdown(toggle, item.id)}>
        <button type="button" className="btn btn-secondary w-100">
          Change name
        </button>
        <button type="button" className="btn btn-danger w-100">
          Remove channel
        </button>
      </div>
    );
  }

  renderChannelButton(item) {
    const { currentChannelId } = this.props;
    const style = currentChannelId === item.id ? '' : 'outline-';
    return (
      <button type="button" className={styles.channel(style)} onClick={this.handleClick(item.id)}>
        {item.name}
      </button>
    );
  }

  render() {
    const { channels } = this.props;

    return (
      <ul className="list-group">
        <AddChannelForm />
        {channels.map(item => (
          <li key={item.id} className="list-group-item d-flex justify-content-between btn-toolbar">
            <div className="btn-group w-100 dropdown">
              {this.renderChannelButton(item)}
              {this.renderButtonSplit(item)}
            </div>
            {this.renderDropdown(item)}
          </li>
        ))}
      </ul>
    );
  }
}

export default ChannelsList;
