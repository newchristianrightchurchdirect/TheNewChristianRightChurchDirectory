import CreedReader from '@/components/hymnal/CreedReader'

type Params = Promise<{ id: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const { id } = await params
  return { title: id }
}

export default async function CreedPage({ params }: { params: Params }) {
  const { id } = await params
  return <CreedReader id={id} />
}
