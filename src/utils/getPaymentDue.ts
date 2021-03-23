import { parse, format, add } from 'date-fns'
import { SHOW_DATE_FORMAT, SAVE_DATE_FORMAT } from '@/utils/constants'

function getPaymentDue(date: string, paymentTerms?: number) {
  if (!date || !paymentTerms) return ''
  const parsedDate = parse(date, SHOW_DATE_FORMAT, new Date())
  return format(add(parsedDate, { days: paymentTerms }), SAVE_DATE_FORMAT)
}

export default getPaymentDue
