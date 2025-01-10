import React from "react";
import { useNavigate } from "react-router-dom";
import { usePaymentControllerGetPaymentByTxnId } from "@/api/survey.ts";
import { useAtom } from "jotai";
import {txnidAtom} from "@/data/store.ts";
import { Button } from "@mantine/core";
import Routes from "@/data/routes.ts";
import {ImArrowRight2} from "react-icons/im";

const VerifyPayment: React.FC = () => {
    const [txnid] = useAtom(txnidAtom)
    const navigate = useNavigate();

    const { data: txnDetails, isLoading, isError, error } = usePaymentControllerGetPaymentByTxnId(txnid, {});

    if (isLoading) {
        return <div>Loading payment details...</div>;
    }

    if (isError) {
        return <div>Error: {error?.message || "Failed to fetch payment details."}</div>;
    }

    return (
        <div>
            <h1>Payment Verification</h1>
            <h2>Transaction ID: {txnid}</h2>
            <h3>Payment Details:</h3>
            <pre>{JSON.stringify(txnDetails, null, 2)}</pre>
            <Button
                type="submit"
                variant="white"
                size="lg"
                radius="xl"
                color="#101010"
                rightSection={<ImArrowRight2 />}
                className="text-gray"
                onClick={() => navigate(Routes.PROFILE)}
            >
                Your Profile
            </Button>
        </div>
    );
};

export default VerifyPayment;
