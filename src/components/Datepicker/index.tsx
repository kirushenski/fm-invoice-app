import React from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { DateUtils, DayPickerInputProps } from 'react-day-picker'
import { format as dateFnsFormat, parse as dateFnsParse } from 'date-fns'
import Calendar from '@/icons/calendar.svg'
import ArrowLeft from '@/icons/arrow-left.svg'
import ArrowRight from '@/icons/arrow-right.svg'
import 'react-day-picker/lib/style.css'

export interface DatepickerProps extends DayPickerInputProps {
  children: string
  className: string
}

function Datepicker({ children, className = '', dayPickerProps, ...props }: DatepickerProps) {
  const parseDate = (str: string, format: string) => {
    const parsed = dateFnsParse(str, format, new Date())
    return DateUtils.isDate(parsed) ? parsed : undefined
  }

  const formatDate = (date: number | Date, format: string) => {
    return dateFnsFormat(date, format)
  }

  return (
    <label className={`${className}`}>
      <div className="label">{children}</div>
      <DayPickerInput
        format="dd MMM yyyy"
        parseDate={parseDate}
        formatDate={formatDate}
        placeholder="21 Aug 2021"
        clickUnselectsDay
        classNames={{
          container: 'datepicker',
          overlay: '',
          overlayWrapper: 'dropdown inline-block py-6 px-5',
        }}
        component={(props: any) => (
          <div className="relative">
            <input {...props} className="input pr-12" />
            <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2" />
          </div>
        )}
        dayPickerProps={{
          navbarElement: ({ onPreviousClick, onNextClick }) => (
            <div>
              <button onClick={() => onPreviousClick?.()} className="arrow -left-3">
                <ArrowLeft title="Previous Month" />
              </button>
              <button onClick={() => onNextClick?.()} className="arrow -right-3">
                <ArrowRight title="Next Month" />
              </button>
            </div>
          ),
          captionElement: ({ date }) => <div className="DayPicker-Caption">{dateFnsFormat(date, 'MMM y')}</div>,
          showWeekDays: false,
          showOutsideDays: true,
          ...dayPickerProps,
        }}
        {...props}
      />
    </label>
  )
}

export default Datepicker
