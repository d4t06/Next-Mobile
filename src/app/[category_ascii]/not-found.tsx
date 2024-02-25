import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
      <h2 className='text-[20px] font-[500]'>Not Found \_(ツ)_/</h2>
      <p className='mt-[30px]'>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}