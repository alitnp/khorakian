import Card from "@/components/global/Card/Card";
import CardsRow from "@/components/global/PageItems/CardsRow";
import PageItemTitle from "@/components/global/PageItems/PageItemTitle";
import SliderHistory from "@/components/global/Slider/SliderHistory";
import SliderSlide from "@/components/global/Slider/SliderSlide";
import Slider from "@/components/global/Slider/Slider";
import WideCardsRow from "@/components/global/PageItems/WideCardsRow";
import WideCard from "@/components/global/Card/WideCard";
import ImageOnlyCardsRow from "@/components/global/PageItems/ImageOnlyCardsRow";
import ImageOnlyCard from "@/components/global/Card/ImageOnlyCard";
import TextOnlyCardsRow from "@/components/global/PageItems/TextOnlyCardsRow";
import TextOnlyCard from "@/components/global/Card/TextOnlyCard";
import TimeLine from "@/components/global/TimeLine/TimeLine";

export default function Home() {
	return (
		<main>
			<Slider
				history={<SliderHistory />}
				items={[1, 2, 3].map(() => (
					<SliderSlide />
				))}
			/>
			<CardsRow
				title={
					<PageItemTitle
						title="تازه ها"
						desc="آخرین محتوای اضافه شده به سامانه"
						moreText="۱۴ مورد دیگر"
						moreUrl="/"
					/>
				}
				items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
					(_item, index) => (
						<Card key={index} />
					)
				)}
			/>
			<WideCardsRow
				title={
					<PageItemTitle
						title="تازه ها"
						desc="آخرین محتوای اضافه شده به سامانه"
						moreText="۱۴ مورد دیگر"
						moreUrl="/"
					/>
				}
				items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
					(_item, index) => (
						<WideCard key={index} />
					)
				)}
			/>
			<ImageOnlyCardsRow
				title={
					<PageItemTitle
						title="تازه ها"
						desc="آخرین محتوای اضافه شده به سامانه"
						moreText="۱۴ مورد دیگر"
						moreUrl="/"
					/>
				}
				items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
					(_item, index) => (
						<ImageOnlyCard key={index} />
					)
				)}
			/>
			<TextOnlyCardsRow
				title={
					<PageItemTitle
						title="تازه ها"
						desc="آخرین محتوای اضافه شده به سامانه"
						moreText="۱۴ مورد دیگر"
						moreUrl="/"
					/>
				}
				items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
					(_item, index) => (
						<TextOnlyCard key={index} />
					)
				)}
			/>
			<TimeLine />
		</main>
	);
}
