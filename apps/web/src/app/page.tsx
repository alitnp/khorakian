import TextOnlyCard from "@/components/Card/TextOnlyCard";
import PageItemTitle from "@/components/PageItems/PageItemTitle";
import TextOnlyCardsRow from "@/components/PageItems/TextOnlyCardsRow";
import TimeLine from "@/components/TimeLine/TimeLine";

export default function Home() {
	return (
		<main className="">
			<TimeLine />
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
			{/* <Slider
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
			/> */}
		</main>
	);
}
