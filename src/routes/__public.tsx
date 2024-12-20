import { useProfileControllerGetUserProfile } from '@/api/auth'
import { useAppControllerGetKarmaScale } from '@/api/survey'
import Routes from '@/data/routes'
import { accessTokenAtom } from '@/data/store'
import { useAtom } from 'jotai'
import { isEmpty } from 'lodash-es'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export function Component() {
  const navigate = useNavigate()
  const location: any = useLocation()
  const [accessToken] = useAtom(accessTokenAtom)
  const { data: profileInfo } = useProfileControllerGetUserProfile({
    query: {
      enabled: !!accessToken,
    },
  })
  const {
    data: scaleInfo,
    isLoading,
    error,
  } = useAppControllerGetKarmaScale({
    query: {
      enabled: !!accessToken,
      retry: 0,
    },
  })

  useEffect(() => {
    if (profileInfo) {
      if (isEmpty(profileInfo.city)) {
        navigate(Routes.LANDING)
        return
      }
      if (!isLoading) {
        if (error?.response?.status === 404) {
          navigate(Routes.SURVEY_INFO)
        }
        if (!scaleInfo) {
          navigate(Routes.LANGUAGE)
          return
        }
        if (scaleInfo) {
          if (!scaleInfo.completed) {
            navigate(Routes.LANGUAGE)
            return
          }
          if (isEmpty(profileInfo.profession)) {
            navigate(Routes.ONBOARDING)
            return
          }
          navigate(Routes.PROFILE)
          return
        }
      }
    }
  }, [profileInfo, scaleInfo, navigate, isLoading])
  return <Outlet />
}
