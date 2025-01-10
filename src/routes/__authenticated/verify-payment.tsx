import VerifyPayment from "@/verifyPayment.tsx";
import CommonLayout from "@/layouts/common-layout.tsx";
import Navbar from "@/components/shared/navbar.tsx";


export function Component() {

    return (
        <CommonLayout>
            <div className="m-auto max-w-7xl px-4">
                <Navbar />
                <div className="flex flex-col justify-center items-center h-full py-20">
                    <VerifyPayment/>
                </div>
            </div>
        </CommonLayout>
)
}