import { useTranslation } from 'react-i18next'
import { useAppControllerUpdateScaleCurrentQuestionId } from '@/api/survey'
import Footer from '@/components/footer'
import AppError from '@/components/shared/app-error'
import Navbar from '@/components/shared/navbar'
import Routes from '@/data/routes'

import { scales } from '@/data/scales'
import CommonLayout from '@/layouts/common-layout'
import { Button } from '@mantine/core'
import { IoPlaySkipForwardOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { EffectCards } from 'swiper/modules'
import { SwiperSlide } from 'swiper/react'
import { Swiper } from 'swiper/react'
import i18n from '@/i18n'

export function Component() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { mutate } = useAppControllerUpdateScaleCurrentQuestionId({
    mutation: {
      onSuccess() {
        navigate(Routes.SURVEY)
      },
    },
  })

  const currentLanguage = i18n.language

  return (
    <CommonLayout noiseEnabled gradientVariant="dual">
      <div className="m-auto max-w-7xl px-4">
        <Navbar />
        <div className="grid gap-10 py-10 lg:grid-cols-12 lg:pt-16">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <h1 className="text-3xl uppercase leading-snug lg:text-4xl">
              <span className="font-medium">{t('welcome')} </span>
              <br />
              <p className={`bg-gradient-to-r from-pink to-orange bg-clip-text font-bold text-transparent ${currentLanguage === 'hi' ? 'leading-12 lg:leading-13' : ''}`}>
                {t('discover_potential')}
              </p>
            </h1>
            <p className="font-normal lg:text-lg">{t('instructions_1')}</p>
            <p className="font-normal lg:text-lg">{t('instructions_2')}</p>
            <div className="flex items-center">
              <Button
                type="submit"
                variant="white"
                size="lg"
                radius="xl"
                color="#101010"
                className=" text-gray"
                rightSection={<IoPlaySkipForwardOutline />}
                onClick={() => mutate({ data: { currentQuestionId: 1 } })}
              >
                {t('start_button')}
              </Button>
            </div>
          </div>
          <div className="content-center justify-self-start lg:col-span-7 lg:justify-self-center">
            <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className="mySwiper">
              {scales.map((scale) => (
                <SwiperSlide
                  key={scale.title}
                  style={{ background: `url('${scale.imgUrl}')` }}
                  className="relative"
                >
                  <div className={`h-full w-full ${scale.color} mix-blend-multiply`}></div>
                  <div className="absolute bottom-0 flex h-full flex-col justify-end p-2 text-center">
                    <p className="text-sm font-normal">{t('cause_novice_caption')}</p>
                    <h3 className="text-2xl font-bold">{t('cause_novice_title')}</h3>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
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
