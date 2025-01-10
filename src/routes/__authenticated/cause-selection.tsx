import { useTranslation } from 'react-i18next';
import AppError from '@/components/shared/app-error';
import Routes from '@/data/routes';
import CommonLayout from '@/layouts/common-layout';
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { ImArrowRight2 } from 'react-icons/im';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai/index';
import {accessTokenAtom, selectedCauseAtom, userPrefIdAtom} from '@/data/store.ts';
import {
    useFasfacCauseControllerFindAll,
    useFasfacUserPrefsControllerCreate
} from '@/api/survey.ts';
import {useProfileControllerGetUserProfile} from "@/api/auth.ts";

export function Component() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [accessToken] = useAtom(accessTokenAtom);
    const [userPrefId, setUserPrefId] = useAtom(userPrefIdAtom);
    const [selectedBox, setSelectedBox] = useState(null); // Track selected box
    const [selectedCause, setSelectedCause] = useAtom(selectedCauseAtom); // Manage selected cause globally
    const { mutate } = useFasfacUserPrefsControllerCreate({
        mutation: {
            onSuccess: (data) => {
                // console.log(data.id);
                setUserPrefId(data.id);
            }
        }
    })
    const { data: FasFacAllCauses, isLoading, isError } = useFasfacCauseControllerFindAll({
        query: {
            enabled: !!accessToken,
        },
    });
    const { data: profileInfo } = useProfileControllerGetUserProfile({
        query: {
            enabled: !!accessToken,
        },
    })
    // Log the fetched data for debugging
    useEffect(() => {
        if (FasFacAllCauses) {
            console.log('FasFacAllCauses Data:', FasFacAllCauses);
        }
    }, [FasFacAllCauses]);

    const handleBoxClick = (index) => {
        if (FasFacAllCauses) {

            const selCause = FasFacAllCauses[index]; // Get the cause object by index
            setSelectedCause(selCause); // Save the selected cause globally
            setSelectedBox(selectedBox === index ? null : index); // Update UI state
        }
    };

    const handleProceedClick = async () => {
        if (selectedCause) {
            const updateValues = {
                userId:profileInfo?.id,
                causeId:selectedCause.id,
            }
            console.log('updateValues:', updateValues);
            mutate({ data: updateValues })

            navigate(Routes.PLEDGE); // Navigate only if a cause is selected
        } else {
            alert("Please Select a Cause"); // Show an alert if no cause is selected
        }
    };

    if (isLoading) {
        return <div>{t('loading')}</div>; // Show loading state while data is being fetched
    }

    if (isError) {
        return <div>{t('error-loading-data')}</div>; // Show error state if data fetching fails
    }

    return (
        <CommonLayout gradientVariant="dual">
            <div className="m-auto max-w-7xl px-4 py-24">
                <div className="flex flex-col gap-6 lg:col-span-5">
                    <h1 className="leading-snug lg:text-4xl">
                        <span className="text-4xl font-medium">{t('cause-selection')}</span>
                    </h1>
                    <p className="font-normal lg:text-lg">{t('cause-selection-des')}</p>
                    <div className="grid grid-cols-5 gap-4 p-4 bg-gray-100 w-full">
                        {FasFacAllCauses?.map((cause, index) => (
                            <div
                                key={cause.id}
                                onClick={() => handleBoxClick(index)} // Handle click event
                                className={`aspect-square ${
                                    selectedBox === index
                                        ? 'rounded bg-gradient-to-r from-orange to-pink'
                                        : 'rounded hover:bg-orange'
                                } cursor-pointer transition duration-300 p-1`}
                            >
                                <div
                                    className="w-full h-full bg-[#828282] rounded flex bg-cover bg-center items-end px-3 py-2 text-white font-bold"
                                    style={{
                                        backgroundImage: `url('https://impresario-cdn-public.s3.ap-south-1.amazonaws.com/cause-i/09abc7b2ac8ff279b689715432193e9d.png')`,
                                    }}
                                >
                                    {cause.name}
                                </div>
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
                            rightSection={<ImArrowRight2 />}
                            className="text-gray"
                            onClick={handleProceedClick}
                        >
                            <div className="flex px-20">{t('proceed')}</div>
                        </Button>
                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}

export function ErrorBoundary() {
    return <AppError />;
}
