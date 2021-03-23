import { parse, format } from 'date-fns'
import { SHOW_DATE_FORMAT, SAVE_DATE_FORMAT } from '@/utils/constants'

function getCreatedAt(date: string) {
  if (!date) return ''
  const parsedDate = parse(date, SHOW_DATE_FORMAT, new Date())
  return format(parsedDate, SAVE_DATE_FORMAT)
}

export default getCreatedAt
