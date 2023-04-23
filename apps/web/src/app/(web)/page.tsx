import Slider from "@/components/Slider/Slider";
import CardsRow from "@/components/PageItems/CardsRow";
import WideCardsRow from "@/components/PageItems/WideCardsRow";
import ImageOnlyCardsRow from "@/components/PageItems/ImageOnlyCardsRow";
import TextOnlyCardsRow from "@/components/PageItems/TextOnlyCardsRow";

export default function Home() {
	return (
		<main className="">
			<Slider />
			<CardsRow />
			<WideCardsRow greyBg />
			<ImageOnlyCardsRow />
			<TextOnlyCardsRow greyBg />
		</main>
	);
}
