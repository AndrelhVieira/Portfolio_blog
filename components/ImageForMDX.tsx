import Image from './Image'
import { ImageProps } from 'next/image'

const ImageForMDX = ({ alt, ...rest }: ImageProps) => (
  <>
    <Image alt={alt} {...rest} className="rounded-lg" />
    <p className="text-gray-400">{alt}</p>
  </>
)

export default ImageForMDX
