import SubmitForm from '@/components/SubmitForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Submit a Church',
  description: 'Submit a congregation to be reviewed and added to the directory. Editorial review verifies confession before publication.',
}

export default function SubmitPage() {
  return <SubmitForm />
}
