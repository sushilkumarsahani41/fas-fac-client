import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AppError from '@/components/shared/app-error';
import Routes from '@/data/routes';
import CommonLayout from '@/layouts/common-layout';
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { ImArrowRight2 } from 'react-icons/im';
import { useAtom } from 'jotai/index';
import { accessTokenAtom, selectedCauseAtom, userPrefIdAtom } from '@/data/store.ts';
import {
    useFasfacCauseControllerFindAll,
    useFasfacUserPrefsControllerCreate,
} from '@/api/survey.ts';
import { useProfileControllerGetUserProfile } from '@/api/auth.ts';
import Flipcard from "@/components/shared/flipcard.tsx";

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
                setUserPrefId(data.id);
            },
        },
    });
    const { data: FasFacAllCauses, isLoading, isError } = useFasfacCauseControllerFindAll({
        query: {
            enabled: !!accessToken,
        },
    });
    const { data: profileInfo } = useProfileControllerGetUserProfile({
        query: {
            enabled: !!accessToken,
        },
    });

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
                userId: profileInfo?.id,
                causeId: selectedCause.id,
            };
            console.log('updateValues:', updateValues);
            mutate({ data: updateValues });

            navigate(Routes.PLEDGE); // Navigate only if a cause is selected
        } else {
            alert('Please Select a Cause'); // Show an alert if no cause is selected
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
                <span className="text-5xl font-medium">
                    Choose a Cause You Want to Support
                </span>
                    </h1>
                    <p className="font-normal text-2xl">
                        Before we dive in, here’s the deal: Every survey filled supports a meaningful cause. It’s a win-win—you get to share your perspective, and a cause gets some love, just because you care, you good samaritan!
                    </p>
                    <div className="flex flex-col items-center min-h-[50vh] gap-4 p-4 bg-gray-100">
                        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
                            {FasFacAllCauses?.map((cause, index) => (
                                <Flipcard
                                    key={cause.id}
                                    frontImage={cause.imageUrl}
                                    frontTitle={<div>{cause.name}</div>}
                                    backDescription={<div>{cause.shortDes || 'More Info'}</div>}
                                    backColor={cause.colour}
                                    isSelected={selectedBox === index}  // Highlight if selected
                                    onClick={() => handleBoxClick(index)}  // Handle click
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mt-5 w-full sm:relative sm:mt-5">
                        <Button
                            type="submit"
                            variant="white"
                            size="lg"
                            radius="xl"
                            color="#101010"
                            rightSection={<ImArrowRight2 />}
                            className="text-gray max-w-full sm:w-auto fixed bottom-4 left-4 right-4 sm:relative sm:bottom-auto sm:left-auto sm:right-auto"
                            onClick={handleProceedClick}
                        >
                            <div className="flex px-10">{t('proceed')}</div>
                        </Button>
                    </div>
                </div>
            </div>
        </CommonLayout>

    );
}

export function ErrorBoundary() {
    return <AppError/>;
}
