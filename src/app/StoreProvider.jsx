"use client"

import store from '@/lib/store';
import { Provider } from 'react-redux'
// import { useRef } from 'react'

export default function StoreProvider({ children }) {
    // const storeref = useRef();
    // if (!storeref.current) {
    //     storeref.current = store ();
    // }

    return <Provider store={store}>{children}</Provider>;
}

