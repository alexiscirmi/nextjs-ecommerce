'use client'

import { useState } from 'react'
import { auth } from '@/lib/firebase/firebase'
import {
  createUserWithEmailAndPassword,
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
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user
          console.log('User created:', user)
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
          className='relative w-72 h-60 sm:w-96 sm:h-64 border border-slate-200 rounded-md bg-slate-50 flex flex-col justify-center items-center text-left gap-3'
        >
          <fieldset className='flex flex-col w-3/4'>
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

          <div className='flex gap-3 w-3/4'>
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
              text={loading1 ? 'Wait...' : 'Sign In'}
              className='py-1 px-2 w-28 h-8 self-end'
              handleClick={handleSignIn}
              disabled={false}
            />
          </div>

          <div className='flex gap-3 w-3/4'>
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
              text={loading2 ? 'Wait...' : 'Sign Up'}
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
