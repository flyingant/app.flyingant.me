import Image from 'next/image'
import DefaultNameTag from '@/components/DefaultNameTag'

export default function Home() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <DefaultNameTag name="MaYi" />
    </div>
  )
}
