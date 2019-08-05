'use strinct'

// El objeto BrowserWindows enlaza y carga la interfaz gráfica en la applicación
import { app, BrowserWindow } from 'electron'
import devtools from './devtools'

if (process.env.NODE_ENV === 'development') {
    devtools()
}

console.dir(app)

app.on('before-quit', () => {
    console.log('Saliendo')
})
app.on('ready', () => {
    let win = new BrowserWindow({
        width: 1000,
        height: 600,
        title: 'PlatziPics',
        center: true,
        maximizable: false,
        show: false
    }) //Instancia una nueva ventana

    win.on('move', () => {
        const position = win.getPosition()
        console.log(`Window position: ${position}`)
    })

    win.once('ready-to-show', () => {
        win.show()
    })

    win.on('closed', () => {
        app.quit()
    })

    // __dirname: palabra clave que nos da el directorio donde se encuentra el archivo actual
    win.loadURL(`file://${__dirname}/renderer/index.html`)
    //win.toggleDevTools() // Abre las devtools para debug de la aplicación
})
