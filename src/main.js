import ReactDOM from 'react-dom/client'
import React from 'react'
import { Provider } from 'react-redux'

import { App } from './App'
import { store } from '../store'

import '../styles/reset.css'
import '../styles/global.scss'
import '../styles/common/text.scss'

// eslint-disable-next-line no-undef
window.React = React

// eslint-disable-next-line no-undef
ReactDOM.createRoot(document.getElementById('root')).render(<Provider store={store}><App /></Provider>)