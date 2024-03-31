'use client'

import { useState } from 'react'
import { auth } from '@/lib/firebase/firebase'
import { sendSignInLinkToEmail } from 'firebase/auth'
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks'
import { Button } from '../button/button'
import { closeModal } from '@/lib/redux/features/modalSlice'
import { CheckIcon } from '../check-icon/check-icon'

export const Modal = () => {
  const isOn = useAppSelector((state) => state.modal.isOn)
  const dispatch = useAppDispatch()
  const handleClose = () => {
    dispatch(closeModal())
  }
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  // Firebase Authentication email link sign-in:
  const handleSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    setLoading(true)

    // Test code for not using Firebase daily quota:
    // const sendingSimulator = async () => {
    //   setTimeout(() => {
    //     setLoading(false)
    //     setTimeout(() => {
    //       setEmailSent(true)
    //       setTimeout(() => {
    //         setEmailSent(false)
    //         handleClose()
    //       }, 2000)
    //     }, 1)
    //   }, 1000)
    // }
    // await sendingSimulator()

    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: 'http://localhost:3000/',
      // This must be true.
      handleCodeInApp: true
    }

    await sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        setLoading(false)
        setEmailSent(true)
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem('emailForSignIn', email)
        setTimeout(() => {
          setEmailSent(false)
          handleClose()
        }, 2000)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  }

  if (isOn) {
    return (
      <div className='fixed z-30 bg-opacity-80 bg-black w-full h-full flex justify-center items-center'>
        <form
          id='modal'
          className='relative w-72 h-56 sm:w-96 sm:h-48 border border-slate-200 rounded-sm bg-slate-50 flex flex-col justify-center items-center text-center gap-3'
        >
          <label className='text-balance'>
            Please type your email address. You will receive a link to sign in
            (not working yet!):
          </label>
          <input
            type='email'
            className='border border-slate-200 rounded-sm w-3/4 p-1'
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className='flex items-center h-10'>
            {emailSent ? (
              <>
                <CheckIcon />
                <span>Sent!</span>
              </>
            ) : (
              <Button
                type='submit'
                text={loading ? 'Sending...' : 'Send link'}
                className='py-1 px-2 w-24'
                handleClick={handleSubmit}
                disabled={false}
              />
            )}
          </p>
          <button
            id='close'
            className='absolute -right-4 -top-5 font-light text-slate-50'
            onClick={handleClose}
          >
            X
          </button>
        </form>
      </div>
    )
  }
}
