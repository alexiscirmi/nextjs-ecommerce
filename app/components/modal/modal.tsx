'use client'

import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks'
import { Button } from '../button/button'
import { closeModal } from '@/lib/redux/features/modalSlice'

export const Modal = () => {
  const isOn = useAppSelector((state) => state.modal.isOn)
  const dispatch = useAppDispatch()
  const handleClose = () => {
    dispatch(closeModal())
  }

  if (isOn) {
    return (
      <div className='fixed z-30 bg-opacity-80 bg-black w-full h-full flex justify-center items-center'>
        <form
          id='modal'
          className='relative w-72 h-56 sm:w-96 sm:h-48 border border-slate-200 rounded-sm bg-slate-50 flex flex-col justify-center items-center text-center gap-3'
        >
          <label className='text-balance'>
            Please type your email address. You will receive a link to log in
            (not working yet!):
          </label>
          <input type='email' className='border border-slate-200 rounded-sm' />
          <Button
            type='submit'
            text='Send link'
            className='py-1 px-2'
            handleClick={() => console.log('Send link button clicked')}
            disabled={false}
          />
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
