import { setIpc, openDirectory } from './ipcRendererEvents'
import { addImageEvents, searchImagesEvent, selectEvent } from './images-ui'

window.addEventListener('load', () => {
    setIpc()
    addImageEvents()
    searchImagesEvent()
    selectEvent()
    buttonEvent('open-directory', openDirectory)
})

function buttonEvent(id, func) {
    const openDirectory = document.getElementById(id)
    openDirectory.addEventListener('click', func)
}
