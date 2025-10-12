import express  from 'express'
import cors     from 'cors'
import { port, dataPath } from './constants'

// endpoint imports
import { setPreviewRouter } from './endpoints/set-preview'
import { getDataDirectoryRouter } from './endpoints/get-data-directory'
import { getDataRouter } from './endpoints/get-data'
import { getDirectoryRouter } from './endpoints/get-directory'
import { getJsonRouter } from './endpoints/get-json'
import { setSceneRouter } from './endpoints/set-scene'
import { saveJsonRouter } from './endpoints/save-json'
import { generateNodesRouter } from './endpoints/generate-nodes'
import { generateTableOfContentsRouter } from './endpoints/generate-table-of-contents'
import { generateSummaryRouter } from './endpoints/generate-summary'
import { generateSectionRouter } from './endpoints/generate-section'
import { growFlowchartRouter } from './endpoints/grow-flowchart'
import { generateImageRouter } from './endpoints/generate-image'
import { getImageRouter } from './endpoints/get-image'
import { searchImagesRouter } from './endpoints/search-images'
import { cropImageRouter } from './endpoints/crop-image'
import { padImageRouter } from './endpoints/pad-image'
import { initializeWebSocket } from './websocket'
import { getAudioRouter } from './endpoints/get-audio'
import { processAudioRouter } from './endpoints/process-audio'
import { processVideoRouter } from './endpoints/process-video'

const app   = express()

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use('/videos', express.static(dataPath('videos')))

//endpoints
app.use(setPreviewRouter)
app.use(getDataDirectoryRouter)
app.use(getDataRouter)
app.use(getDirectoryRouter)
app.use(getJsonRouter)
app.use(setSceneRouter)
app.use(saveJsonRouter)
app.use(generateNodesRouter)
app.use(generateTableOfContentsRouter)
app.use(generateSummaryRouter)
app.use(generateSectionRouter)
app.use(growFlowchartRouter)
app.use(generateImageRouter)
app.use(getImageRouter)
app.use(searchImagesRouter)
app.use(cropImageRouter)
app.use(padImageRouter)
app.use(getAudioRouter)
app.use(processAudioRouter)
app.use(processVideoRouter)

initializeWebSocket()

app.get('/', (req, res) => {
  res.send('<html><body><h1>Hello, World!</h1></body></html>')
})

app.listen(port, () => { console.log(`Listening at http://localhost:${port}`)})