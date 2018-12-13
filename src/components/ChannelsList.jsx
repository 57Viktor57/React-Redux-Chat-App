import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import connect from '../connect';
import { channelsSelector } from '../selectors';
import ChannelForm from './ChannelForm';
import ChannelButton from './ChannelButton';

const mapStateToProps = state => ({
  channels: channelsSelector(state),
  currentChannelId: state.currentChannelId,
});

@connect(mapStateToProps)
class ChannelsList extends React.Component {
  render() {
    const { channels, currentChannelId } = this.props;
    const color = id => (id === currentChannelId ? 'primary' : 'light');

    return (
      <ListGroup className="w-100">
        <ChannelForm />
        {channels.map(item => (
          <ListGroupItem key={item.id} className="w-100">
            <ChannelButton
              name={item.name}
              id={item.id}
              color={color(item.id)}
              removable={item.removable}
            />
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  }
}

export default ChannelsList;
