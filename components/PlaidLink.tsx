import React, {useCallback, useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import {PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink} from "react-plaid-link";
import {StyledString} from "next/dist/build/swc/types";
import {useRouter} from "next/navigation";
import {createLinkToken, exchangePublicToken} from "@/lib/actions/user.actions";

const PlaidLink = ({user, variant}: PlaidLinkProps) => {
	const [token, setToken] = useState('');
	const router = useRouter();

	const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
		await exchangePublicToken({
			publicToken: public_token,
			user,
		});
		router.push("/");
	}, [user]);

	useEffect(() => {
		const getLinkToken = async () => {
			const data = await createLinkToken(user);
			setToken(data?.linkToken);
		}

		getLinkToken();
	}, [user]);

	const config: PlaidLinkOptions = {
		token,
		onSuccess
	};

	const {open, ready} = usePlaidLink(config);

	return (
		<>
			{variant === "primary" ? (
				<Button
					className="plaidlink-primary"
					onClick={() => open()}
					disabled={!ready}
				>
					Connect Bank
				</Button>
			) : variant === "ghost" ? (
				<Button>
					Connect Bank
				</Button>
			) : (
				<Button>
					Connect Bank
				</Button>
			)}
		</>
	);
};

export default PlaidLink;