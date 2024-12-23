import { useTranslation } from 'react-i18next'
import AppError from '@/components/shared/app-error'
import Routes from '@/data/routes'
import CommonLayout from '@/layouts/common-layout'
import { Button } from '@mantine/core'

import { useNavigate } from 'react-router-dom'
import i18n from '@/i18n'
import {ImArrowRight2} from "react-icons/im"
import {useState} from "react"

export function Component() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [selectedBox, setSelectedBox] = useState(null); // Track selected box

    const boxes = ["Cause 1", "Cause 2", "Cause 3", "Cause 4", "Cause 5"];

    const handleBoxClick = (index) => {
        setSelectedBox(selectedBox === index ? null : index); // Deselect if clicked again
    };

    const currentLanguage = i18n.language

    return (
      <CommonLayout gradientVariant="dual">
        <div className="m-auto max-w-7xl px-4 py-24">
            <div className="flex flex-col gap-6 lg:col-span-5">
                <h1 className="leading-snug lg:text-4xl">
                    <span className="text-4xl font-medium">{t('cause-selection')} </span>
                </h1>
                <p className="font-normal lg:text-lg">{t('cause-selection-des')}</p>
                <div className="grid grid-cols-5 gap-4 p-4 bg-gray-100 w-full">
                    {boxes.map((box, index) => (
                        <div
                            key={index}
                            onClick={() => handleBoxClick(index)} // Handle click event
                            className={`aspect-square ${
                                selectedBox === index
                                    ? "rounded bg-gradient-to-r from-orange to-pink"
                                    : "rounded hover:bg-orange"
                            } cursor-pointer transition duration-300 p-1`}

                        >
                            <div className="w-full h-full bg-[#828282] rounded flex bg-cover bg-center items-end px-3 py-2 text-white font-bold" style={{
                                backgroundImage: `url('https://impresario-cdn-public.s3.ap-south-1.amazonaws.com/cause-i/09abc7b2ac8ff279b689715432193e9d.png')`,
                            }}>{box}</div>
                        </div>
                    ))}
                </div>


                <div className="flex items-center">
                    <Button
                        type="submit"
                        variant="white"
                        size="lg"
                        radius="xl"
                        color="#101010"
                        rightSection={<ImArrowRight2/>}
                        className=" text-gray"
                        onClick={() => {
                            navigate(Routes.PLEDGE)
                        }}
                    >
                        <div className="flex px-20">{t('proceed')}</div>
                    </Button>
                </div>
            </div>
        </div>
      </CommonLayout>
    )
}

export function ErrorBoundary() {
    return <AppError/>
}
