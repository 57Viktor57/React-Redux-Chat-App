import { connect } from 'react-redux';
import * as actionCreators from './actions';

export default (m = null) => c => connect(m, actionCreators)(c);
