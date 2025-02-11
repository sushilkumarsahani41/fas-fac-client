import { useSurveyControllerMarkAsComplete } from '@/api/survey';
import Footer from '@/components/footer';
import AppError from '@/components/shared/app-error';
import Navbar from '@/components/shared/navbar';
import SectionComplete from '@/components/survey/section-complete';
import Routes from '@/data/routes';
import CommonLayout from '@/layouts/common-layout';
import { Case, Switch } from 'react-if';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {Modal, Button, Box} from '@mantine/core';
import { useState } from 'react';
import Options from "@/components/survey/options.tsx";


export function Component() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { mutate } = useSurveyControllerMarkAsComplete({});
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState<number>(0); // Selected option for the rating

  const choices = [
    { id: 1, description: 'Not at all' },
    { id: 2, description: 'Somewhat' },
    { id: 3, description: 'Neutral' },
    { id: 4, description: 'To a large extent' },
    { id: 5, description: 'Fully' },
  ];

  const markSurveyAsComplete = () => {
    mutate({ id: parseInt(searchParams.get('id') as string) });
    navigate(Routes.ONBOARDING);
  };

  const handleRatingSubmit = () => {
    console.log('Selected option:', selected); // Log the selected option
    setOpened(false);
    markSurveyAsComplete(); // Mark the survey as complete after submitting the rating
  };

  return (
      <CommonLayout noiseEnabled gradientVariant="multicolor">
        <div className="m-auto max-w-7xl p-4">
          <Navbar />
          <div className="pt-16 lg:py-20">
            <Switch>
              <Case condition={parseInt(searchParams.get('view') as string) >= 44}>
                <SectionComplete
                    title={t('completed_scale_title')}
                    header={t('completed_scale_header')}
                    onClick={() => setOpened(true)} // Open the rating popup
                    nextButtonText={t('completed_scale_nextButtonText')}
                >
                  <p className="font-semibold" style={{ whiteSpace: 'pre-line' }}>
                    {t('completed_scale_message')}
                  </p>
                </SectionComplete>
              </Case>
              <Case condition={parseInt(searchParams.get('view') as string) >= 39}>
                <SectionComplete
                    title={t('almost_there_title')}
                    header={t('almost_there_header')}
                    onClick={() => navigate(Routes.SURVEY)}
                    nextButtonText={t('almost_there_nextButtonText')}
                >
                  <p style={{ whiteSpace: 'pre-line' }}>{t('almost_there_message')}</p>
                </SectionComplete>
              </Case>
              <Case condition={parseInt(searchParams.get('view') as string) >= 29}>
                <SectionComplete
                    title={t('great_going_title')}
                    header={t('great_going_header')}
                    onClick={() => navigate(Routes.SURVEY)}
                    nextButtonText={t('great_going_nextButtonText')}
                >
                  <p style={{ whiteSpace: 'pre-line' }}>{t('great_going_message')}</p>
                </SectionComplete>
              </Case>
            </Switch>
          </div>
        </div>
        <Footer />

        {/* Rating Popup Modal */}
        <Modal
            radius='lg'
            opened={opened}
            withCloseButton={false} // Disable close button
            closeOnClickOutside={false} // Prevent closing on outside click
            closeOnEscape={false} // Prevent closing on escape key
            centered
            overlayProps={{ opacity: 0.7, blur: 5 }}
            styles={{
              inner: { display: 'flex', justifyContent: 'center', alignItems: 'center' }, // Center content
              body: { textAlign: 'center' }, // Center text inside
            }}

        >
          <Box>
            <h1 className="text-2xl font-bold text-white mb-4">
              {t('How relevant did you find the survey for civic empathy?')}
            </h1>
            <div className=" w-full items-center px-20"><Options choices={choices} selected={selected} setSelected={setSelected} isSecondary={false}/></div>
            <Button
                size="md"
                type="submit"
                radius="xl"
                onClick={handleRatingSubmit}
                disabled={selected === 0}
                className="mt-4 bg-pink-600 text-white"
            >
              {t('Continue')}
            </Button>
          </Box>
        </Modal>
      </CommonLayout>
  );
}

export function ErrorBoundary() {
  return <AppError />;
}
