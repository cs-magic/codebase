import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'
import { Button } from '@cs-magic/ui'
import ConnectionPage from './connection/page'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
        &nbsp;and <span className="ts">TypeScript</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </a>
        </div>
      </div>
      <Versions></Versions>

      <div className={''}>
        <div className={'flex'}>
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>

        <Button className={'text-red-500'}>wow</Button>
      </div>
      <ConnectionPage />
    </>
  )
}

export default App
