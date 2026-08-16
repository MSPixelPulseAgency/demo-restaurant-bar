import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import EnhancedMenuPage from './EnhancedMenuPage'
import EnhancedGalleryPage from './EnhancedGalleryPage'
import {
  PremiumAbout,
  PremiumBanquet,
  PremiumBooking,
  PremiumCatering,
  PremiumContact,
  PremiumHome,
  PremiumMenuKit,
  PremiumVisitingHours,
} from './PremiumPages'
import { NotFound } from './pages'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<PremiumHome/>}/>
        <Route path="/about" element={<PremiumAbout/>}/>
        <Route path="/menu" element={<EnhancedMenuPage/>}/>
        <Route path="/banquet" element={<PremiumBanquet/>}/>
        <Route path="/catering" element={<PremiumCatering/>}/>
        <Route path="/gallery" element={<EnhancedGalleryPage/>}/>
        <Route path="/visiting-hours" element={<PremiumVisitingHours/>}/>
        <Route path="/booking" element={<PremiumBooking/>}/>
        <Route path="/menu-kit" element={<PremiumMenuKit/>}/>
        <Route path="/contact" element={<PremiumContact/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
  )
}
