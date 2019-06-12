import { connect } from 'react-redux'
import { listUsers, dismissUser, showSnackbar } from '../../lib/redux/actions'
import styled from './styled'

const mapStateToProps = state => {
  const { users } = state
  return { userInfo: users.userInfo }
}

const mapDispatchToProps = {
  listUsers,
  dismissUser,
  showSnackbar
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(styled)
