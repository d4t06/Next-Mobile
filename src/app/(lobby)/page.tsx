import Image from "next/image";
import aImage from '@/assets/search-empty.png'

export default async function HomePage() {
   return (
      <>
      <Image height={120} width={120} alt="" src={aImage} className='m-auto' />
      </>
   )
}
