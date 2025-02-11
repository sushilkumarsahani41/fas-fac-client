import CommonLayout from '@/layouts/common-layout'
import Navbar from './navbar'
import { Button } from '@mantine/core'

const AppError = () => {
  return (
    <CommonLayout>
      <div className="m-auto max-w-7xl px-4">
        <Navbar />
        <div className="flex h-[calc(100vh-131px)] flex-col items-center justify-center gap-4">
          <img src="/error.svg" alt="error" className="h-20 w-20" />
          <h1 className="text-2xl font-bold">Something Went Wrong !</h1>
          <p className="text-sm font-normal text-white/90">Please refresh page to load data</p>
          <Button
            variant="white"
            radius="xl"
            color="#101010"
            className="mt-2 text-gray"
            onClick={() => window.location.reload()}
          >
            Refresh
          </Button>
        </div>
      </div>
    </CommonLayout>
  )
}

export default AppError
