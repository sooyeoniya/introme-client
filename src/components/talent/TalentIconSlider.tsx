import smileIcon from "../../assets/smile.png";
import react from "../../assets/react.svg";
import logo from "../../assets/IntroMeLogo.png";
import { motion } from "framer-motion";

interface Slide {
    icon: string;
}

const slides: Slide[] = [{ icon: smileIcon }, { icon: logo }, { icon: react }, { icon: logo }];

export default function TalentIconSlider() {
    const num = Math.trunc(40 / slides.length);
    const duplicatedSlides = Array.from({ length: num }, () => slides).flat();
    return (
        <div
            className="py-32 overflow-hidden mx-auto w-5/6 flex"
            style={{
                maskImage:
                    "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                WebkitMaskImage:
                    "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
            }}
        >
            <motion.div
                className="flex"
                animate={{
                    x: ["0%", "-100%"],
                    transition: {
                        ease: "linear",
                        duration: 40,
                        repeat: Infinity
                    }
                }}
            >
                {duplicatedSlides.map((slide, index) => (
                    <div key={index} className="flex-shrink-0 w-[5%]">
                        <div className="bg-white rounded-full flex w-32 h-32 justify-center items-center">
                            <img
                                src={slide.icon}
                                className="flex items-center justify-center h-16 w-16"
                                alt="icon"
                            />
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
