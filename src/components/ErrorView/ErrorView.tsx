import React from 'react'

const ErrorView: React.FunctionComponent<{error: any}> = ({error}) => {
  return (
    <div className="error_view">
      {error}
    </div>
  )
}

export default ErrorView
