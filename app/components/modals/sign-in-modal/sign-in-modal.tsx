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
import { ModalBase } from '../modal-base/modal-base'
import { Button } from '../../button/button'
import { closeSignInModal } from '@/lib/redux/features/signInModalSlice'
import { Spinner } from '../../spinner/spinner'

export const SignInModal = () => {
  const isOn = useAppSelector((state) => state.signInModal.isOn)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading1, setLoading1] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [message, setMessage] = useState<undefined | string>(undefined)
  const dispatch = useAppDispatch()
  const handleClose = () => {
    dispatch(closeSignInModal())
  }

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(undefined)
      }, 5000)
    }
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
          dispatch(closeSignInModal())
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
          dispatch(closeSignInModal())
        })
        .catch(async (error) => {
          setLoading2(false)
          const errorCode = error.code
          const errorMessage = error.message
          switch (errorCode) {
            case 'auth/email-already-in-use':
              setMessage('The email is already registered.')
              break
            default:
              break
          }
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
          dispatch(closeSignInModal())
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
      <ModalBase handleClick={handleClose}>
        <form className='flex flex-col justify-center items-center gap-3'>
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
              text={loading1 ? <Spinner loadingScreen={false} /> : 'Sign in'}
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
              text={loading2 ? <Spinner loadingScreen={false} /> : 'Sign up'}
              className={`py-1 px-2 w-28 h-8  self-end ${
                newPassword !== password || newPassword.length < 8
                  ? 'hover:bg-transparent text-slate-300'
                  : 'hover:bg-gray-200'
              }`}
              handleClick={handleSignUp}
              disabled={newPassword !== password || newPassword.length < 8}
            />
          </div>
        </form>
      </ModalBase>
    )
  }
}
