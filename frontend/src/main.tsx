import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Avaleht from "@/features/events/pages/Avaleht.tsx";
import YrituseLisamine from "@/features/events/pages/YrituseLisamine.tsx";
import Osavotjad from "@/features/attendees/pages/Osavotjad.tsx";
import OsavotjateLisamine from "@/features/attendees/pages/OsavotjateLisamine.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Avaleht />} />
                <Route path="yrituse-lisamine" element={<YrituseLisamine />} />
                <Route path="yritus/:id" element={<Osavotjad />}/>
                <Route path="yritus/:id/osavotjate-lisamine" element={<OsavotjateLisamine />}/>
            </Route>
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)
