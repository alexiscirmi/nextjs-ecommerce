import { closeModal } from '@/lib/redux/features/modalSlice'
import { useAppDispatch } from '@/lib/redux/hooks'

interface ModalInterface {
  children: React.ReactNode
}

export const ModalBase = ({ children }: ModalInterface) => {
  const dispatch = useAppDispatch()
  const handleClose = () => {
    dispatch(closeModal())
  }

  return (
    <section
      id='modal'
      className='fixed z-30 bg-opacity-80 bg-black w-full h-full flex justify-center items-center'
    >
      <div className='relative w-80 sm:w-96 h-96 p-1 mx-6 border border-slate-200 rounded-md bg-slate-50 flex flex-col justify-center'>
        {children}
        <button
          id='close'
          className='absolute z-20 -right-4 -top-5 bg-black border border-slate-300 rounded-full w-7 h-7 text-white font-light'
          onClick={handleClose}
        >
          X
        </button>
      </div>
    </section>
  )
}
