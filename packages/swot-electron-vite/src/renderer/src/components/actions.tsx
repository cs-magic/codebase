const Actions = () => {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <div className="actions">
      <div className="action">
        <a href="https://cs-magic.com" target="_blank" rel="noreferrer">
          CS魔法社
        </a>
      </div>
      <div className="action">
        <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
          Send IPC
        </a>
      </div>
    </div>
  )
}
