import { SetStateAction, useEffect, useState } from 'react'
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
  const [data, setData] = useState('')

  const handleInput = (e: { target: { value: SetStateAction<string> } }) => {
    setData(e.target.value)
  }

  return (
    <form>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        placeholder={userState ? userState[id] || label : label}
        onChange={handleInput}
        readOnly={!editing}
      />
      {editing ? (
        <>
          <SaveButton id={id} setEditing={setEditing} data={data} />
          <CancelButton setEditing={setEditing} />
        </>
      ) : (
        <EditButton setEditing={setEditing} />
      )}
    </form>
  )
}
