import * as React from 'react';

// useConstant npm package does not support React 18.0.
// So direct use the content of the package here as a hack way
type ResultBox<T> = { v: T }

export default function useConstant<T>(fn: () => T): T {
  const ref = React.useRef<ResultBox<T>>()

  if (!ref.current) {
    ref.current = { v: fn() }
  }

  return ref.current.v
}