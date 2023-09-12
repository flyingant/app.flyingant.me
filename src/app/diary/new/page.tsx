import Image from 'next/image'

export default function Page() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-start">
      <div className="container font-sans mb-4 px-4 flex items-center justify-between md:flex-row flex-col">
        <h2 className="text-2xl text-grey mt-4 mb-4">
          Diary New
        </h2>
      </div>
      <hr className="container mb-4" />
    </div>
  )
}
