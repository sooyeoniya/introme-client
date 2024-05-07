import smileIcon from "../../assets/smile.png";
import react from "../../assets/react.svg";
import logo from "../../assets/IntroMeLogo.png";
import { motion } from "framer-motion";

interface Slide {
    icon: string;
}

const slides: Slide[] = [{ icon: smileIcon }, { icon: logo }, { icon: react }];

export default function IconSlider() {
    const num = Math.trunc(40 / slides.length);
    const duplicatedSlides = Array.from({ length: num }, () => slides).flat();
    return (
        <div className="py-32 overflow-hidden mx-auto w-5/6 flex">
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
                    <div
                        key={index}
                        className="flex-shrink-0"
                        style={{ width: `${200 / duplicatedSlides.length}%` }}
                    >
                        <div className="bg-white rounded-full flex w-32 h-32 justify-center items-center">
                            <img
                                src={slide.icon}
                                className="flex items-center justify-center h-16 w-16"
                            />
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
