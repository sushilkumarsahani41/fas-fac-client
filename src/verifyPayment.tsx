import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePaymentControllerGetPaymentByTxnId } from "@/api/survey.ts";
import { useAtom } from "jotai";
import { accessTokenAtom } from "@/data/store.ts";
import { Button } from "@mantine/core";
import Routes from "@/data/routes.ts";
import {ImArrowRight2} from "react-icons/im";

const VerifyPayment: React.FC = () => {
    const [txnid, setTxnid] = useState<string | null>(null);
    const [accessToken] = useAtom(accessTokenAtom); // Access token from Jotai store
    const location = useLocation();
    const navigate = useNavigate();

    // Extract txnid from the query string
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const txnidFromUrl = searchParams.get("txnid");
        setTxnid(txnidFromUrl);
    }, [location]);

    // Use the hook only when txnid is available
    const { data: txnDetails, isLoading, isError, error } = usePaymentControllerGetPaymentByTxnId(txnid || "", {
    });

    if (!txnid) {
        return <div>Error: Transaction ID not found in the URL.</div>;
    }

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
