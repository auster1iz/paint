import { socketState } from '../store/socketState'
import { notify } from './notify'

export const notifyAboutUserConnection = (message) => {
    if (message.username !== socketState.username)
        notify(`User ${message.username} is connected.`)
}
