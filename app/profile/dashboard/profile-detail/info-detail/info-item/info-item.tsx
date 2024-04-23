import { SetStateAction, useState } from 'react'
import { useAppSelector } from '@/lib/redux/hooks'
import { SaveButton } from './buttons/save-button'
import { CancelButton } from './buttons/cancel-button'
import { EditButton } from './buttons/edit-button'

interface InfoItemInterface {
  id: string
  label: string
}

export const InfoItem = ({ id, label }: InfoItemInterface) => {
  const { userState } = useAppSelector((state) => state.user)
  const [editing, setEditing] = useState(false)

  const [inputValue, setInputValue] = useState(
    userState ? userState[id] || label : label
  )
  const handleInput = (e: { target: { value: SetStateAction<string> } }) => {
    setInputValue(e.target.value)
  }
  const resetInputValue = () => {
    setInputValue(userState ? userState[id] || label : label)
  }

  return (
    <form className='grid grid-cols-4 md:grid-cols-3 m-3 items-center justify-center'>
      <label
        htmlFor={id}
        className='flex justify-center md:justify-end md:px-16'
      >
        {label}
      </label>
      <input
        id={id}
        type={id === 'email' ? 'email' : 'text'}
        onChange={handleInput}
        readOnly={!editing}
        value={inputValue}
        className='col-span-2 md:col-span-1 placeholder-current flex justify-center border border-slate-100 rounded-md p-1'
      />
      {editing ? (
        <div className='flex justify-center md:justify-start md:px-16 gap-1'>
          <div className='flex justify-center w-16 gap-4'>
            <SaveButton
              id={id}
              setEditing={setEditing}
              inputValue={inputValue}
            />
            <CancelButton
              setEditing={setEditing}
              setInputValue={setInputValue}
              resetInputValue={resetInputValue}
            />
          </div>
        </div>
      ) : (
        <div className='flex justify-center md:justify-start md:px-16'>
          <div className='flex justify-center w-16'>
            <EditButton setEditing={setEditing} />
          </div>
        </div>
      )}
    </form>
  )
}
