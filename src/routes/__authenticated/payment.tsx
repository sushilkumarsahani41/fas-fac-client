import { PayUCheckout } from "@/payment.tsx";
import AppError from "@/components/shared/app-error.tsx";
import CommonLayout from "@/layouts/common-layout.tsx";
import Navbar from "@/components/shared/navbar.tsx";
import { useAtom } from "jotai";
import { initatePaymentAtom, selectedCauseAtom } from "@/data/store.ts";

export function Component() {
  const [initatePayment] = useAtom(initatePaymentAtom);
  const [selectedCause] = useAtom(selectedCauseAtom);

  return (
      <CommonLayout gradientVariant="primary-alt">
        <div className="px-4 m-auto max-w-7xl">
          <Navbar />
          <div className="flex h-full flex-col items-start gap-6 p-4">
          <span className="text-4xl font-bold text-center md:text-left">
            Are you ready to ascend your greatness?
          </span>
            <div className="border-t border-gray-400 flex flex-wrap w-full gap-8 mb-8">
              <div className="flex flex-col w-full md:w-1/2 gap-6 mt-4">
                <div className="flex flex-col">
                  <label className="text-lg">Name</label>
                  <span className="text-2xl font-semibold">{initatePayment.firstname}</span>
                </div>
                <div className="flex flex-col">
                  <label className="text-lg">Cause Selected</label>
                  <span className="text-2xl font-semibold">{selectedCause.name}</span>
                </div>
              </div>
              <div className="flex flex-col w-full md:w-1/2 gap-6 mt-4">
                <div className="flex flex-col">
                  <label className="text-lg">Mobile No.</label>
                  <span className="text-2xl font-semibold">{initatePayment.phone}</span>
                </div>
                <div className="flex flex-col">
                  <label className="text-lg">Amount Pledge</label>
                  <span className="text-2xl font-semibold">{initatePayment.amount}</span>
                </div>
              </div>
            </div>
            <div className="w-full">
              <PayUCheckout />
            </div>
          </div>
        </div>
      </CommonLayout>
  );
}

export function ErrorBoundary() {
  return <AppError />;
}
