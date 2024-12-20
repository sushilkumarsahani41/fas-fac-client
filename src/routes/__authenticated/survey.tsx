import {
  useAppControllerGetKarmaScale,
  useSurveyControllerGetQuestions,
  useSurveyControllerGetSurveyResponse,
} from '@/api/survey'
import Footer from '@/components/footer'
import AppError from '@/components/shared/app-error'
import Survey from '@/components/survey'
import Routes from '@/data/routes'
import { SURVEY_ID } from '@/lib/constants'
import { findNotFullyAnsweredQuestionType } from '@/lib/utils'
import { groupBy } from 'lodash-es'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function Component() {
  const navigate = useNavigate()
  const { data: allQuestions } = useSurveyControllerGetQuestions(SURVEY_ID, {
    query: {
      refetchOnWindowFocus: false,
    },
  })
  const { data: scaleInfo } = useAppControllerGetKarmaScale({
    query: {
      refetchOnWindowFocus: false,
    },
  })
  const { data: surveyResponses, queryKey } = useSurveyControllerGetSurveyResponse(SURVEY_ID, {
    query: {
      refetchOnWindowFocus: false,
    },
  })

  useEffect(() => {
    if (allQuestions && scaleInfo && surveyResponses) {
      if (scaleInfo.completed) {
        navigate(Routes.PROFILE)
      } else {
        if (surveyResponses.length === allQuestions.length) {
          navigate(
            `${Routes.SECTION_COMPLETE}?id=${allQuestions[0].surveyId}&view=${surveyResponses.length}`
          )
        }
      }
    }
  }, [allQuestions, scaleInfo, surveyResponses, navigate])

  if (allQuestions && surveyResponses && scaleInfo) {
    const questionGroupByType = groupBy(allQuestions, 'type')

    const notFullyAnsweredQuestionType = findNotFullyAnsweredQuestionType(
      questionGroupByType,
      surveyResponses
    )
    const currentQuestionId = scaleInfo?.currentQuestionId
    const currentSection = questionGroupByType[notFullyAnsweredQuestionType as string]

    return (
      <>
        <Survey
          questions={currentSection}
          responses={surveyResponses}
          currentQuestionId={currentQuestionId}
          responseQueryKey={queryKey}
          totalQuestionLength={allQuestions.length}
        />
        <Footer />
      </>
    )
  }
}

export function ErrorBoundary() {
  return <AppError />
}
