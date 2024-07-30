
import Navbar from "../../../components/navbar"
export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <Navbar/>
      {children}
    </section>
  )
}