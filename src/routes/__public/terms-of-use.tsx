import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/shared/navbar.tsx';
import Footer from '@/components/footer.tsx';
import CommonLayout from '@/layouts/common-layout.tsx';
import AppError from '@/components/shared/app-error.tsx';

export function Component() {
    const navigate = useNavigate();

    return (
        <CommonLayout gradientVariant="dual">
            <div className="m-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Navbar />
                <div className="py-12">
                    <h1 className="text-4xl font-bold text-center">Terms of Use</h1>
                    <div className="mt-8 space-y-6 text-lg text-gray-700">
                        <section>
                            <h2 className="text-2xl font-semibold">TERMS OF USE - IMGlobal Media Private Limited</h2>
                            <p>
                                HELLO and WELCOME to our website. These Terms of Use have been posted to be in compliance with numerous laws that regulate the operation of an Internet website. The Terms of Use cover a variety of important issues, including the protection of copyrighted material and other intellectual property, and the presentation, collection and use of information.
                            </p>
                            <p>
                                These Terms of Use apply to your use of this website and to: (a) all websites owned and/or provided by IMGlobal Media Private Limited (“I.M”) including all services offered through this website and/or any other I.M website; (b) all software offerings and applications owned and/or provided by I.M and/or available on or through this website or any other I.M website; and (c) all web pages, data, text, images, photographs, illustrations, graphics, audio, video, and documents including articles, marketing materials, press releases and other information and content available on or through this website or any I.M website.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold">DEFINITIONS</h2>
                            <p>
                                Agreement: Please read the Terms of Use thoroughly before using this website or any other websites or Apps owned and operated by IMGlobal Media Private Limited (“I.M”). These Terms of Use showcase a contract between you and I.M, and the use of this Website constitutes a User’s agreement to be bound by all terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold">UPDATES AND CHANGES</h2>
                            <p>
                                I.M reserves the right to modify its Privacy Policy as well as these Terms of Use at any time. Such changes are inclusive of retroactive changes, and these are effective once posted on this or a similar page of the I.M Website.
                            </p>
                            <p>Last Update: 28.01.2025</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold">ACCESS</h2>
                            <p>
                                Users must agree that they will not attempt to access any secure or restricted portion of this Website to which they have not been granted access specifically.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold">PROHIBITED ACTIVITIES</h2>
                            <p>
                                Users must not engage in spamming, hacking, unauthorized data access, or any activity that disrupts website functionality.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold">SUBMISSION OF USER CONTENT</h2>
                            <p>
                                Any content submitted by users grants I.M a worldwide, nonexclusive, perpetual license to use, modify, and distribute such content.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold">COPYRIGHTS AND TRADEMARKS</h2>
                            <p>
                                All trademarks and content on this website are owned by I.M. Unauthorized reproduction is prohibited.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold">INDEMNIFICATION</h2>
                            <p>
                                Users agree to indemnify and hold I.M harmless from claims arising due to their use of this website.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold">DISPUTE RESOLUTION</h2>
                            <p>
                                Legal disputes shall be handled under the jurisdiction of Lucknow, Uttar Pradesh, India.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold">CONTACT INFORMATION</h2>
                            <p>
                                For concerns regarding these Terms of Use, contact us at: <a href="mailto:contact@impresario-global.com" className="text-blue-600">contact@impresario-global.com</a>
                            </p>
                        </section>
                    </div>
                </div>
                <Footer />
            </div>
        </CommonLayout>
    );
}

export function ErrorBoundary() {
    return <AppError />;
}

