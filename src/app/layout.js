import './globals.css'

export const metadata = {
  title: 'ADL Business Solutions',
  description: 'Professional business setup services in UAE by ADL Business Solutions. Expert support for company formation, licensing, visas, and PRO services.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
}