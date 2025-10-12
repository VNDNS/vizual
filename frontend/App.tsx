import './scss/app.scss'
import { BrowserRouter } from 'react-router-dom'
import { GlobalStateProvider }                from './plugins/common/context'
import { AnimationStateProvider } from './plugins/animation/context'
import { Frontend } from './plugins/animation/Frontend'

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <GlobalStateProvider>
          <div className="content">
          <AnimationStateProvider>
            <Frontend />
          </AnimationStateProvider>
          </div>
        </GlobalStateProvider>
      </div>
    </BrowserRouter>
  )
}

export default App