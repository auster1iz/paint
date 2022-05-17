import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Toolbar } from './components/Toolbar'
import { SettingsBar } from './components/SettingsBar'
import { Canvas } from './components/Canvas'
import 'react-toastify/dist/ReactToastify.css'
import './styles/app.scss'

export const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route
                        path="/:id"
                        element={
                            <>
                                <Toolbar />
                                <SettingsBar />
                                <Canvas />
                            </>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <Navigate to={`f${(+new Date()).toString(16)}`} />
                        }
                    />
                </Routes>
                <ToastContainer />
            </div>
        </BrowserRouter>
    )
}
