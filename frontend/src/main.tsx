import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Avaleht from "@/features/avaleht/Avaleht.tsx";
import YrituseLisamine from "@/features/yrituse-lisamine/YrituseLisamine.tsx";
import Osavotjad from "@/features/osavotjad/Osavotjad.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Avaleht />} />
                <Route path="yrituse-lisamine" element={<YrituseLisamine />} />
                <Route path="osavotjad/:id" element={<Osavotjad />}/>
            </Route>
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)
