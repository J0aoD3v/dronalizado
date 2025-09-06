import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | Dronalizado',
  description: 'Dashboard de analytics e gerenciamento de QR codes',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
