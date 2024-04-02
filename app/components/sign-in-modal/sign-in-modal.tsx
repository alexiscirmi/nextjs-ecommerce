'use client'

import { useEffect, useState } from 'react'
import { auth } from '@/lib/firebase/firebase'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
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
  const [message, setMessage] = useState<undefined | string>(undefined)

  useEffect(() => {
    setTimeout(() => {
      setMessage(undefined)
    }, 5000)
  }, [message])

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
          setLoading1(false)
          const user = userCredential.user
          console.log('Signed In:', user)
          dispatch(closeModal())
        })
        .catch((error) => {
          setLoading1(false)
          const errorCode = error.code
          const errorMessage = error.message
          switch (errorCode) {
            case 'auth/invalid-credential':
              setMessage('Please, check your data is correct.')
              break
            case 'auth/too-many-requests':
              setMessage(
                'Too many attempts. Reset your password or try again later.'
              )
            default:
              break
          }
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
            })
          }
          setLoading2(false)
          dispatch(closeModal())
        })
        .catch(async (error) => {
          setLoading2(false)
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode, errorMessage)
        })
    }
  }

  const handleResetPassword = (e: React.SyntheticEvent<EventTarget>) => {
    if (email.includes('@') && email.indexOf('@') !== 0 && email.length >= 8) {
      e.preventDefault()
      sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          dispatch(closeModal())
        })
        .catch((error) => {
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
          className='relative w-80 sm:w-96 h-96 p-1 mx-6 border border-slate-200 rounded-md bg-slate-50 flex flex-col justify-center items-center text-left gap-3'
        >
          <h1 className='w-5/6 text-center text-slate-600'>
            Sign in or create a new account
          </h1>

          <h2 className='w-5/6 h-6 text-center text-red-600 text-xs transition-all'>
            {message}
          </h2>

          <fieldset className='flex flex-col w-5/6'>
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

          <div className='flex gap-3 w-5/6'>
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

          <div className='w-5/6 flex justify-center'>
            <button
              type='submit'
              className='text-sm text-balance text-blue-600 hover:underline'
              onClick={handleResetPassword}
            >
              I forgot my password, send me an email
            </button>
          </div>

          <div className='flex gap-3 w-5/6 border-t border-slate-300 pt-2'>
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
