import Footer from '@/components/footer'
import AppError from '@/components/shared/app-error'
import Logo, { DoBeLogo } from '@/components/shared/logo'
import Routes from '@/data/routes'
import CommonLayout from '@/layouts/common-layout'
import { useNavigate } from 'react-router-dom'
import Typewriter from 'typewriter-effect'

export function Component() {
  const navigate = useNavigate()
  return (
    <CommonLayout>
      <main className="relative h-screen bg-gradient-to-t from-black to-orange">
        <div className="absolute z-10 flex h-full w-full px-4">
          <div className="grid w-full grid-flow-row grid-rows-12 py-8">
            <div className="row-span-2 place-self-center">
              <DoBeLogo className="w-28 lg:h-auto lg:w-auto" />
            </div>
            <div className="row-span-6 place-self-center text-5xl font-bold leading-tight lg:text-6xl">
              <div className="invisible">Data. Immersion. Action.</div>
              <Typewriter
                options={{
                  autoStart: true,
                  delay: 200,
                  deleteSpeed: 150,
                  cursorClassName: `border-l-4 lg:border-l-[6px] border-white text-transparent cursor-effect font-light animate-blink`,
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString('Data.')
                    .deleteAll()
                    .typeString('Immersion.')
                    .deleteAll()
                    .typeString('Action.')
                    .deleteAll()
                    .typeString('Data. Immersion. Action.')
                    .pauseFor(3000)
                    .callFunction(() => {
                      navigate(Routes.LANGUAGE)
                    })
                    .start()
                }}
              />
            </div>
            <div className="row-end-13 place-self-center">
              <Logo className="w-28 opacity-50 lg:h-auto lg:w-auto" />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 h-full w-full bg-transparent bg-[linear-gradient(to_right,#FF9653_1px,transparent_1px),linear-gradient(to_bottom,#FF9653_1px,transparent_1px)] bg-[size:32px_32px] opacity-40"></div>
      </main>
      <Footer />
    </CommonLayout>
  )
}


export function ErrorBoundary() {
  return <AppError />
}
