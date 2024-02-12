import React from 'react'

export const useValidationPassword = () => {
  const [values, setValues] = React.useState({
    lower: false,
    upper: false,
    number: false,
    special: false,
    length: false,
  })

  const isValid = Object.values(values).every((value) => value)

  const regex = React.useMemo(
    () => ({
      lower: new RegExp('(?=.*[a-z])'),
      upper: new RegExp('(?=.*[A-Z])'),
      number: new RegExp('(?=.*[0-9])'),
      special: new RegExp('(?=.*[!@#$%^&*])'),
      length: new RegExp('(?=.{8,})'),
    }),
    []
  )

  const handleCheck = React.useCallback(
    (value: string) => {
      setValues((prev) => ({
        ...prev,
        lower: regex.lower.test(value),
        upper: regex.upper.test(value),
        number: regex.number.test(value),
        special: regex.special.test(value),
        length: regex.length.test(value),
      }))
    },
    [regex]
  )

  return { values, handleCheck, isValid }
}
