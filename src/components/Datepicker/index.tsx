import React from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { DateUtils } from 'react-day-picker'
import { format as dateFnsFormat, parse as dateFnsParse } from 'date-fns'
import { useField } from 'formik'
import Calendar from '@/icons/calendar.svg'
import ArrowLeft from '@/icons/arrow-left.svg'
import ArrowRight from '@/icons/arrow-right.svg'
import 'react-day-picker/lib/style.css'

export interface DatepickerProps extends React.HTMLProps<HTMLInputElement> {
  name: string
  children: string
  className?: string
}

const FORMAT = 'dd MMM y'

function Datepicker({ children, name, id, hidden, required = true, className = '', ...props }: DatepickerProps) {
  const [field, meta, helpers] = useField(name)
  const isError = meta.touched && meta.error

  const parseDate = (str: string, format: string) => {
    const parsed = dateFnsParse(str, format, new Date())
    return DateUtils.isDate(parsed) ? parsed : undefined
  }

  const formatDate = (date: number | Date, format: string) => {
    return dateFnsFormat(date, format)
  }

  return (
    <div className={`${className}`}>
      <label htmlFor={id || name} className={`label ${isError ? 'text-red' : ''} ${hidden ? 'md:sr-only' : ''}`}>
        <span>{children}</span>
        {isError && (
          <span id={`${name}Error`} role="alert" className="error">
            {meta.error}
          </span>
        )}
      </label>
      <div className="relative">
        <DayPickerInput
          value={field.value}
          onDayChange={day => {
            if (day) helpers.setValue(formatDate(day, FORMAT))
          }}
          format={FORMAT}
          parseDate={parseDate}
          formatDate={formatDate}
          placeholder="21 Aug 2021"
          classNames={{
            container: 'datepicker',
            overlay: '',
            overlayWrapper: 'dropdown py-6 px-5',
          }}
          inputProps={{
            id: id || name,
            required,
            'aria-invalid': !!isError,
            'aria-describedby': `${name}Error`,
            autoComplete: 'off',
            className: `input pr-12 ${isError ? 'border-red' : ''} ${className}`,
            ...props,
          }}
          dayPickerProps={{
            navbarElement: ({ onPreviousClick, onNextClick }) => (
              <div>
                <button type="button" onClick={() => onPreviousClick?.()} className="arrow -left-3">
                  <ArrowLeft title="Previous Month" />
                </button>
                <button type="button" onClick={() => onNextClick?.()} className="arrow -right-3">
                  <ArrowRight title="Next Month" />
                </button>
              </div>
            ),
            captionElement: ({ date }) => <div className="DayPicker-Caption">{dateFnsFormat(date, 'MMM y')}</div>,
            showWeekDays: false,
            showOutsideDays: true,
          }}
        />
        <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2" />
      </div>
    </div>
  )
}

export default Datepicker
