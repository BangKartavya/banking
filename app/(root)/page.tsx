import React from 'react';
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSidebar from '@/components/RightSidebar';
import {getLoggedInUser} from "@/lib/actions/user.actions";
import {getAccount, getAccounts} from "@/lib/actions/bank.actions";
import RecentTransactions from "@/components/RecentTransactions";

const Home = async ({searchParams}: SearchParamProps) => {
	const {id, page} = await searchParams;

	const currentPage = Number(page as string) || 1;

	const loggedIn = await getLoggedInUser();
	const accounts = await getAccounts({userId: loggedIn.$id});

	if (!accounts) return;
	const accountsData = accounts?.data;


	const appwriteItemId = (id as string) || accountsData[0].appwriteItemId;

	const account = await getAccount({appwriteItemId});

	return (
		<section className="home">
			<div className="home-content">
				<header className="home-header">
					<HeaderBox
						type="greeting"
						title="Welcome"
						user={`${loggedIn?.firstName} ${loggedIn?.lastName}` || "Guest"}
						subtext="Access and Manage your Account and Transactions Efficiently"
					/>
					<TotalBalanceBox
						accounts={accountsData}
						totalBanks={accounts?.totalBanks}
						totalCurrentBalance={accounts?.totalCurrentBalance}
					/>
				</header>
				<RecentTransactions
					accounts={accountsData}
					transactions={account?.transactions}
					appwriteItemId={appwriteItemId}
					page={currentPage}
				/>
			</div>
			<RightSidebar
				user={loggedIn}
				transactions={account?.transactions}
				banks={accountsData?.slice(0, 2)}/>
		</section>
	);
};

export default Home;