import CommonLayout from '@/layouts/common-layout'
import Navbar from '@/components/shared/navbar'
import { useState, useEffect } from 'react'
import { Stepper, Button, TextInput, Select, Input, LoadingOverlay } from '@mantine/core'
import { useForm } from '@mantine/form'
import {
  UpdateProfileDto,
  useProfileControllerGetUserMeta,
  useProfileControllerGetUserProfile,
  useProfileControllerUpdateUserProfile,
} from '@/api/auth'
import { FaArrowRight } from 'react-icons/fa6'

import { countries, countryWithCodes, nationalities } from '@/data/country-data'
import { useNavigate } from 'react-router-dom'
import { DateInput } from '@mantine/dates'
import Routes from '@/data/routes'
import { formatErrorMessage } from '@/lib/utils'
import dayjs from 'dayjs'
import AppError from '@/components/shared/app-error'
import { useAppControllerSendResultEmail } from '@/api/survey'
import Footer from '@/components/footer'

export function Component() {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)

  const { data: userMeta , isLoading: isUserMetaLoading} = useProfileControllerGetUserMeta({})
  const { data: profileData, isLoading } = useProfileControllerGetUserProfile({})

  const [dob, setDob] = useState<Date | null>()

  const form = useForm<UpdateProfileDto>({
    initialValues: {
      ...profileData,
      contactNumberCountryCode: countries.find(
        (country) => country.iso2 === profileData?.contactNumberCountryCode
      ) as unknown as string,
    },
    validate: (values) => {
      if (activeStep === 0) {
        return {
          name: values.name ? null : 'Please enter your full name.',
          contactNumberCountryCode: values.contactNumberCountryCode
            ? null
            : 'Please select your country.',
          contactNumber:
            values.contactNumber && values.contactNumber > 999
              ? null
              : 'Please enter your phone number.',
        }
      }
      if (activeStep === 1) {
        return {
          dob: dob ? null : 'Please enter your date of birth.',
          gender: values.gender ? null : 'Please select gender.',
        }
      }
      if (activeStep === 2) {
        return {
          nationality: values.nationality ? null : 'Please enter your nationality.',
          ethnicity: values.ethnicity ? null : 'Please select your ethnicity.',
        }
      }
      if (activeStep === 3) {
        return {
          qualification: values.qualification ? null : 'Please enter your qualification.',
          profession: values.profession ? null : 'Please select your profession.',
        }
      }
      return {}
    },
  })

  const nextStep = () =>
    setActiveStep((current) => {
      if (form.validate().hasErrors) {
        return current
      }

      return current < 3 ? current + 1 : current
    })

  const { mutate: mutateSendEmail } = useAppControllerSendResultEmail({
    mutation: {
      onSuccess() {
        navigate(Routes.PROFILE)
      },
    },
  })

  const { mutate, isPending } = useProfileControllerUpdateUserProfile({
    mutation: {
      onSuccess() {
        if (activeStep >= 3) {
          mutateSendEmail()
        }
        nextStep()
      },
      onError(error) {
        form.setErrors({ profession: formatErrorMessage(error) })
      },
    },
  })

  useEffect(() => {
    if (!isLoading && !isUserMetaLoading && profileData) {
      form.setValues(profileData)
      const dob = profileData.dob
        ? new Date(profileData.dob)
        : dayjs().subtract(18, 'year').toDate()
      setDob(dob)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isUserMetaLoading])

  const prevStep = () => setActiveStep((current) => (current > 0 ? current - 1 : current))

  const onProfileUpdateFormSubmit = (values: UpdateProfileDto) => {
    const getCountryCode = countries.find(
      (country) => country.iso2 === values.contactNumberCountryCode
    )
    const contactNumber = values.contactNumber as unknown as string
    const updatedValues = {
      ...values,
      dob: dob !== null ? dayjs(dob).format('YYYY-MM-DD') : null,
      contactNumberCountryCode: getCountryCode?.countryCode,
    }
    if (contactNumber !== null) {
      updatedValues.contactNumber = parseInt(contactNumber)
    }

    //@ts-ignore
    mutate({ data: updatedValues })
  }

  return (
    <CommonLayout>
      <div className="m-auto max-w-7xl px-4">
        <Navbar />
        <div className="relative m-auto mt-6 max-w-lg lg:mt-9">
          <LoadingOverlay
            visible={isLoading && isUserMetaLoading}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
          />
          <form
            className="rounded-2xl bg-[#212121] px-4 py-9 lg:px-12"
            onSubmit={form.onSubmit((values) => onProfileUpdateFormSubmit(values))}
          >
            <Stepper active={activeStep} size="xs">
              <Stepper.Step>
                <div className="grid gap-4 py-6">
                  <h2 className="text-center text-lg font-semibold">Little more info about you!</h2>
                  <TextInput
                    size="md"
                    radius="md"
                    variant="filled"
                    label="Full Name"
                    key="Full Name"
                    placeholder="Full Name"
                    {...form.getInputProps('name')}
                  />

                  <Select
                    searchable
                    size="md"
                    radius="md"
                    variant="filled"
                    label="Country"
                    key="Country"
                    defaultValue={'in'}
                    placeholder="Pick a country"
                    data={countryWithCodes}
                    limit={10}
                    {...form.getInputProps('contactNumberCountryCode')}
                  />
                  <div className="space-y-1">
                    <Input.Label size="md">Phone Number</Input.Label>
                    <Input
                      type="number"
                      size="md"
                      radius="md"
                      variant="filled"
                      placeholder="Phone Number"
                      {...form.getInputProps('contactNumber')}
                    />
                    <Input.Error size="md">{form.errors?.contactNumber}</Input.Error>
                  </div>
                </div>
              </Stepper.Step>
              <Stepper.Step>
                <div className="grid gap-4 py-6">
                  <DateInput
                    variant="filled"
                    size="md"
                    radius="md"
                    label="Date of birth"
                    placeholder="Date of birth"
                    minDate={dayjs().subtract(150, 'year').toDate()}
                    maxDate={dayjs().subtract(18, 'year').toDate()}
                    key="dob"
                    value={dob}
                    onChange={setDob}
                  />
                  <Select
                    searchable
                    size="md"
                    radius="md"
                    variant="filled"
                    label="Gender"
                    key="Gender"
                    placeholder="Pick value"
                    data={userMeta?.genders}
                    {...form.getInputProps('gender')}
                  />
                </div>
              </Stepper.Step>
              <Stepper.Step>
                <div className="grid gap-4 py-6">
                  <Select
                    searchable
                    size="md"
                    radius="md"
                    variant="filled"
                    label="Nationality"
                    key="Nationality"
                    placeholder="Pick value"
                    data={nationalities}
                    {...form.getInputProps('nationality')}
                  />
                  <Select
                    searchable
                    size="md"
                    radius="md"
                    variant="filled"
                    label="Ethnicity"
                    key="Ethnicity"
                    placeholder="Pick value"
                    data={userMeta?.ethnicities}
                    {...form.getInputProps('ethnicity')}
                  />
                </div>
              </Stepper.Step>
              <Stepper.Step>
                <div className="grid gap-4 py-6">
                  <h2 className="text-center text-lg font-semibold">Almost there!</h2>
                  <Select
                    searchable
                    size="md"
                    radius="md"
                    variant="filled"
                    label="Qualification"
                    key="Qualification"
                    placeholder="Pick value"
                    data={userMeta?.qualifications}
                    {...form.getInputProps('qualification')}
                  />
                  <Select
                    searchable
                    size="md"
                    radius="md"
                    variant="filled"
                    label="Profession"
                    key="Profession"
                    placeholder="Pick value"
                    data={userMeta?.professions}
                    {...form.getInputProps('profession')}
                  />
                </div>
              </Stepper.Step>
            </Stepper>

            <div className="mt-4 flex items-center justify-between px-6">
              {activeStep !== 0 && (
                <Button
                  type="button"
                  variant="outline"
                  px={30}
                  size="md"
                  radius="xl"
                  color="white"
                  onClick={prevStep}
                >
                  Back
                </Button>
              )}

              <Button
                className={activeStep === 0 ? 'ml-auto block' : ''}
                rightSection={<FaArrowRight />}
                px={30}
                variant="white"
                size="md"
                radius="xl"
                color="#101010"
                type="submit"
                loading={isPending}
              >
                {activeStep >= 3 ? 'Submit' : 'Next'}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </CommonLayout>
  )
}

export function ErrorBoundary() {
  return <AppError />
}
