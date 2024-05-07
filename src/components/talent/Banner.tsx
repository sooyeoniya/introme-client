import NavigationLinksButton from "../buttons/NavigationLinksButton.tsx";
import reactIcon from "../../assets/react.svg";
import IconSlider from "./IconSlider.tsx";
export default function Banner() {
    return (
        <div className="bg-my-gray pt-28 px-9 pb-8">
            <div className="flex flex-col">
                <div className="flex justify-between">
                    <div className="flex pt-10 pr-4 w-36 justify-end">
                        <div className="flex h-20 w-20 p-2 rounded-xl bg-white">
                            <img src={reactIcon} alt={undefined} />
                        </div>
                    </div>
                    <div className="grow">
                        <div className="flex justify-between">
                            <div className="content-end text-xl font-GmarketSansBold">
                                기업 인재상
                            </div>
                            <NavigationLinksButton text="인재상 추가" />
                        </div>
                        <div className="h-20 text-6xl content-center font-GmarketSansBold">
                            비바리퍼블리카
                        </div>
                    </div>
                </div>
                <div className="pl-36">서울특별시 구로구 디지털로30길 28, 609호</div>
                <IconSlider />
                <div className="flex gap-3 pl-12">
                    <NavigationLinksButton text="웹 사이트" isBlue={true} />
                    <NavigationLinksButton text="채용 사이트" />
                    <NavigationLinksButton text="기술 블로그" />
                </div>
                <div className="flex justify-end">마지막 업데이트: 2023.01.02</div>
            </div>
        </div>
    );
}
