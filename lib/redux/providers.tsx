'use client'

import { store } from './store'
import { Provider } from 'react-redux'

export const Providers = (props: React.PropsWithChildren) => {
  return <Provider store={store}>{props.children}</Provider>
}
