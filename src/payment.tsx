import React, { useEffect } from 'react';
import {useAtom} from "jotai";
import {accessTokenAtom, initatePaymentAtom} from "@/data/store.ts";

import CryptoJS from 'crypto-js';
import {useProfileControllerGetUserProfile} from "@/api/auth.ts";
import {Button} from "@mantine/core";
import {ImArrowRight2} from "react-icons/im";
const merchantKey = import.meta.env.VITE_PAYU_MERCHANT_KEY;
const salt = import.meta.env.VITE_PAYU_SALT;
const ENV = import.meta.env.VITE_PAYU_ENV;


function generateHash(txnid, amount, productinfo, firstname, email) {
    const concatenatedData = `${merchantKey}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
    const hash = CryptoJS.SHA512(concatenatedData).toString(CryptoJS.enc.Hex);
    return hash;
}

const loadPayUScript = (): Promise<void> => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        if (ENV === 'TEST') {
            script.src = 'https://test.payu.in/_payment';
        }else if(ENV === 'PROD'){
            script.src = 'https://secure.payu.in/_payment';
        }// Change to PayU’s environment
        script.async = true;
        script.onload = () => resolve();
        document.body.appendChild(script);
    });
};


const PayUCheckout: React.FC = () => {
    const [accessToken] = useAtom(accessTokenAtom);
    const { data: profileInfo } = useProfileControllerGetUserProfile({
        query: {
            enabled: !!accessToken,
        },
    })
    const surl = `https://uat.backend.cause-i.ai/v1/payments`;
    const furl = `https://uat.backend.cause-i.ai/v1/payments`;
    const [initatePayment] =useAtom(initatePaymentAtom);
    const amount = initatePayment?.amount;
    const productinfo = initatePayment?.productinfo;
    const firstname = initatePayment?.firstname;
    const email = profileInfo?.email;
    const phone = initatePayment?.phone;


    useEffect(() => {
        loadPayUScript();
        console.log(initatePayment)
    }, []);


    // Function to generate unique transaction ID with prefix IM_
    const generateTransactionID = (): string => {
        const timestamp = Date.now(); // Get current timestamp
        return `IM_${timestamp}`;
    };

    const txnid = generateTransactionID(); // Generate transaction ID

    const startPayment = async () => {
        // Call your backend API to generate the hash

        const hash = generateHash(txnid, amount, productinfo, firstname, email);
        // Prepare PayU form data
        const payUForm = document.createElement('form');
        // PayU URL
        if (ENV === 'TEST') {
            payUForm.action = 'https://test.payu.in/_payment';
        } else if (ENV === 'PROD') {
            payUForm.action = 'https://secure.payu.in/_payment';
        }
        payUForm.method = 'POST';

        // Add form inputs
        payUForm.innerHTML = `
      <input type="hidden" name="key" value="${merchantKey}" />
      <input type="hidden" name="txnid" value="${txnid}" />
      <input type="hidden" name="amount" value="${amount}" />
      <input type="hidden" name="productinfo" value="${productinfo}" />
      <input type="hidden" name="firstname" value="${firstname}" />
      <input type="hidden" name="email" value="${email}" />
      <input type="hidden" name="phone" value="${phone}" />
      <input type="hidden" name="hash" value="${hash}" />
      <input type="hidden" name="surl" value="${surl}" />
      <input type="hidden" name="furl" value="${furl}" />
    `;

        document.body.appendChild(payUForm);
        payUForm.submit();
    };

    return (
        <Button
            type="submit"
            variant="white"
            size="lg"
            radius="xl"
            color="#101010"
            rightSection={<ImArrowRight2 />}
            className="text-gray"
            onClick={startPayment}
        >
            Pay to Unlock
        </Button>
    );
};

export default PayUCheckout;
