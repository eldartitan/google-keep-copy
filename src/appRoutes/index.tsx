import React from 'react'
import { Routes, Route } from "react-router-dom";
import Layout from '../Layout';
import ArchivePage from '../pages/ArchivePage';
import LabelPage from '../pages/LabelPage';
import MainPage from '../pages/MainPage';
import RemindersPage from '../pages/RemindersPage';
import SearchPage from '../pages/SearchPage';
import TrashPage from '../pages/TrashPage';



export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path='/reminders' element={<RemindersPage />} />
        <Route path='/archive' element={<ArchivePage />} />
        <Route path='/trash' element={<TrashPage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/label/:labelId' element={<LabelPage />} />
      </Route>
    </Routes>
  )
}
