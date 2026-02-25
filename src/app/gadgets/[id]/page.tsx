import { getAllGadgetIds } from '@/lib/gadgets'
import GadgetDetailClient from './GadgetDetailClient'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const ids = getAllGadgetIds()
  return ids.map((id) => ({ id }))
}

export default async function GadgetPage({ params }: Props) {
  const { id } = await params
  return <GadgetDetailClient id={id} />
}
