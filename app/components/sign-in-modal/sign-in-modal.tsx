'use client'

import { useState } from 'react'
import { auth } from '@/lib/firebase/firebase'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks'
import { Button } from '../button/button'
import { closeModal } from '@/lib/redux/features/modalSlice'

export const SignInModal = () => {
  const isOn = useAppSelector((state) => state.modal.isOn)
  const dispatch = useAppDispatch()
  const handleClose = () => {
    dispatch(closeModal())
  }
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading1, setLoading1] = useState(false)
  const [loading2, setLoading2] = useState(false)

  // Firebase Authentication email link sign-in:
  const handleSignIn = async (e: React.SyntheticEvent<EventTarget>) => {
    if (
      email.includes('@') &&
      email.indexOf('@') !== 0 &&
      email.length >= 8 &&
      password.length >= 8
    ) {
      e.preventDefault()
      setLoading1(true)

      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user
          console.log('Signed In:', user)
          setLoading1(false)
          dispatch(closeModal())
          // ...
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode, errorMessage)
        })
    }
  }

  const handleSignUp = async (e: React.SyntheticEvent<EventTarget>) => {
    if (
      email.includes('@') &&
      email.indexOf('@') !== 0 &&
      email.length >= 8 &&
      password.length >= 8 &&
      newPassword.length >= 8 &&
      password === newPassword
    ) {
      e.preventDefault()
      setLoading2(true)

      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Signed up
          const user = userCredential.user
          console.log('User created:', user)
          if (auth.currentUser) {
            await sendEmailVerification(auth.currentUser).then(() => {
              // Email verification sent!
              console.log('Email verification sent!')
              // ...
            })
          }
          setLoading2(false)
          dispatch(closeModal())
        })
        .catch(async (error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode, errorMessage)
        })
    }
  }

  if (isOn) {
    return (
      <div className='fixed z-30 bg-opacity-80 bg-black w-full h-full flex justify-center items-center'>
        <form
          id='modal'
          className='relative w-80 sm:w-96 h-80 p-1 mx-6 border border-slate-200 rounded-md bg-slate-50 flex flex-col justify-center items-center text-left gap-3'
        >
          <h1 className='w-4/5 text-center'>
            Sign in or create a new account (verification email will be sent).
          </h1>

          <fieldset className='flex flex-col w-4/5'>
            <label htmlFor='email' className='text-left'>
              Email address:
            </label>
            <input
              id='email'
              type='email'
              className='border border-slate-200 rounded-sm w-full p-1'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </fieldset>

          <div className='flex gap-3 w-4/5'>
            <fieldset className='flex flex-col'>
              <label htmlFor='password' className='text-left'>
                Password:
              </label>
              <input
                id='password'
                type='password'
                className='border border-slate-200 rounded-sm w-full p-1'
                minLength={8}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </fieldset>

            <Button
              type='submit'
              text={loading1 ? 'Wait...' : 'Sign in'}
              className='py-1 px-2 w-28 h-8 self-end'
              handleClick={handleSignIn}
              disabled={false}
            />
          </div>

          <div className='flex gap-3 w-4/5 border-t border-slate-300 pt-2'>
            <fieldset className='flex flex-col'>
              <label htmlFor='password2' className='text-left  text-sm'>
                Repeat password:
              </label>
              <input
                id='password2'
                type='password'
                className='border border-slate-200 rounded-sm w-full p-1'
                minLength={8}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                autoComplete='off'
              />
            </fieldset>

            <Button
              type='submit'
              text={loading2 ? 'Wait...' : 'Sign up'}
              className={`py-1 px-2 w-28 h-8  self-end ${
                newPassword !== password || newPassword.length < 8
                  ? 'hover:bg-transparent text-slate-300'
                  : 'hover:bg-gray-200'
              }`}
              handleClick={handleSignUp}
              disabled={newPassword !== password || newPassword.length < 8}
            />
          </div>

          <button
            id='close'
            className='absolute z-20 -right-4 -top-5 bg-black border border-slate-300 rounded-full w-7 h-7 text-white font-light'
            onClick={handleClose}
          >
            X
          </button>
        </form>
      </div>
    )
  }
}
