import { connect } from 'react-redux'
import { showSnackbar } from '../../lib/redux/actions'

import styled from './styled'

const mapDispatchToProps = { showSnackbar }

export default connect(
  null,
  mapDispatchToProps
)(styled)
