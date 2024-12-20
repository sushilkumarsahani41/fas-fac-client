import Footer from '@/components/footer'
import AppError from '@/components/shared/app-error'
import Navbar from '@/components/shared/navbar'
import Routes from '@/data/routes'
import CommonLayout from '@/layouts/common-layout'
import { Button } from '@mantine/core'
import { useState } from 'react'
import { IoPlaySkipForwardOutline } from 'react-icons/io5'
import { When } from 'react-if'
import { useNavigate } from 'react-router-dom'
import Typewriter from 'typewriter-effect'

export function Component() {
  const navigate = useNavigate()
  const [showNext, setShowNext] = useState(false)

  return (
    <CommonLayout noiseEnabled>
      <div className="m-auto max-w-7xl px-4">
        <Navbar />
        <div className="m-auto max-w-5xl">
          <p className="pb-5 pt-10 text-xl font-semibold leading-relaxed tracking-wide lg:pb-10 lg:pt-16 lg:text-3xl">
            <Typewriter
              options={{
                autoStart: true,
                delay: 20,
                wrapperClassName: 'block text-center leading-relaxed ',
                cursorClassName: `hidden`,
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString(
                    `This survey has a variety of question formats that enable mapping and scaling of <i>pro-social motivation, ability and skill.</i> <br/> WHY? <br/> This segmentation is crucial to <i>streamline, standardize and harmonize data</i> into blended insights for simplifying behavior change campaigns of the impact sector. <br/> <br/> To customize survey analysis to a respondent’s profile, it is requested that all questions are attempted with honesty.`
                  )
                  .callFunction(() => {
                    setShowNext(true)
                  })
                  .start()
              }}
            />
          </p>
          <When condition={showNext}>
            <div className="flex items-center justify-center">
              <Button
                type="submit"
                variant="white"
                size="lg"
                radius="xl"
                color="#101010"
                className=" text-gray"
                rightSection={<IoPlaySkipForwardOutline />}
                onClick={() => navigate(Routes.SURVEY_START)}
              >
                Next
              </Button>
            </div>
          </When>
        </div>
      </div>
      <Footer />
    </CommonLayout>
  )
}


export function ErrorBoundary() {
  return <AppError />
}
