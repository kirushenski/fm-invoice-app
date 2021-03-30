import { parse, format, add } from 'date-fns'
import { SHOW_DATE_FORMAT, SAVE_DATE_FORMAT } from '@/utils/constants'

const getPaymentDue = (date: string, paymentTerms: PaymentTerms) => {
  if (!date) return ''
  const parsedDate = parse(date, SHOW_DATE_FORMAT, new Date())
  return format(add(parsedDate, { days: Number(paymentTerms.match(/Net (\d+) Days?/)?.[1]) }), SAVE_DATE_FORMAT)
}

export default getPaymentDue
