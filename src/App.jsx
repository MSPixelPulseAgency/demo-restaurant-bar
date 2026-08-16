import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import { About, Banquet, Booking, Catering, Contact, Gallery, Home, MenuKit, MenuPage, NotFound, VisitingHours } from './pages'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/menu" element={<MenuPage/>}/>
        <Route path="/banquet" element={<Banquet/>}/>
        <Route path="/catering" element={<Catering/>}/>
        <Route path="/gallery" element={<Gallery/>}/>
        <Route path="/visiting-hours" element={<VisitingHours/>}/>
        <Route path="/booking" element={<Booking/>}/>
        <Route path="/menu-kit" element={<MenuKit/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
  )
}
