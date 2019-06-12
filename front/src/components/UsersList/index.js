import { connect } from 'react-redux';
import { listUsers, getUser, dismissUser, showSnackbar } from "../../lib/redux/actions"

import styled from './styled'

const mapDispatchToProps = {
  listUsers,
  getUser,
  dismissUser,
  showSnackbar
}

const mapStateToProps = state => {
  const { userData, userInfo } = state.users
  return {
    userData,
    userInfo
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(styled)