"use client"
import { Base64 } from 'js-base64'
import { useEffect, useState } from 'react'
import PageTitle from '@/components/PageTitle';

export default function Page() {
  const [content, setContent] = useState('');
  const [count, setCount] = useState(0);
  const [hashString, setHash] = useState('');
  const onHandleChange = (event: any) => {
    setContent(event.target.value)
    setCount(event.target.value.length)
    setHash(Base64.encode(event.target.value))
  };
  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      const content = `${Base64.decode(hash.slice(1, hash.length))}`
      setContent(content)
      setHash(hash)
    }
  }, []);
  useEffect(() => {
    window.location.hash = hashString;
  });
  return (
    <div className="w-full h-screen flex flex-col items-center justify-start">
      <PageTitle name="Draft"/>
      <hr className="container mb-4" />
      <div className="container flex flex-col p-4 relative">
        <small className='absolute top-0 right-2'>length: {count}</small>
        <div className="w-full flex flex-col items-end">
          <textarea className="textarea w-full border border-gray-200 outline-none p-2" rows={18} onChange={onHandleChange} value={content}></textarea>
        </div>
      </div>
    </div>
  )
}
