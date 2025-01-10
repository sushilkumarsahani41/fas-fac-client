import CommonLayout from '@/layouts/common-layout'
import Navbar from '@/components/shared/navbar'
import { useState } from 'react'
import {Button, TextInput, Select } from '@mantine/core'
import {
  useProfileControllerGetUserMeta,
} from '@/api/auth'
import { FaArrowRight } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import AppError from '@/components/shared/app-error'

import Footer from '@/components/footer'
import {  nationalities } from '@/data/country-data'
import {useFasfacUserPrefsControllerUpdate} from "@/api/survey.ts"
import {useAtom} from "jotai";
import {initatePaymentAtom, pledgeAmountAtom, userPrefIdAtom} from "@/data/store.ts"
import Routes from "@/data/routes.ts"


export function Component() {
  const { data: userMeta } = useProfileControllerGetUserMeta({})
  const navigate = useNavigate()
  const [fullName, setFullName] = useState(null)
  const [, setInitatePayment ] = useAtom(initatePaymentAtom)
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [amountPledge] = useAtom(pledgeAmountAtom)
  const [userPrefId] = useAtom(userPrefIdAtom)
  const [age, setAge] = useState(0)
  const [nationality, setNationality] = useState(null)
  const [profession, setProfession] = useState(null)
  const [gender, setGender] = useState(null)

  const { mutate } = useFasfacUserPrefsControllerUpdate({
    mutation: {
      onSuccess(data) {
        console.log('Success:', data);
        // Log successful response
        const initiatePayment = {
          amount:amountPledge,
          productinfo:"Donation on Social Cause",
          firstname:fullName,
          phone:phoneNumber,
        }
        setInitatePayment(initiatePayment)
        console.log(initiatePayment);
        navigate(Routes.PAYMENT)
      },
      onError(error) {
        console.error('Error:', error); // Log any error
      },
    },
  })

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (!userPrefId) {
      console.error("Error: Missing userPrefId");
      return;
    }

    const updateData = {
      age: age,
      amountPledge: amountPledge,
      fullName: fullName,
      gender: gender,
      nationality: nationality,
      phoneNumber: phoneNumber,
      profession: profession,
    };
    console.log('Success:', updateData);
      mutate({ id: 26, data: updateData });
  }

  return (
    <CommonLayout gradientVariant={'multicolor'}>
      <div className="m-auto max-w-7xl my-8 px-4">
        <Navbar />
        <h1 className="text-3xl font-bold text-white">A Little About You</h1>
        <p className="text-2xl">Share a few details about yourself to make your experience better</p>
        <br />
        <form className="gap-2" onSubmit={handleSubmit}>
          <div className="flex text-2xl gap-3">
            <div className="w-full ">
              <TextInput
                  size="md"
                  radius="md"
                  onChange={(value) => setFullName(value.target.value)}
                  placeholder="Full Name" />
              <br />
              <TextInput
                  size="md"
                  radius="md"
                  type="number"
                  onChange={(value) => setAge(parseInt(event.target.value, 10))}
                  placeholder="Age"
              />
              <br />
              <Select
                  size="md"
                  searchable
                  radius="md"
                  onChange={(value) => setNationality(value)}
                  placeholder="Nationality"
                  data={nationalities}
             />
            </div>
            <div className="w-full">
              <TextInput
                  size="md"
                  radius="md"
                  type="number"
                  maxLength={10}
                  placeholder="Phone Number"
                  onChange={(value) => setPhoneNumber(value.target.value)}
              />
              <br />
              <Select
                  size="md"
                  searchable
                  data={userMeta?.genders}
                  radius="md"
                  placeholder="Gender"
                  onChange={(value) => setGender(value)}
              />
              <br />
              <Select
                  searchable
                  size="md"
                  radius="md"
                  key="Profession"
                  placeholder="Profession"
                  data={userMeta?.professions}
                  onChange={(value) => setProfession(value)}
              />
            </div>
            <div className="w-full">

            </div>
          </div>
          <br />
          <Button
            rightSection={<FaArrowRight />}
            px={30}
            variant="white"
            size="md"
            radius="xl"
            color="#101010"
            type="submit"
          >
            Next
          </Button>
        </form>
      </div>
      <Footer />
    </CommonLayout>
  )
}

export function ErrorBoundary() {
  return <AppError/>
}
