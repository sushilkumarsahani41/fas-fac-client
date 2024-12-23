import { useTranslation } from 'react-i18next'
import { useAppControllerUpdateScaleCurrentQuestionId } from '@/api/survey'
import Footer from '@/components/footer'
import AppError from '@/components/shared/app-error'
import Navbar from '@/components/shared/navbar'
import Routes from '@/data/routes'
import editorIcon from '@/assets/editor-icon.svg'
import supportIcon from '@/assets/support.svg'
import spreadIcon from '@/assets/spread-love.svg'
import CommonLayout from '@/layouts/common-layout'
import { Button } from '@mantine/core'
import { IoPlaySkipForwardOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import i18n from '@/i18n'

export function Component() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const currentLanguage = i18n.language

  return (
    <CommonLayout gradientVariant="dual">
      <div className="m-auto max-w-7xl px-4">
        <Navbar />
        <div className="grid gap-10 py-10 lg:grid-cols-12 lg:pt-16">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <h1 className="leading-snug lg:text-4xl">
              <span className="text-4xl font-medium">{t('fas-fac-welcome')} </span>
              <br />
              <br />
              <p
                className={`font-large bg-gradient-to-r from-orange to-pink bg-clip-text text-8xl font-bold text-transparent ${
                  currentLanguage === 'hi' ? 'leading-12 lg:leading-13' : ''
                }`}
              >
                {t('fas-fac')}
              </p>
            </h1>
            <p className="font-normal lg:text-lg">{t('got-a-minute')}</p>
            <p className="font-normal lg:text-lg">{t('fas-fac-description')}</p>
            <div className="flex items-center">
              <Button
                type="submit"
                variant="white"
                size="lg"
                radius="xl"
                color="#101010"
                className=" text-gray"
                rightSection={<IoPlaySkipForwardOutline />}
                onClick={() => {
                  navigate(Routes.CAUSE)
                }}
              >
                {t('fas-fac-start')}
              </Button>
            </div>
          </div>
          <div className="content-center justify-center lg:col-span-7 lg:justify-self-center">
            <div className="flex flex-row items-center justify-center gap-4">
              {/* First SVG */}
              <img src={editorIcon} alt="Icon 1" className="h-28" />

              {/* Second SVG */}
              <img src={supportIcon} alt="Icon 2" className="h-28" />

              {/* Third SVG */}
              <img src={spreadIcon} alt="Icon 3" className="h-28" />
            </div>
            <br />
            <div className="flex flex-col">
              <p className="font-normal lg:text-lg">{t('sipping-coffee')}</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </CommonLayout>
  )
}

export function ErrorBoundary() {
  return <AppError/>
}
