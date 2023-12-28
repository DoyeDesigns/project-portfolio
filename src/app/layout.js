import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DoyeCodes',
  description: 'Edoye Ogoba Portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body id='root' className={inter.className}>
      	<Navbar />
      		{children}
      	<Footer />
      </body>
    </html>
  )
}
