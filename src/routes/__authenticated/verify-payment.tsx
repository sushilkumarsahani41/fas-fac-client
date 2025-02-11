import CommonLayout from "@/layouts/common-layout.tsx";
import Navbar from "@/components/shared/navbar.tsx";
import { VerifyPayment } from "@/payment.tsx";

export function Component() {
    return (
        <CommonLayout>
            <div className="m-auto max-w-full lg:max-w-7xl px-4 sm:px-6 lg:px-8">
                <Navbar />
                <div className="flex flex-col items-start gap-6 p-4">
          <span className="text-2xl md:text-4xl font-bold text-center md:text-left leading-snug">
            &#129402; Your cause gained from you. You showed up. YOU matter.
          </span>
                    <div className="border-t border-gray-400 w-full mt-4"></div>
                    <div className="flex flex-wrap justify-center items-center w-full gap-8 mb-8">
                        <div className="flex flex-col justify-center items-center h-full w-full lg:w-auto">
                            <VerifyPayment />
                        </div>
                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}
