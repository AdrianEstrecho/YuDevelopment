import { getCMS } from '@/lib/cms'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AdminShortcut from '@/components/AdminShortcut'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const cms = getCMS()
  return (
    <>
      <AdminShortcut />
      <Navbar nav={cms.nav} />
      <main>{children}</main>
      <Footer footer={cms.footer} nav={cms.nav} companies={cms.companies} />
    </>
  )
}
