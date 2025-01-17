import React from 'react';
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSidebar from '@/components/RightSidebar';
import {getLoggedInUser} from "@/lib/actions/user.actions";

const Home = async () => {
	const loggedIn = await getLoggedInUser();
	return (
		<section className="home">
			<div className="home-content">
				<header className="home-header">
					<HeaderBox
						type="greeting"
						title="Welcome"
						user={loggedIn?.name || "Guest"}
						subtext="Access and Manage your Account and Transactions Efficiently"
					/>
					<TotalBalanceBox
						accounts={[]}
						totalBanks={1}
						totalCurrentBalance={1250.25}
					/>
				</header>
				RECENT TRANSACTIONS
			</div>
			<RightSidebar user={loggedIn} transaction={[]} banks={[{currentBalance: 123.50}, {currentBalance: 20.54}]}/>
		</section>
	);
};

export default Home;