import { useSurveyControllerMarkAsComplete } from '@/api/survey'
import Footer from '@/components/footer'
import AppError from '@/components/shared/app-error'
import Navbar from '@/components/shared/navbar'
import SectionComplete from '@/components/survey/section-complete'
import Routes from '@/data/routes'
import CommonLayout from '@/layouts/common-layout'
import { Case, Switch } from 'react-if'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function Component() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { mutate } = useSurveyControllerMarkAsComplete({})

  const markSurveyAsComplete = () => {
    mutate({ id: parseInt(searchParams.get('id') as string) })
    navigate(Routes.ONBOARDING)
  }

  return (
    <CommonLayout noiseEnabled gradientVariant="multicolor">
      <div className="m-auto max-w-7xl p-4">
        <Navbar />
        <div className="pt-16 lg:py-20">
          <Switch>
            <Case condition={parseInt(searchParams.get('view') as string) >= 44}>
              <SectionComplete
                title={t('completed_scale_title')}
                header={t('completed_scale_header')}
                onClick={() => markSurveyAsComplete()}
                nextButtonText={t('completed_scale_nextButtonText')}
              >
                <p className="font-semibold" style={{ whiteSpace: 'pre-line' }}>{t('completed_scale_message')}</p>
              </SectionComplete>
            </Case>

            <Case condition={parseInt(searchParams.get('view') as string) >= 39}>
              <SectionComplete
                title={t('almost_there_title')}
                header={t('almost_there_header')}
                onClick={() => navigate(Routes.SURVEY)}
                nextButtonText={t('almost_there_nextButtonText')}
              >
                <p style={{ whiteSpace: 'pre-line' }}>{t('almost_there_message')}</p>
              </SectionComplete>
            </Case>

            <Case condition={parseInt(searchParams.get('view') as string) >= 29}>
              <SectionComplete
                title={t('great_going_title')}
                header={t('great_going_header')}
                onClick={() => navigate(Routes.SURVEY)}
                nextButtonText={t('great_going_nextButtonText')}
              >
                <p style={{ whiteSpace: 'pre-line' }}>{t('great_going_message')}</p>
              </SectionComplete>
            </Case>
          </Switch>
        </div>
      </div>
      <Footer />
    </CommonLayout>
  )
}

export function ErrorBoundary() {
  return <AppError />
}
