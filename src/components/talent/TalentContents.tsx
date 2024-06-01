import smileIcon from "../../assets/smile.png";
import { motion, Variants } from "framer-motion";
import { useEffect } from "react";

interface TalentItems {
    icon: string;
    keyword: string;
    description: string;
}

const cardVariants: Variants = {
    offscreen: {
        opacity: 0,
        y: 200
    },
    onscreen: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5
        }
    }
};

const talentData: TalentItems[] = [
    {
        icon: smileIcon,
        keyword: "혁신",
        description: "가보지 않은 길을 두려워하지 않습니다"
    },
    {
        icon: smileIcon,
        keyword: "본질 추구",
        description: "남들이 당연시 생각하는 것이라도 본질에 대해서 생각합니다"
    },
    {
        icon: smileIcon,
        keyword: "신뢰",
        description: "동료에 대한 신뢰와 존중을 기반으로 토론합니다"
    },
    {
        icon: smileIcon,
        keyword: "주도성",
        description: "스스로 몰입하고 주도적으로 일합니다"
    },
    {
        icon: smileIcon,
        keyword: "사회적 책임감",
        description: "보다 나은 세상을 만들기 위해 노력합니다"
    },
    {
        icon: smileIcon,
        keyword: "혁신",
        description: "가보지 않은 길을 두려워하지 않습니다"
    },
    {
        icon: smileIcon,
        keyword: "본질 추구",
        description: "남들이 당연시 생각하는 것이라도 본질에 대해서 생각합니다"
    },
    {
        icon: smileIcon,
        keyword: "신뢰",
        description: "동료에 대한 신뢰와 존중을 기반으로 토론합니다"
    },
    {
        icon: smileIcon,
        keyword: "주도성",
        description: "스스로 몰입하고 주도적으로 일합니다"
    },
    {
        icon: smileIcon,
        keyword: "사회적 책임감",
        description: "보다 나은 세상을 만들기 위해 노력합니다"
    }
];

export default function TalentContents() {
    useEffect(() => {
        window.onbeforeunload = function pushRefresh() {
            window.scrollTo(0, 0);
        };
    }, []);

    return (
        <div className="px-20 pt-36 flex justify-between">
            <div className="w-1/2">
                {talentData.map((item, index) => {
                    if (index % 2 === 0) {
                        return (
                            <motion.div
                                key={index}
                                className="pb-64"
                                initial="offscreen"
                                whileInView="onscreen"
                                viewport={{ once: true, amount: 0.8 }}
                            >
                                <motion.div variants={cardVariants}>
                                    <div className="flex flex-col gap-6">
                                        <div className="h-12 w-12">
                                            <img src={item.icon} alt="icon" />
                                        </div>
                                        <p className="font-GmarketSansBold text-5xl">
                                            {item.keyword}
                                        </p>
                                        <p className="text-3xl">{item.description}</p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    }
                })}
            </div>
            <div className="w-1/2 pt-52">
                {talentData.map((item, index) => {
                    if (index % 2 !== 0) {
                        return (
                            <motion.div
                                key={index}
                                className="pb-64"
                                initial="offscreen"
                                whileInView="onscreen"
                                viewport={{ once: true, amount: 0.8 }}
                            >
                                <motion.div variants={cardVariants}>
                                    <div className="flex flex-col gap-6 justify-items-end">
                                        <div className="h-12 w-12 self-end">
                                            <img src={item.icon} alt="icon" />
                                        </div>
                                        <p className="font-GmarketSansBold text-5xl self-end">
                                            {item.keyword}
                                        </p>
                                        <p className="text-3xl self-end text-right">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    }
                })}
            </div>
        </div>
    );
}
