'use strinct'

// El objeto BrowserWindows enlaza y carga la interfaz gráfica en la applicación
import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import devtools from './devtools'
import isImage from 'is-image'
import filesize from 'filesize'
import fs from 'fs'
import path from 'path'

let win
if (process.env.NODE_ENV === 'development') {
    devtools()
}

console.dir(app)

app.on('before-quit', () => {
    //console.log('Saliendo')
})
app.on('ready', () => {
    win = new BrowserWindow({
        width: 1000,
        height: 600,
        title: 'PlatziPics',
        center: true,
        maximizable: true,
        show: false
    }) //Instancia una nueva ventana

    win.on('move', () => {
        const position = win.getPosition()
        //console.log(`Window position: ${position}`)
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

ipcMain.on('open-directory', (event) => {
    dialog.showOpenDialog(win, {
        title: 'seleccionar ubicación',
        buttonLabel: 'Abrir ubicación',
        properties: ['openDirectory']
    }, (dir) => {
        const images = []
        if (dir) {
            fs.readdir(dir[0], (err, files) => {
                if (err) throw err
                for(let i = 0; i < files.length; i++) {
                    if (isImage(files[i])) {
                        let imageFile = path.join(dir[0], files[i])
                        let stats = fs.statSync(imageFile)
                        let size = filesize(stats.size, {round: 0})
                        images.push({filename: files[i], src: `file://${imageFile}`, size: size})
                    }
                }

                event.sender.send('load-images', images)
            })
        }
    })
})