import AuthLayout from '@/layouts/auth-layout'
import { DoBeLogo } from '@/components/shared/logo'
import { LinkButton } from '@/components/shared/buttons'
import Routes from '@/data/routes'
import AppError from '@/components/shared/app-error'
import Footer from '@/components/footer'

export function Component() {
  return (
    <AuthLayout>
      <div className="max-w-xl py-6 text-center">
        <DoBeLogo className="mx-auto mb-10 w-20 lg:h-auto lg:w-auto" />
        <h1 className="text-xl font-medium lg:text-2xxl">Do you have a K.A.R.M.A. account?</h1>
        <div className='max-w-xs m-auto'>
          <p className="mt-2 text-sm font-light opacity-80 lg:text-base">
            K.A.R.M.A. account is a centralized gateway that gives you access to the entire
            DoBe-verse!
          </p>
          <LinkButton href={Routes.LOGIN} fullWidth className="mt-6">
            I have a K.A.R.M.A. account
          </LinkButton>
          <div className="relative my-4">
            <span className="absolute -top-2 left-1/2 block w-12 -translate-x-1/2 bg-[#161616] text-xs text-white/50">
              or
            </span>
            <hr className=" w-full text-white/20" />
          </div>
          <LinkButton href={Routes.REGISTER} variant="white" fullWidth>
            I am new here
          </LinkButton>
        </div>
      </div>
      <Footer />
    </AuthLayout>
  )
}

export function ErrorBoundary() {
  return <AppError />
}
