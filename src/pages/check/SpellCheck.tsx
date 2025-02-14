import { useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import { LuCopy } from "react-icons/lu";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaCircle } from "react-icons/fa";
import ToggleButton from "../../components/check/buttons/ToggleButton.tsx";
import DisabledButton from "../../components/check/buttons/DisabledButton.tsx";
import ActivatedButton from "../../components/check/buttons/ActivatedButton.tsx";
import CorrectionItem from "../../components/check/CorrectionItem.tsx";

export default function SpellCheck() {
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [inputText, setInputText] = useState<string>("");
    const [isSpellCheckClicked, setIsSpellCheckClicked] = useState<boolean>(false);
    const [includeSpaces, setIncludeSpaces] = useState<boolean>(false);
    const [includeSpecialCharacters, setIncludeSpecialCharacters] = useState<boolean>(false);
    const [specialCharactersCount, setSpecialCharactersCount] = useState<number>(0);
    const [correctionItems, setCorrectionItems] = useState<
        { color: string; textBefore: string; textAfter: string }[]
    >([]);
    const extractSpecialCharacters = () => {
        const specialCharactersRegex = /[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣,. \t\n]/g;
        const specialCharactersList = inputText.match(specialCharactersRegex);
        return specialCharactersList ? specialCharactersList : [];
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputText(e.target.value);
    };
    const handleResetCorrectionItems = () => {
        setCorrectionItems([]);
        setIsSpellCheckClicked(!isSpellCheckClicked);
        setSpecialCharactersCount(0);
    };
    const handleSpellCheckClick = () => {
        handleResetCorrectionItems();
        if (includeSpecialCharacters) {
            const specialCharactersList = extractSpecialCharacters();
            const newCorrectionItems = specialCharactersList.map(character => ({
                color: "blue",
                textBefore: character,
                textAfter: "특수문자"
            }));
            setCorrectionItems(newCorrectionItems);
            setSpecialCharactersCount(newCorrectionItems.length);
        }
    };
    const handleResetTextarea = () => {
        setInputText("");
        if (isSpellCheckClicked) handleResetCorrectionItems();
    };
    const handleCopyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(inputText);
            console.log("Success to copy");
        } catch (error) {
            console.error("Fail to copy: ", error);
        }
    };
    const textLength = includeSpaces ? inputText.length : inputText.replace(/ /g, "").length;
    const textSizeInBytes = new TextEncoder().encode(inputText).length;
    const handleToggleSpaces = () => {
        setIncludeSpaces(!includeSpaces);
    };
    const handleToggleSpecialCharacters = () => {
        setIncludeSpecialCharacters(!includeSpecialCharacters);
    };
    const handleModifyAllClick = () => {
        setCorrectionItems([]);
        setInputText(prevText => prevText.replace(/[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣,. \t\n]/g, ""));
        setSpecialCharactersCount(0);
    };
    const handleDeleteSpecialCharacter = (index: number, character: string) => {
        let cnt = 0;
        for (let i = 0; i < correctionItems.length; i++) {
            if (correctionItems[i].textBefore === character) cnt++;
            if (i === index) break;
        }

        const newCorrectionItems = [...correctionItems];
        newCorrectionItems.splice(index, 1);
        setCorrectionItems(newCorrectionItems);

        setInputText(prevText => {
            let count = 0;
            let newText = prevText;
            for (let i = 0; i < prevText.length; i++) {
                if (prevText[i] === character) {
                    count++;
                    if (count === cnt) {
                        newText = prevText.slice(0, i) + prevText.slice(i + 1);
                        break;
                    }
                }
            }
            return newText;
        });
        setSpecialCharactersCount(specialCharactersCount - 1);
    };
    return (
        <div className="relative flex flex-col items-center h-screen mx-4">
            <div className="absolute bottom-3 w-full h-check-page grid lg:grid-cols-2 sm:grid-cols-1 grid-cols-1 justify-center items-center bg-main-3 bg-opacity-15 rounded-xl shadow-main">
                <div className="flex flex-col w-full h-full py-3 pl-4 pr-2">
                    <div className="grid grid-cols-2 pt-2 pb-3">
                        <p className="text-lg">원문</p>
                        <div className="flex gap-4 justify-end items-center">
                            <div className="flex gap-2 justify-end items-center">
                                <p className="text-xs">공백</p>
                                <ToggleButton
                                    includeFunc={includeSpaces}
                                    handleToggle={handleToggleSpaces}
                                />
                            </div>
                            <div className="flex gap-2 justify-end items-center">
                                <div className="relative flex gap-1">
                                    <div
                                        className="cursor-pointer text-gray-500"
                                        onMouseEnter={() => setShowInfo(true)}
                                        onMouseLeave={() => setShowInfo(false)}
                                    >
                                        <AiOutlineInfoCircle />
                                    </div>
                                    <p className="text-xs">특수문자</p>
                                    {showInfo && (
                                        <>
                                            <div
                                                className="absolute z-0 border-l-8 border-r-8
                                                    border-b-8 border-transparent border-b-white
                                                    -bottom-2 left-0 before:filter drop-shadow"
                                            />
                                            <div className="absolute z-50 bg-white py-2 px-3 rounded-full shadow-toggle text-xs -bottom-10 -left-56">
                                                <p className="text-nowrap">
                                                    ‘.’과 ‘,’를 제외한 모든 특수문자는 제거됩니다.
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <ToggleButton
                                    includeFunc={includeSpecialCharacters}
                                    handleToggle={handleToggleSpecialCharacters}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full h-full bg-white rounded-xl shadow-main px-4 pt-4 pb-2 gap-2">
                        <textarea
                            placeholder={!isSpellCheckClicked ? "검사할 내용을 입력하세요." : ""}
                            className="text-sm grow resize-none focus:outline-none disabled:bg-white"
                            value={inputText}
                            onChange={handleInputChange}
                            disabled={isSpellCheckClicked}
                        />
                        <p className="flex h-13 text-xs text-zinc-500 justify-end">
                            {textLength}/20000(글자수) | {textSizeInBytes}/40000(byte)
                        </p>
                    </div>
                    {!isSpellCheckClicked && inputText.length === 0 ? (
                        <div className="flex w-full pt-3 gap-4 text-sm">
                            <DisabledButton />
                            <DisabledButton />
                        </div>
                    ) : (
                        <div className="flex w-full pt-3 gap-4 text-sm">
                            <ActivatedButton
                                icon={<GrPowerReset />}
                                text="초기화"
                                onClick={handleResetTextarea}
                            />
                            <ActivatedButton
                                icon={<LuCopy />}
                                text="전체 복사"
                                onClick={handleCopyToClipboard}
                            />
                        </div>
                    )}
                </div>
                <div className="flex flex-col w-full h-full py-3 pr-4 pl-2 overflow-auto">
                    <div className="flex flex-row justify-between">
                        <p className="text-lg pt-2 pb-3">교정 결과</p>
                        {isSpellCheckClicked && (
                            <div className="grid grid-cols-2 grid-rows-2 text-xs py-2 pr-2">
                                <div className="flex text-my-red items-center gap-2">
                                    <FaCircle size="6" />
                                    맞춤법
                                </div>
                                <div className="flex text-my-purple items-center gap-2">
                                    <FaCircle size="6" />
                                    표준어 의심
                                </div>
                                <div className="flex text-my-green items-center gap-2">
                                    <FaCircle size="6" />
                                    띄어쓰기
                                </div>
                                <div className="flex text-my-blue items-center gap-2">
                                    <FaCircle size="6" />
                                    특수문자
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="w-full h-full bg-white rounded-xl shadow-main p-4 overflow-hidden">
                        {isSpellCheckClicked && (
                            <div className="flex flex-col h-full max-h-full text-sm gap-3 overflow-auto">
                                {correctionItems.map((item, index) => (
                                    <CorrectionItem
                                        key={index}
                                        color={item.color}
                                        textBefore={item.textBefore}
                                        textAfter={item.textAfter}
                                        onDeleteSpecialCharacter={() =>
                                            handleDeleteSpecialCharacter(index, item.textBefore)
                                        }
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex w-full pt-3 justify-between text-sm">
                        <div className="flex items-center pl-2 text-my-red">
                            교정 개수 {specialCharactersCount}개
                        </div>
                        {!isSpellCheckClicked && inputText.length === 0 ? (
                            <div className="flex gap-4">
                                <DisabledButton />
                            </div>
                        ) : (
                            <div className="flex gap-4">
                                {isSpellCheckClicked ? (
                                    <>
                                        <ActivatedButton
                                            text="전체 수정"
                                            onClick={handleModifyAllClick}
                                        />
                                        <ActivatedButton
                                            text="다시 검사"
                                            onClick={handleResetCorrectionItems}
                                        />
                                    </>
                                ) : (
                                    <ActivatedButton
                                        text="맞춤법 검사"
                                        onClick={handleSpellCheckClick}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
