import smileIcon from "../../assets/smile.png";

interface TalentItems {
    icon: string;
    title: string;
    description: string;
}

const talentData: TalentItems[] = [
    {
        icon: smileIcon,
        title: "혁신",
        description: "가보지 않은 길을 두려워하지 않습니다"
    },
    {
        icon: smileIcon,
        title: "본질 추구",
        description: "남들이 당연시 생각하는 것이라도 본질에 대해서 생각합니다"
    },
    {
        icon: smileIcon,
        title: "신뢰",
        description: "동료에 대한 신뢰와 존중을 기반으로 토론합니다"
    },
    {
        icon: smileIcon,
        title: "주도성",
        description: "스스로 몰입하고 주도적으로 일합니다"
    },
    {
        icon: smileIcon,
        title: "사회적 책임감",
        description: "보다 나은 세상을 만들기 위해 노력합니다"
    }
];

export default function TalentContents() {
    return (
        <div className="px-20 pb-56 flex justify-between">
            <div className="w-1/2">
                {talentData.map((item, index) => {
                    if (index % 2 === 0) {
                        return (
                            <div key={index} className="flex flex-col gap-6 pt-56">
                                <div className="h-12 w-12">
                                    <img src={item.icon} alt="icon" />
                                </div>
                                <p className="font-GmarketSansBold text-5xl">{item.title}</p>
                                <p className="text-3xl">{item.description}</p>
                            </div>
                        );
                    }
                })}
            </div>
            <div className="w-1/2 pt-56">
                {talentData.map((item, index) => {
                    if (index % 2 !== 0) {
                        return (
                            <div
                                key={index}
                                className="flex flex-col gap-6 pt-56 justify-items-end"
                            >
                                <div className="h-12 w-12 self-end">
                                    <img src={item.icon} alt="icon" />
                                </div>
                                <p className="font-GmarketSansBold text-5xl self-end">
                                    {item.title}
                                </p>
                                <p className="text-3xl self-end text-right">{item.description}</p>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
}
