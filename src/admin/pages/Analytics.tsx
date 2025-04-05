import AIPoweredInsights from "../charts/AIPoweredInsights";
import ChannelPerformance from "../charts/ChannelPerformance";
import CustomerSegmentation from "../charts/CustomerSegmentation";
import OverviewCards from "../charts/OverviewCards";
import ProductPerformance from "../charts/ProductPerformance";
import RevenueChart from "../charts/RevenueCharts";
import UserRetention from "../charts/UserRetension";
import Header from "../components/Header";

const AnalyticsPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title={"Analytics Dashboard"} />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<OverviewCards />
				<RevenueChart />

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
					<ChannelPerformance />
					<ProductPerformance />
					<UserRetention />
					<CustomerSegmentation />
				</div>

				<AIPoweredInsights />
			</main>
		</div>
	);
};
export default AnalyticsPage;