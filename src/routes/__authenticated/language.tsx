import { DoBeLogo } from '@/components/shared/logo'

import AuthLayout from '@/layouts/auth-layout'

import { Button, Select } from '@mantine/core'
import { useEffect, useState } from 'react'

import AppError from '@/components/shared/app-error'
import { useNavigate } from 'react-router-dom'
import Routes from '@/data/routes'
import { useAppControllerGetKarmaScale } from '@/api/survey'
import { useAtom } from 'jotai'
import { accessTokenAtom } from '@/data/store'
import { useProfileControllerGetUserProfile } from '@/api/auth'
import Footer from '@/components/footer'
import i18n from '@/i18n'

export function Component() {
  const [accessToken] = useAtom(accessTokenAtom)
  const { data: scaleInfo } = useAppControllerGetKarmaScale({
    query: {
      enabled: !!accessToken,
      retry: 0,
    },
  })
  const { data: profileInfo } = useProfileControllerGetUserProfile({
    query: {
      enabled: !!accessToken,
      retry: 0,
    },
  })

  const navigate = useNavigate()

  const [searchValue, setSearchValue] = useState<string>('English')

  useEffect(() => {
    if (searchValue == "") {
      const savedValue = localStorage.getItem('selectedLanguage');
      if (savedValue) {
        setSearchValue(savedValue)
      }
    }

    localStorage.setItem('selectedLanguage', searchValue)
    i18n.changeLanguage(searchValue.slice(0, 2).toLowerCase())
  }, [searchValue])

  const handleNavigate = () => {
    if (!scaleInfo) {
      if (profileInfo?.pincode) {
        navigate(Routes.SURVEY_INFO)
        return
      } else {
        navigate('/locate')
        return
      }
    }
    if (scaleInfo) {
      if (!scaleInfo.completed) {
        navigate(Routes.SURVEY)
        return
      }
    } else {
      navigate('/locate')
    }
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-xs py-6 text-center">
        <DoBeLogo className="mx-auto mb-10 w-20 lg:h-auto lg:w-auto" />
        <h1 className="text-xl font-medium lg:text-2xxl">Choose your preferred language</h1>
        <p className="mb-4 mt-2 text-sm font-light opacity-80 lg:text-base">
          Why ? we respect the culture you belong to and want you to be at easy here{' '}
        </p>
        <Select
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          defaultValue={'English'}
          data={['English', 'Hindi']}
          radius="md"
          styles={{ dropdown: { borderRadius: '10px' } }}
        />
        <Button
          variant="white"
          size="lg"
          radius="xl"
          color="#101010"
          fullWidth
          className="mt-8 text-gray"
          onClick={handleNavigate}
        >
          Submit
        </Button>
      </div>
      <Footer />
    </AuthLayout>
  )
}

export function ErrorBoundary() {
  return <AppError />
}
