import './normalize.css'
import './index.css'

import App from './App'
import React from 'react'
import registerServiceWorker from './registerServiceWorker'
import { render } from 'react-snapshot'

const rootEl = document.getElementById('root')
render(<App />, rootEl)

registerServiceWorker()

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default
        render(<NextApp />, rootEl)
    })
}