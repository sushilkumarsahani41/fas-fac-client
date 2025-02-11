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
    const [selectedCause] = useAtom(selectedCauseAtom);
    const [pledgeAmount, setPledgeAmount] = useAtom(pledgeAmountAtom);

    return (
        <div className="flex flex-col lg:flex-row h-screen">
            {/* First Section - Sidebar */}
            <div className="flex flex-col basis-full lg:basis-[30%] bg-[#373737] px-6 py-8 lg:py-20">
                <div className="flex flex-col gap-6 pl-2 lg:pl-4">
                    <h1 className="text-lg lg:text-4xl font-semibold text-white">{t('cause-selected')}</h1>

                    {/* Image Container */}
                    <div
                        className="aspect-video w-full rounded bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${selectedCause?.imageUrl || 'https://impresario-cdn-public.s3.ap-south-1.amazonaws.com/cause-i/09abc7b2ac8ff279b689715432193e9d.png'})`,
                        }}
                    ></div>

                    {/* Cause Title and Description */}
                    <h1 className="text-lg lg:text-4xl font-bold text-white">{selectedCause?.name || t('default-cause-name')}</h1>
                    <p className="text-sm lg:text-base text-white">{selectedCause?.description || t('default-cause-description')}</p>

                    <div className="flex items-center">
                        <Button
                            type="submit"
                            variant="white"
                            size="md"
                            radius="xl"
                            className="text-gray"
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

            {/* Second Section - Main Content */}
            <div className="flex flex-col basis-full lg:basis-[70%] bg-black px-6 lg:px-8 py-10 lg:py-20">
                {/* Title Section */}
                <h1 className="text-3xl lg:text-6xl font-semibold text-white">
                    {t('Are you willing to not just')} <span className="text-pink">BE a superhero</span> {t('but')} <span className="text-orange">DO BETTER</span>?
                </h1>
                <h3 className="text-xl lg:text-4xl font-semibold text-white mt-4">
                    {t('Convert your intent into a pledge by funding this cause that matters the world to you.')}
                </h3>

                {/* Description Section */}
                <h2 className="text-lg lg:text-2xl font-normal mt-6">{t('pledge-des')}</h2>
                <div className="flex flex-col lg:flex-row items-center justify-center mt-10 gap-6">
                    <Box maw={400} className="w-full">
                        <label className="block text-white mb-2">{t('Select amount between 100 to 10000')}</label>
                        <Slider
                            value={pledgeAmount}
                            size="lg"
                            radius="xl"
                            onChange={setPledgeAmount}
                            min={100}
                            max={10000}
                            step={50}
                            defaultValue={100}
                            classNames={{ track: 'bg-gray-600', thumb: 'bg-[#7F56D9]' }}
                        />
                    </Box>
                    <p className="text-white mx-4 hidden lg:block">{t('or')}</p>
                    <Box maw={400} className="w-full">
                        <label className="block text-white mb-2">{t('Enter Amount')}</label>
                        <TextInput
                            placeholder={t('enter-amount')}
                            type="number"
                            value={pledgeAmount}
                            onChange={(e) => setPledgeAmount(Number(e.target.value))}
                            classNames={{ input: 'rounded-xl' }}
                            leftSection="₹"
                        />
                    </Box>
                </div>

                {/* Navigation Button */}
                <div className="flex justify-start mt-16">
                    <Button
                        type="submit"
                        variant="white"
                        size="md"
                        radius="xl"
                        className="text-gray"
                        rightSection={<IoArrowForwardOutline />}
                        onClick={() => {
                            navigate(Routes.SURVEY_START);
                        }}
                    >
                        <div className="px-10">{t('almost_there_nextButtonText')}</div>
                    </Button>
                </div>

                <br />
                <span className="text-sm text-gray-300">
          {t('Disclaimer: Your contribution makes a real impact! 100% of what you pledge will directly fund the cause you care about.')}
        </span>
            </div>
        </div>
    );
}

export function ErrorBoundary() {
    return <AppError />;
}
