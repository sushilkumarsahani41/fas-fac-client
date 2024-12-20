import { RegisterDto, useAppControllerRegister } from '@/api/auth'
import Footer from '@/components/footer'
import AppError from '@/components/shared/app-error'
import { DoBeLogo } from '@/components/shared/logo'
import Routes from '@/data/routes'
import AuthLayout from '@/layouts/auth-layout'
import { formatErrorMessage } from '@/lib/utils'
import { TextInput } from '@mantine/core'
import { Button } from '@mantine/core'
import { useForm, isEmail } from '@mantine/form'
import { useNavigate } from 'react-router-dom'

export function Component() {
  const navigate = useNavigate()
  const form = useForm<RegisterDto>({
    initialValues: {
      email: '',
    },

    validate: {
      email: isEmail(),
    },
  })

  const { mutate, isPending } = useAppControllerRegister({
    mutation: {
      onSuccess(data) {
        navigate(`${Routes.VERIFY}?token=${data.verificationToken}`)
      },
      onError(error) {
        form.setErrors({ email: formatErrorMessage(error) })
      },
    },
  })

  const onRegisterFormSubmit = (values: RegisterDto) => {
    mutate({ data: values })
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-xs py-6 text-center">
        <DoBeLogo className="mx-auto mb-10 w-20 lg:h-auto lg:w-auto" />
        <h1 className="text-xl font-medium lg:text-2xxl">Create K.A.R.M.A. Account</h1>
        <p className="mb-4 mt-2 text-sm font-light opacity-80 lg:text-base">
          K.A.R.M.A. Account is a centralized account which can be used on other platforms like
          Cause-i and Deed-O
        </p>

        <form onSubmit={form.onSubmit((values) => onRegisterFormSubmit(values))}>
          <TextInput
            autoFocus
            required
            variant="filled"
            placeholder="Enter email"
            type="email"
            size="lg"
            classNames={{
              input: 'text-base rounded-xl',
            }}
            {...form.getInputProps('email')}
          />

          <Button
            loading={isPending}
            type="submit"
            variant="white"
            size="lg"
            radius="xl"
            color="#101010"
            fullWidth
            className="mt-8 text-gray"
          >
            Send Verification Code
          </Button>

          <p className="mt-2 text-xs text-white/80">
            Already have an account? {''}
            <span className="cursor-pointer underline" onClick={() => navigate(Routes.LOGIN)}>
              Login Here
            </span>
          </p>
        </form>
      </div>
      <Footer />
    </AuthLayout>
  )
}

export function ErrorBoundary() {
  return <AppError />
}
