import { Dispatch, SetStateAction } from 'react'
import { auth } from '@/lib/firebase/firebase'
import { updateProfile } from 'firebase/auth'

interface SaveButton {
  id: string
  setEditing: Dispatch<SetStateAction<boolean>>
  data: string
}

export const SaveButton = ({ id, setEditing, data }: SaveButton) => {
  const handleClick = async () => {
    if (auth.currentUser) {
      switch (id) {
        case 'displayName':
          updateProfile(auth.currentUser, {
            displayName: data
          })
            .then(() => {
              // Profile updated!
            })
            .catch((error) => {
              // An error occurred
              console.log(error)
            })
          break

        default:
          break
      }
    }
    setEditing(false)
  }

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1.5em'
      height='1.5em'
      viewBox='0 0 1024 1024'
      onClick={handleClick}
      className='cursor-pointer'
    >
      <path
        fill='black'
        d='M512 896a384 384 0 1 0 0-768a384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896a448 448 0 0 1 0 896'
      ></path>
      <path
        fill='black'
        d='M745.344 361.344a32 32 0 0 1 45.312 45.312l-288 288a32 32 0 0 1-45.312 0l-160-160a32 32 0 1 1 45.312-45.312L480 626.752z'
      ></path>
    </svg>
  )
}
