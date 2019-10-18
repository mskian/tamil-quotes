import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', (dateString) => {
  return moment(dateString).format('dddd, MMMM Do, YYYY')
})
Vue.filter('HTMLDate', (dateString) => {
  return moment(dateString).format('YYYY-MM-DD')
})
