import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import EnhancedMenuPage from './pages/EnhancedMenuPage'
import EnhancedGalleryPage from './pages/EnhancedGalleryPage'
import EnhancedAboutPage from './pages/EnhancedAboutPage'
import MenuKitDownloads from './components/MenuKitDownloads'
import { BlogPage, BlogPostPage } from './pages/BlogPages'
import {
  PremiumBanquet,
  PremiumBooking,
  PremiumCatering,
  PremiumContact,
  PremiumHome,
  PremiumVisitingHours,
} from './pages/PremiumPages'
import { NotFound } from './pages/pages'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<PremiumHome/>}/>
        <Route path="/about" element={<EnhancedAboutPage/>}/>
        <Route path="/menu" element={<EnhancedMenuPage/>}/>
        <Route path="/banquet" element={<PremiumBanquet/>}/>
        <Route path="/catering" element={<PremiumCatering/>}/>
        <Route path="/gallery" element={<EnhancedGalleryPage/>}/>
        <Route path="/visiting-hours" element={<PremiumVisitingHours/>}/>
        <Route path="/booking" element={<PremiumBooking/>}/>
        <Route path="/blog" element={<BlogPage/>}/>
        <Route path="/blog/:slug" element={<BlogPostPage/>}/>
        <Route path="/menu-kit" element={<MenuKitDownloads/>}/>
        <Route path="/contact" element={<PremiumContact/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
  )
}
