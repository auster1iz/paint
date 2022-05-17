import React from 'react'
import { toolState } from '../store/toolState'
import '../styles/toolbar-settings.scss'

const LINE_HEIGHT_TEXT = 'Line Height:'
const STROKE_COLOR_TEXT = 'Stroke Color:'

export const SettingsBar = () => {
    const setStrokeColor = (e) => {
        toolState.setStrokeColor(e.target.value)
    }
    const setLineWidth = (e) => {
        toolState.setLineWidth(e.target.value)
    }

    return (
        <div className="toolbar settings">
            <label htmlFor="line-height" className="settings__label font">
                {LINE_HEIGHT_TEXT}
            </label>
            <input
                id="line-height"
                className="settings__input font"
                type="number"
                defaultValue={1}
                min={1}
                max={80}
                onChange={setLineWidth}
            />
            <label htmlFor="stroke-color" className="settings__label font">
                {STROKE_COLOR_TEXT}
            </label>
            <input
                id="stroke-color"
                className="settings__color-input"
                type="color"
                onChange={setStrokeColor}
            />
        </div>
    )
}
