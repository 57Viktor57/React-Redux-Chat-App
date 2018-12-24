import { connect } from 'react-redux';
import * as actionCreators from './actions';

export default
(mapStateToProps = null) => Component => connect(mapStateToProps, actionCreators)(Component);
