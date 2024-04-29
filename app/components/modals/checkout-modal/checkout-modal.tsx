'use client'

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { ModalBase } from '../modal-base/modal-base'
import { closeCheckoutModal } from '@/lib/redux/features/checkoutModalSlice'
import Checkout from './checkout/checkout'

export const CheckoutModal = () => {
  const isOn = useAppSelector((state) => state.checkoutModal.isOn)
  const dispatch = useAppDispatch()
  const handleClose = () => {
    dispatch(closeCheckoutModal())
  }

  if (isOn) {
    return (
      <ModalBase handleClick={handleClose}>
        <Checkout />
      </ModalBase>
    )
  }
}
