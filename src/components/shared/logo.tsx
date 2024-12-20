import logoSvg from '@/assets/logo.svg'
import doBeLogoSvg from '@/assets/do-be-logo.svg'

const Logo = (
  props: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
) => {
  return <img src={logoSvg} alt="Cause i" {...props} />
}

export const DoBeLogo = (
  props: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
) => {
  return <img src={doBeLogoSvg} alt="Do Be" {...props} />
}

export default Logo
