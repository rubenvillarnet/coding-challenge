import { connect } from 'react-redux'
import { hideSnackbar } from '../../lib/redux/actions'
import view from './view'

const mapStateToProps = state => {
  const { snackbar } = state
  return {
    status: snackbar.status,
    message: snackbar.message
  }
}

const mapDispatchToProps = { hideSnackbar }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(view)
