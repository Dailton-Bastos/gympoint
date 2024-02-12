import React from 'react'
import { IoIosCheckmark, IoIosClose } from 'react-icons/io'

import { cn } from '@/lib/utils'

type Props = {
  items: {
    lower: boolean
    upper: boolean
    number: boolean
    special: boolean
    length: boolean
  }
}

export const ValidationPassword = ({ items }: Props) => {
  const itemsToCheck = React.useMemo(
    () => [
      {
        isValid: items.length,
        label: '8 caracteres',
      },
      {
        isValid: items.special,
        label: '1 caractere especial',
      },
      {
        isValid: items.lower,
        label: '1 letra minúscula',
      },
      {
        isValid: items.upper,
        label: '1 letra maiúscula',
      },
      {
        isValid: items.number,
        label: '1 número',
      },
    ],
    [items]
  )

  return (
    <div className='w-full py-4'>
      <p className='text-sm'>A senha deve ter pelo menos:</p>

      <ul className='pt-2'>
        {itemsToCheck.map((item) => (
          <li
            className={cn(
              'flex items-center gap-1 text-sm py-1',
              item.isValid ? 'text-red' : 'text-gray-600'
            )}
            key={item.label}
          >
            {item.isValid ? (
              <IoIosCheckmark size={22} />
            ) : (
              <IoIosClose size={22} />
            )}
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
