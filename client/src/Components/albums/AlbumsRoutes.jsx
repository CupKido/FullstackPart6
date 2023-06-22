import React from "react";
import { Route, HashRouter, Routes, BrowserRouter } from "react-router-dom";
import Albums from "./Albums";
import AlbumLayaout from "./AlbumLayout";
import PhotoLayout from "./PhotoLayout";

function AlbumsRoutes(){
    return (
        <Routes>
            <Route index element={<Albums/>}/>
            <Route path="/photo/:id" element={<PhotoLayout/>}/>
            <Route path="/:id" element={<AlbumLayaout/>}/>
        </Routes>);
        }

export default AlbumsRoutes;