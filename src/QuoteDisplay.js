import React from 'react';

const QuoteDisplay = ({ quoteText, quoteAuthor }) => {
  return (
    <div>
      <blockquote>{quoteText}</blockquote>
      <p> - {quoteAuthor} </p>
    </div>
  )
}

export default QuoteDisplay
