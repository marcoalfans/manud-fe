/* eslint-disable no-undef */
import { Spinner } from '@nextui-org/react'
import { NextPage } from 'next'
import { Button } from '@/components/ui/button'

interface Props {
  chidlren?: React.ReactNode
  btnText: string
  isLoading?: boolean
}

const SubmitButton: NextPage<Props> = ({ btnText, isLoading = false }) => {
  return (
    <>
      <div className='w-full'>
        <Button
          disabled={isLoading}
          className='group relative mb-2 me-2 mt-8 inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-200 group-hover:from-cyan-500 group-hover:to-blue-500 dark:text-white dark:focus:ring-cyan-800'
        >
          {isLoading ? <Spinner size='sm' /> : btnText}
        </Button>
      </div>
    </>
  )
}

export default SubmitButton
