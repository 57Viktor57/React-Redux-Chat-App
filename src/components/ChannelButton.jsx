import React from 'react';
import {
  ButtonGroup,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import connect from '../connect';
import RenameModalForm from './RenameModalForm';
import RemoveModalForm from './RemoveModalForm';

@connect(() => ({}))
class ChannelButton extends React.Component {
  state = { dropdownOpen: false, renameModal: false, removeModal: false };

  toggleActiveChannel = id => () => {
    const { toggleActiveChannel } = this.props;
    toggleActiveChannel({ id });
  }

  toggleDropdown = () => {
    const { dropdownOpen } = this.state;
    this.setState(() => ({ dropdownOpen: !dropdownOpen }));
  }

  renameModal = () => {
    const { renameModal } = this.state;
    this.setState(() => ({ renameModal: !renameModal }));
  }

  removeModal = () => {
    const { removeModal } = this.state;
    this.setState(() => ({ removeModal: !removeModal }));
  }

  renderDropdown() {
    const { name, id, color } = this.props;
    const { dropdownOpen, renameModal, removeModal } = this.state;

    return (
      <ButtonDropdown isOpen={dropdownOpen} toggle={this.toggleDropdown}>
        <DropdownToggle caret color={color} />
        <DropdownMenu>
          <DropdownItem onClick={this.renameModal}>Change name</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={this.removeModal}>Remove channel</DropdownItem>
        </DropdownMenu>
        <RenameModalForm isOpen={renameModal} toggle={this.renameModal} id={id} />
        <RemoveModalForm isOpen={removeModal} toggle={this.removeModal} id={id} name={name} />
      </ButtonDropdown>
    );
  }

  render() {
    const {
      name, id, color, removable,
    } = this.props;

    return (
      <ButtonGroup className="w-100">
        <Button className="w-100" color={color} onClick={this.toggleActiveChannel(id)}>{name}</Button>
        {removable && this.renderDropdown()}
      </ButtonGroup>
    );
  }
}

export default ChannelButton;
