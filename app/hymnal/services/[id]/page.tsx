import ServiceEditor from '@/components/hymnal/ServiceEditor'

type Params = Promise<{ id: string }>

export default async function ServiceEditorPage({ params }: { params: Params }) {
  const { id } = await params
  return <ServiceEditor id={id} />
}
