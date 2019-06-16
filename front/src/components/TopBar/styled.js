import { withStyles } from '@material-ui/styles'
import view from './view'

const styles = {
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1080px',
    margin: 'auto'
  }
}

export default withStyles(styles)(view)
