import React from 'react';

export default class App extends React.Component {
  render() {
    console.log(this.props)
    const { channels } = this.props;
    return <ul className="list-group">{channels.map(item => <li key={item.id} className="list-group-item d-flex justify-content-center">{item.name}</li>)}</ul>
  }
}
