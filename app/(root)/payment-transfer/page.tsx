import React from 'react';
import HeaderBox from "@/components/HeaderBox";
import PaymentTransferForm from "@/components/PaymentTransferForm";
import {getLoggedInUser} from "@/lib/actions/user.actions";
import {getAccounts} from "@/lib/actions/bank.actions";

const PaymentTransfer = async () => {

	const loggedIn = await getLoggedInUser();
	const accounts = await getAccounts({userId: loggedIn.$id});

	if (!accounts) return;
	const accountsData = accounts?.data;

	return (
		<section className="payment-transfer">
			<HeaderBox
				title="Payment Transfer"
				subtext="Please Provide any Specific Details or Notes Related to the Payment Transfer"
			/>
			<section className="size-full pt-5">
				<PaymentTransferForm
					accounts={accountsData}
				/>
			</section>
		</section>
	);
};

export default PaymentTransfer;