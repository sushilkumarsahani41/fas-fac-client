import { useAppControllerGetCauseLevel, useAppControllerGetKarmaScale } from '@/api/survey'
import Footer from '@/components/footer'
import Chart from '@/components/profile/chart'
import ProfileFooter from '@/components/profile/footer'
import ProfileInfo from '@/components/profile/info'
import AppError from '@/components/shared/app-error'
import Navbar from '@/components/shared/navbar'
import CommonLayout from '@/layouts/common-layout'

export function Component() {
  const { data: causeLevelInfo } = useAppControllerGetCauseLevel({
    query: {
      refetchOnWindowFocus: false,
    },
  })

  if (causeLevelInfo) {
    return (
      <>
        <CommonLayout>
          <div className="m-auto max-w-7xl px-4">
            <Navbar />
            <ProfileInfo {...causeLevelInfo} />

            <section className="grid gap-6 lg:grid-cols-12">
              <div className="rounded-lg bg-black/30 lg:col-span-3">
                <div className="flex flex-col p-8">
                  <div className="mx-auto w-min rounded-full bg-white p-3">
                    <div className=" flex h-24 w-24 items-center justify-center rounded-full border-8 border-orange bg-white text-xl font-bold text-black">
                      {causeLevelInfo.meanScore}
                    </div>
                  </div>
                  <p className="my-4 text-center font-medium">K.A.R.M.A SCORE</p>
                  <p className="mb-1 mt-4">ATTRIBUTES</p>
                  <p>
                    Highest -{' '}
                    <span className="capitalize text-white/70">
                      {causeLevelInfo.highestAttribute}
                    </span>
                  </p>
                  <p>
                    Lowest -{' '}
                    <span className="capitalize text-white/70">
                      {causeLevelInfo.lowestAttribute}
                    </span>
                  </p>
                </div>
              </div>
              <div className="rounded-lg bg-black/30 lg:col-span-9">
                <Chart scale={causeLevelInfo.scale} />
              </div>
            </section>
          </div>
        </CommonLayout>
        <ProfileFooter />
        <Footer />
      </>
    )
  }
}

export function ErrorBoundary() {
  return <AppError />
}
