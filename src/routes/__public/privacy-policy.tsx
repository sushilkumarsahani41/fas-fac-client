import { useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import Navbar from '@/components/shared/navbar.tsx';
import Footer from '@/components/footer.tsx';
import AppError from '@/components/shared/app-error.tsx';
import CommonLayout from '@/layouts/common-layout.tsx';

export function Component() {
    const navigate = useNavigate();

    return (
        <CommonLayout gradientVariant="dual">
            <div className="m-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Navbar />
                <div className="py-12">
                    <h1 className="text-4xl font-bold text-center">Privacy Policy</h1>
                    <div className="mt-8 space-y-6 text-lg text-gray-700">
                        <section>
                            <h2 className="text-2xl font-semibold">INTRODUCTION</h2>
                            <p>
                                I.MGlobal Media Private Limited ( “I.M”,  "we," "us," or "our") respects and is committed to protecting your privacy. This comprehensive Privacy Policy outlines how we collect, use, disclose, and protect information across our various platforms and products, including but not limited to deed-O (our publishing platform application), DoBe (our digital platform for sustainable living), and cause-i (our social impact measurement platform).
                            </p>
                            <p>
                                This Privacy Policy applies to all services, websites, mobile applications, and platforms operated by I.M Media Private Limited and its licensed affiliates. By accessing or using any of our services, you consent to the practices described in this Privacy Policy.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold">SCOPE AND APPLICATION</h2>
                            <p>
                                This Privacy Policy is an electronic record under the Information Technology Act, 2000, and the rules made thereunder. It complies with the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data of Information) Rules, 2011, and the Digital Personal Data Protection Act, 2023. This policy applies to all users, visitors, and customers of our platforms and services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold">INFORMATION WE COLLECT</h2>
                            <p>
                                By signing up with us, the user voluntarily gives us the right to access certain information from the user. Information like personal data that can be reasonably be used directly or indirectly which identifies the user’s presence on our various platforms, such information shall include, but not limited to the user’s name, postal address, email address, telephone number, other similar identifying details which connects the user to the platform and provides them with the services.
                            </p>
                            <p>
                                Apart from the personal information, the user also exposes itself to providing non-personal data that may or may not reveal their identity. Some examples of such information shall be demographic information, statistical data from personal data, or aggregated calculations to analyse the percentage of users accessing a specific domain or website feature.
                            </p>
                            <p>
                                Some other technical information such as unique identifiers, device IDs, and other identifiers. This may include Internet Protocols (IP) addresses connecting a user’s bluetooth signals, and information about nearby Wi-Fi access points, browser types, operating systems and other platforms used by the user.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold">METHODS OF DATA COLLECTION</h2>
                            <p>
                                We collect information about the user through various methods and channels.
                            </p>
                            <ul className="list-disc pl-6">
                                <li>Direct User Submissions</li>
                                <li>Automated Data Collection Technologies</li>
                                <li>User Contributions</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold">USAGE OF DATA</h2>
                            <p>
                                We use the information we collect to provide, maintain, protect, and improve our services while respecting your privacy rights and choices.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold">DISCLOSURE OF DATA</h2>
                            <p>
                                We share your information with care and purpose, ensuring alignment with our mission of amplifying social impact while protecting your privacy.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold">DATA SECURITY AND GOVERNANCE</h2>
                            <p>
                                At I.M, data security and governance are paramount to our operations. We are committed to ensuring the confidentiality, integrity, and availability of the data entrusted to us by our clients and users.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold">CHANGES TO PRIVACY POLICY</h2>
                            <p>
                                We may change this Privacy Policy from time to time, and if we do we’ll post any changes on this page. If you continue to use Platform after those changes are in effect, you agree to the revised Privacy Policy.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold">CONTACT</h2>
                            <p>
                                For questions or concerns about this Privacy Policy:
                            </p>
                            <p>Email: contact@impresario-global.com</p>
                            <p>Postal Address: A-26/2, Indira Nagar, Lucknow, Uttar Pradesh - 226016</p>
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