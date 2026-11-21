import type { Metadata } from 'next'
import { getAllGadgetIds, getGadgetById } from '@/lib/gadgets'
import GadgetDetailClient from './GadgetDetailClient'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const ids = getAllGadgetIds()
  return ids.map((id) => ({ id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const gadget = getGadgetById(id, 'en')
  if (!gadget) return {}
  const title = `${gadget.title} - ${gadget.subtitle}`
  return {
    title,
    description: gadget.shortDescription,
    openGraph: {
      title,
      description: gadget.shortDescription,
      url: `/gadgets/${id}/`,
      type: 'article',
    },
  }
}

export default async function GadgetPage({ params }: Props) {
  const { id } = await params
  return <GadgetDetailClient id={id} />
}
