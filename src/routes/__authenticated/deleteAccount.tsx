import { useProfileControllerDeleteUserProfile } from '@/api/auth'
import { DoBeLogo } from '@/components/shared/logo'
import AuthLayout from '@/layouts/auth-layout'
import { Modal } from '@mantine/core'
import { Button } from '@mantine/core'
import Routes from '@/data/routes'
import { useNavigate } from 'react-router-dom'
import AppError from '@/components/shared/app-error'
import { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import Footer from '@/components/footer'

export function Component() {
  const navigate = useNavigate()
  const [opened, { open, close }] = useDisclosure(false)
  const [showSnackbar, setShowSnackbar] = useState(false)

  const { mutate: deleteUserProfile, isPending, isError, isSuccess } = useProfileControllerDeleteUserProfile({
    mutation: {
      onSuccess() {
        setShowSnackbar(true)
        setTimeout(() => {
          setShowSnackbar(false)
          localStorage.clear()
          navigate(Routes.LOGIN)
        }, 1500)
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      },
      onError(error) {
        console.error('Failed to delete profile', error)
      },
    },
  })

  const handleDeleteYes = () => {
    deleteUserProfile()
  }

  return (
    <AuthLayout>
      {showSnackbar && (
        <div
          style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            backgroundColor: 'red',
            color: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            zIndex: 9999,
            opacity: showSnackbar ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
        >
          Your account has been deleted
        </div>
      )}
      <Modal opened={opened} onClose={close} withCloseButton={true}>
        <div
          style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
          }}
        >
          You’re about to request deletion of your account along with personal data associated with your account.
        </div>
        <div style={{ marginTop: '10px', fontSize: '16px', textAlign: 'center' }}>
          By deleting your account, you will no longer have access to the Dobe app and all the content uploaded by you on the Dobe app. Any subscription associated with your account will be canceled.
          Once you type “Delete” and submit this form, we will begin to process your account deletion request.
          Please note that it may take some time to process your request.
        </div>
        <div
          style={{
            marginTop: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Button style={{ background: 'red' }} onClick={handleDeleteYes} loading={isPending}>
            Yes
          </Button>
          <Button style={{ background: 'skyblue' }} onClick={close}>
            No
          </Button>
        </div>
      </Modal>
      <div className="w-full max-w-xs py-6 text-center">
        <DoBeLogo className="mx-auto mb-10 w-20 lg:h-auto lg:w-auto" />

        <Button
          type="submit"
          variant="white"
          size="lg"
          radius="xl"
          color="#101010"
          fullWidth
          className="mt-8 text-gray"
          style={{ color: 'white', background: 'red' }}
          onClick={() => open()}
        >
          Delete Account
        </Button>

        {isError && <p>Error deleting account. Please try again.</p>}
        {isSuccess && <p>Account deleted successfully.</p>}
      </div>
      <Footer />
    </AuthLayout>
  )
}

export function ErrorBoundary() {
  return <AppError />
}
