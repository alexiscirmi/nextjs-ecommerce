import { Dispatch, SetStateAction } from 'react'
import { auth } from '@/lib/firebase/firebase'
import {
  onAuthStateChanged,
  signOut,
  updateProfile,
  verifyBeforeUpdateEmail
} from 'firebase/auth'
import { signedIn, signedOut } from '@/lib/redux/features/userSlice'
import { useAppDispatch } from '@/lib/redux/hooks'
import { openSignInModal } from '@/lib/redux/features/signInModalSlice'
import { toast } from 'react-toastify'

interface SaveButton {
  id: string
  setEditing: Dispatch<SetStateAction<boolean>>
  inputValue: string
}

export const SaveButton = ({ id, setEditing, inputValue }: SaveButton) => {
  const dispatch = useAppDispatch()

  const handleClick = async () => {
    if (auth.currentUser) {
      switch (id) {
        case 'displayName':
          updateProfile(auth.currentUser, {
            displayName: inputValue
          })
            .then(() => {
              // Profile updated!
              onAuthStateChanged(auth, (user) => {
                if (user) {
                  // User is signed in
                  const { uid, email, displayName } = user
                  dispatch(signedIn({ uid, email, displayName }))
                } else {
                  // User is signed out
                  dispatch(signedOut())
                }
              })
            })
            .catch((error) => {
              // An error occurred
              console.log(error)
            })
          break

        case 'email':
          verifyBeforeUpdateEmail(auth.currentUser, inputValue)
            .then(() => {
              // Email updated!
            })
            .catch((error) => {
              // An error occurred
              const errorCode = error.code
              console.log(errorCode)
              if (errorCode === 'auth/requires-recent-login') {
                signOut(auth)
                  .then(() => {
                    // Sign-out successful.
                    toast.info('Session expired. Please, sign in again.')
                    dispatch(openSignInModal())
                  })
                  .catch((error) => {
                    // An error happened.
                    console.log(error)
                  })
              }
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
