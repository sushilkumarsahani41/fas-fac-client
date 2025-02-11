import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mantine/core'
import { IoPlaySkipForwardOutline } from 'react-icons/io5'
import Navbar from '@/components/shared/navbar.tsx'
import Footer from '@/components/footer.tsx'
import AppError from '@/components/shared/app-error.tsx'
import Routes from '@/data/routes.ts'
import CommonLayout from '@/layouts/common-layout.tsx'
import editorIcon from '@/assets/editor-icon.svg'
import supportIcon from '@/assets/support.svg'
import spreadIcon from '@/assets/spread-love.svg'
import i18n from '@/i18n'

export function Component() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const currentLanguage = i18n.language

  return (
      <CommonLayout gradientVariant="dual">
        <div className="m-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Navbar />
          <div className="grid gap-8 py-8 lg:grid-cols-12 lg:pt-12">
            {/* Left Section */}
            <div className="flex flex-col gap-6 lg:col-span-5">
              <h1 className="leading-snug lg:text-4xl">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-medium">{t('fas-fac-welcome')} </span>
                <br />
                <br />
                <p
                    className={`font-large bg-gradient-to-r from-orange to-pink bg-clip-text text-5xl sm:text-6xl lg:text-8xl font-bold text-transparent ${
                        currentLanguage === 'hi' ? 'leading-9 sm:leading-10 lg:leading-12' : ''
                    }`}
                >
                  {t('fas-fac')}
                </p>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl font-normal">
                Got a minute?
                <br /> Ever thought you could amplify a cause that matters <span className="text-orange font-bold">to you</span> by simply filling out a survey? You can! Yup, it's that easy.
              </p>
              <p className="text-base sm:text-lg lg:text-xl font-normal">
                Bonus: Get a sense of your civic empathy quotient <b>while at it!</b>
              </p>
              <div className="flex items-center mt-4">
                <Button
                    type="submit"
                    variant="white"
                    size="lg"
                    radius="xl"
                    color="#101010"
                    className="text-gray"
                    onClick={() => navigate(Routes.ACCOUNTSCR)}
                >
                  {t('fas-fac-start')}
                </Button>
              </div>
            </div>

            {/* Right Section */}
            <div className="lg:col-span-7 flex justify-center items-center">
              <div className="flex flex-col items-center">
                <div className="flex flex-wrap items-center justify-center gap-6">
                  <img src={editorIcon} alt="Icon 1" className="h-16 sm:h-20 lg:h-28" />
                  <img src={supportIcon} alt="Icon 2" className="h-16 sm:h-20 lg:h-28" />
                  <img src={spreadIcon} alt="Icon 3" className="h-16 sm:h-20 lg:h-28" />
                </div>
                <br />
                <div className="text-center">
                  <p className="text-sm sm:text-base lg:text-lg font-normal">{t('sipping-coffee')}</p>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </CommonLayout>
  )
}

export function ErrorBoundary() {
  return <AppError />
}
