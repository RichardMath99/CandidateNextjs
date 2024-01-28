import Image from 'next/image'
import cathoLogo from '../../public/assets/images/logo_catho.svg'

import './global.css'

export default function Home() {
  return (
    <article>
      <Image
        src={cathoLogo}
        alt="Logo Catho"
        width={150}
        height={150}
        className="catho-logo"
      />
    </article>
  )
}
