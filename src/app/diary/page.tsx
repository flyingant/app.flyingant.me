import Image from 'next/image'
import PageTitle from '@/components/PageTitle'

export default function Page() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-start">
      <PageTitle name="Diary"/>
      <hr className="container mb-4" />
    </div>
  )
}
