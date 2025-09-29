import { Metadata } from 'next'

import SignUpForm from '@/app/(auth)/sign-up/components/SignUpForm'

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'manud jaya - Sign Up'
}

const SignUpPage = () => {
  return (
    <>
      <SignUpForm />
    </>
  )
}

export default SignUpPage
