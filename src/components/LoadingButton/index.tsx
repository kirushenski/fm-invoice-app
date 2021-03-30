import React from 'react'

export interface LoadingButtonProps extends React.HTMLProps<HTMLButtonElement> {
  isLoading: boolean
  loadingText: string
  type: 'button' | 'submit' | 'reset'
  children: React.ReactNode
}

const LoadingButton = ({
  isLoading,
  loadingText,
  children,
  disabled,
  type,
  className = '',
  ...props
}: LoadingButtonProps) => {
  return (
    <button type={type} className={`${className}`} disabled={isLoading || disabled} {...props}>
      {isLoading ? (
        <div className="loader">
          <span className="sr-only">{loadingText}</span>
        </div>
      ) : (
        children
      )}
    </button>
  )
}

export default LoadingButton
