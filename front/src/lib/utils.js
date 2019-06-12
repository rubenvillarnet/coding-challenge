import moment from 'moment'
import 'moment/locale/es'

export const formatDate = date => moment(date).format('DD/MM/YYYY')
export const formatTime = time => moment(time).format('HH:mm')
