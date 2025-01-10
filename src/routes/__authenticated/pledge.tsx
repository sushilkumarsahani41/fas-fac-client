import { useTranslation } from 'react-i18next';
import AppError from '@/components/shared/app-error';
import Routes from '@/data/routes';
import { Button, Slider, Box, TextInput } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import i18n from '@/i18n';
import { useAtom } from 'jotai';
import { selectedCauseAtom, pledgeAmountAtom } from '@/data/store.ts';
import { IoArrowBack, IoArrowForwardOutline } from 'react-icons/io5';

export function Component() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [selectedCause] = useAtom(selectedCauseAtom); // Retrieve selected cause
    const [pledgeAmount, setPledgeAmount] = useAtom(pledgeAmountAtom); // Manage pledge amount globally


    return (
        <div className="flex h-screen">
            {/* First Section - 30% Width */}
            <div className="flex basis-[30%] bg-[#373737] px-6 py-20">
                <div className="flex flex-col gap-6 pl-4">
                    <h1 className="text-xl font-semibold text-white">{t('cause-selected')}</h1>

                    {/* Image Container */}
                    <div
                        className="aspect-video w-full rounded bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${selectedCause?.imageUrl || 'https://impresario-cdn-public.s3.ap-south-1.amazonaws.com/cause-i/09abc7b2ac8ff279b689715432193e9d.png'})`,
                        }}
                    ></div>

                    {/* Cause Title */}
                    <h1 className="text-xl font-bold text-white">
                        {selectedCause?.name || t('default-cause-name')}
                    </h1>
                    <p className="text-sm">
                        {selectedCause?.description || t('default-cause-description')}
                    </p>
                    <div className="flex items-center">
                        <Button
                            type="submit"
                            variant="white"
                            size="md"
                            radius="xl"
                            color="#101010"
                            className=" text-gray"
                            leftSection={<IoArrowBack />}
                            onClick={() => {
                                navigate(Routes.CAUSE);
                            }}
                        >
                            {t('edit')}
                        </Button>
                    </div>
                </div>
            </div>
            {/* Second Section - 70% Width */}
            <div className="flex basis-[70%] flex-col bg-black px-8 py-20">
                {/* Title Section */}
                <h1 className="text-4xl font-semibold text-white">{t('pledge-title1')}</h1>
                <h1 className="text-4xl font-semibold text-white">{t('pledge-title2')}</h1>
                <br />

                {/* Description Section */}
                <h2 className="text-xl font-normal pb-2">{t('pledge-des')}</h2>
                <div className="flex flex-row justify-center pt-10">
                    <div className="w-full">
                        <Box maw={400}>
                            <label className="block text-white pb-2">{t('Select amount between 50 to 10000')}</label>
                            <Slider
                                value={pledgeAmount}
                                size={'15'}
                                radius={'xl'}
                                onChange={setPledgeAmount}
                                min={50}
                                max={10000}
                                step={50}
                                defaultValue={50}
                                color={'#7F56D9'}
                            ></Slider>
                        </Box>
                    </div>
                    <p className="text-white mx-4"> {t('or')} </p>
                    <div className="w-full px-20">
                        <label className="block text-white pb-2">{t('Enter Amount')}</label>
                        <TextInput
                            placeholder={t('enter-amount')}
                            type="number"
                            value={pledgeAmount}
                            onChange={(e) => setPledgeAmount(Number(e.target.value))}
                            classNames={{
                                input: 'rounded-xl',
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-end px-20 pt-24">
                    <Button
                        type="submit"
                        variant="white"
                        size="md"
                        radius="xl"
                        color="#101010"
                        className=" text-gray"
                        rightSection={<IoArrowForwardOutline />}
                        onClick={() => {
                            navigate(Routes.SURVEY_START); // Navigate to the payment page
                        }}
                    >
                        <div className="space-x-20 px-20">
                            {t('almost_there_nextButtonText')}
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export function ErrorBoundary() {
    return <AppError />;
}
