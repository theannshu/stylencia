import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Configuration & Assets ---
const THEME = {
    bg: 'bg-gradient-to-b from-[#f3e8ff] via-[#faf5ff] to-white',
    text: 'text-slate-800',
    accent: 'text-purple-600',
    button: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white active:scale-95 shadow-purple-200',
    fontMain: 'font-["Inter",sans-serif]',
    fontElegant: 'font-["Playfair_Display",serif]',
    fontCursive: 'font-["Great_Vibes",cursive]',
};

// --- USER PHOTOS CONFIGURATION ---
const MEMORIES = [
    {
        id: 'timeline_1',
        url: "/assets/divyanka/timeline_1.png",
        caption: "The Beginning",
        message: "Where the magic started."
    },
    {
        id: 'timeline_2',
        url: "/assets/divyanka/timeline_2.png",
        caption: "Little Angel",
        message: "Eyes full of wonder."
    },
    {
        id: 'timeline_new_3',
        url: "/assets/divyanka/timeline_childhood_new.png",
        caption: "Innocence",
        message: "Pure joy captured."
    },
    {
        id: 'timeline_3',
        url: "/assets/divyanka/timeline_3.png",
        caption: "Blooming",
        message: "Growing in grace."
    },
    {
        id: 'current_1',
        url: "/assets/divyanka/current_1.png",
        caption: "Style Icon",
        message: "Elegance personified."
    },
    {
        id: 'current_2',
        url: "/assets/divyanka/current_2.png",
        caption: "That Smile",
        message: "Lights up my world."
    },
    {
        id: 'current_3',
        url: "/assets/divyanka/current_3.png",
        caption: "Grace",
        message: "Pure beauty."
    },
    {
        id: 'current_4',
        url: "/assets/divyanka/current_4.png",
        caption: "My Queen",
        message: "The woman I adore."
    },
    {
        id: 'timeline_4',
        url: "/assets/divyanka/timeline_4.png",
        caption: "Radiance",
        message: "Turning moments into memories."
    },
    {
        id: 'timeline_5',
        url: "/assets/divyanka/timeline_5.png",
        caption: "The Queen",
        message: "The woman you are today."
    }
];

// Animation Variants
const fadeVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.5 } }
};

// --- AUDIO COMPONENT ---
// --- AUDIO COMPONENT ---
const BackgroundMusic = ({ shouldPlay, currentStep }) => {
    const audioRef = React.useRef(null);

    useEffect(() => {
        audioRef.current = new Audio("/assets/divyanka/bg_music.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = 0.4; // Start Mid
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (shouldPlay && audioRef.current) {
            audioRef.current.play().catch(e => console.log("Audio play failed:", e));
        }
    }, [shouldPlay]);

    useEffect(() => {
        if (!audioRef.current) return;

        // Target volume: Mid (0.4) for steps 1-3, High (1.0) for step 4+
        const targetVolume = currentStep >= 4 ? 1.0 : 0.4;

        const fadeInterval = setInterval(() => {
            const current = audioRef.current.volume;
            if (Math.abs(current - targetVolume) < 0.05) {
                audioRef.current.volume = targetVolume;
                clearInterval(fadeInterval);
            } else if (current < targetVolume) {
                audioRef.current.volume = Math.min(1, current + 0.05);
            } else {
                audioRef.current.volume = Math.max(0, current - 0.05);
            }
        }, 200);

        return () => clearInterval(fadeInterval);
    }, [currentStep]);

    return null;
};

// --- VISUAL ELEMENTS ---

const Balloons = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute text-4xl opacity-60"
                initial={{ y: "110vh", x: Math.random() * 100 + "vw", scale: 0.5 + Math.random() * 0.5 }}
                animate={{ y: "-20vh", rotate: [-10, 10, -10] }}
                transition={{ duration: 15 + Math.random() * 10, ease: "linear", repeat: Infinity, delay: Math.random() * 20 }}
                style={{ color: ['#9333ea', '#db2777', '#c084fc', '#f472b6'][i % 4] }}
            >
                🎈
            </motion.div>
        ))}
    </div>
);

const Birds = () => (
    <div className="absolute top-10 left-0 w-full h-40 pointer-events-none z-0">
        {[...Array(3)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute text-purple-400/30"
                initial={{ x: "-10vw", y: 20 * i }}
                animate={{ x: "110vw", y: [20 * i, 20 * i - 20, 20 * i] }}
                transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear", delay: i * 5 }}
            >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.5 12c-3.5 0-6.5-3-9-7-0.5-1-1.5-1-2 0-2.5 4-5.5 7-9 7 3.5 0 6.5 3 9 7 0.5 1 1.5 1 2 0 2.5-4 5.5-7 9-7z" />
                </svg>
            </motion.div>
        ))}
    </div>
);

const FloatingHearts = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(20)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute text-red-500/20 text-3xl"
                initial={{
                    y: "110vh",
                    x: Math.random() * 100 + "vw",
                    scale: Math.random() * 0.5 + 0.5,
                    opacity: 0
                }}
                animate={{
                    y: "-10vh",
                    opacity: [0, 0.6, 0],
                    rotate: [0, 45, -45, 0]
                }}
                transition={{
                    duration: 12 + Math.random() * 10,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                    ease: "linear"
                }}
            >
                ❤️
            </motion.div>
        ))}
    </div>
);

const FallingElements = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(20)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute text-2xl opacity-40"
                initial={{
                    y: "-10vh",
                    x: Math.random() * 100 + "vw",
                    rotate: 0,
                    opacity: 0
                }}
                animate={{
                    y: "110vh",
                    x: `calc(${Math.random() * 100}vw + ${Math.random() * 100 - 50}px)`,
                    rotate: 360,
                    opacity: [0, 0.8, 0]
                }}
                transition={{
                    duration: 15 + Math.random() * 10,
                    repeat: Infinity,
                    delay: Math.random() * 10,
                    ease: "linear"
                }}
            >
                {['🌸', '🌺', '🍃', '✨', '💜'][i % 5]}
            </motion.div>
        ))}
    </div>
);

const GateTransition = ({ children, onOpen, onInteraction }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => {
        if (onInteraction) onInteraction();
        setIsOpen(true);
        setTimeout(onOpen, 1000);
    };

    return (
        <div className="fixed inset-0 z-50 flex">
            <motion.div
                className="w-1/2 h-full bg-gradient-to-br from-purple-900 to-indigo-900 border-r border-purple-400/30 flex items-center justify-end pr-4 shadow-2xl z-50 relative"
                initial={false}
                animate={isOpen ? { x: "-100%" } : { x: 0 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="text-purple-200/20 text-[200px] font-serif absolute -right-16 select-none">1</div>
            </motion.div>
            <motion.div
                className="w-1/2 h-full bg-gradient-to-bl from-purple-900 to-indigo-900 border-l border-purple-400/30 flex items-center justify-start pl-4 shadow-2xl z-50 relative"
                initial={false}
                animate={isOpen ? { x: "100%" } : { x: 0 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="text-purple-200/20 text-[200px] font-serif absolute -left-16 select-none">8</div>
            </motion.div>
            {!isOpen && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-[60]">
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-purple-200 mb-8 font-serif tracking-widest uppercase text-sm">Tap to Unlock</motion.p>
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleOpen} className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.4)] animate-pulse">
                        <span className="text-3xl">🗝️</span>
                    </motion.button>
                </div>
            )}
        </div>
    );
};

const Cake = () => (
    <div className="relative w-40 h-40 mx-auto my-8">
        <div className="absolute bottom-0 w-32 h-16 left-4 bg-purple-200 rounded-lg shadow-inner"></div>
        <div className="absolute bottom-16 w-24 h-16 left-8 bg-purple-300 rounded-lg shadow-inner"></div>
        <div className="absolute bottom-32 left-16 w-2 h-8 bg-yellow-200 rounded-sm"></div>
        <div className="absolute bottom-[9.5rem] left-16 w-2 h-4 bg-orange-500 rounded-full blur-[2px] animate-pulse"></div>
        <div className="absolute -bottom-2 left-0 w-40 h-4 bg-black/10 rounded-[100%] blur-sm"></div>
    </div>
);

const TypewriterText = ({ text, onComplete, delay = 0 }) => {
    const [displayedText, setDisplayedText] = useState("");
    const intervalRef = React.useRef(null);
    const timeoutRef = React.useRef(null);

    useEffect(() => {
        setDisplayedText("");
        // Clear any existing timers immediately on effect run/cleanup
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        let currentIndex = 0;

        timeoutRef.current = setTimeout(() => {
            intervalRef.current = setInterval(() => {
                // Strict bounds check
                if (currentIndex < text.length) {
                    const char = text[currentIndex];
                    if (char !== undefined) {
                        setDisplayedText((prev) => prev + char);
                    }
                    currentIndex++;
                } else {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    if (onComplete) onComplete();
                }
            }, 50);
        }, delay * 1000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [text, delay, onComplete]);

    return <span>{displayedText}</span>;
};

const ActionButton = ({ onClick, label, delay = 0 }) => (
    <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.8 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`fixed bottom-12 left-1/2 transform -translate-x-1/2 px-8 py-4 rounded-full shadow-lg ${THEME.button} text-lg tracking-wide z-50 min-w-[200px] font-medium border border-white/20`}
    >
        {label}
    </motion.button>
);

// --- MAIN COMPONENT ---
const Divyanka18 = () => {
    const [gateOpened, setGateOpened] = useState(false);
    const [playMusic, setPlayMusic] = useState(false);
    const [step, setStep] = useState(1);
    const [subStep, setSubStep] = useState(0);

    useEffect(() => {
        const link = document.createElement('link');
        link.href = "https://fonts.googleapis.com/css2?family=Great+Vibes&family=Inter:wght@300;400;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);
        const meta = document.createElement('meta');
        meta.name = "robots";
        meta.content = "noindex, nofollow";
        document.head.appendChild(meta);
        return () => { document.head.removeChild(link); document.head.removeChild(meta); };
    }, []);

    // Step 1: Entry
    const Step1 = () => (
        <motion.div variants={fadeVariant} initial="hidden" animate="visible" exit="exit" className="flex flex-col items-center justify-center h-full text-center px-6 relative z-10">
            <h1 className={`text-3xl md:text-5xl ${THEME.fontElegant} ${THEME.text} leading-snug drop-shadow-sm`}>Today is not<br />an ordinary day.</h1>
            <ActionButton onClick={() => setStep(2)} label="Why? Tell me more" delay={1.5} />
        </motion.div>
    );

    // Step 2: Name Reveal (Enhanced with Photo)
    const Step2 = () => {
        const [phase, setPhase] = useState('type');
        const finishType = React.useCallback(() => setPhase('pause'), []);
        useEffect(() => { if (phase === 'pause') setTimeout(() => setPhase('show'), 1500); }, [phase]);

        return (
            <motion.div variants={fadeVariant} initial="hidden" animate="visible" exit="exit" className="flex flex-col items-center justify-center h-full text-center px-6 z-10">
                <div className={`text-2xl ${THEME.text} leading-relaxed`}>
                    <TypewriterText text="Today belongs to..." onComplete={finishType} />
                    <AnimatePresence>
                        {(phase === 'show' || phase === 'done') && (
                            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, type: "spring" }} onAnimationComplete={() => setPhase('done')} className="mt-8 relative flex flex-col items-center">
                                {/* Photo Reveal */}
                                <div className="p-1 mb-6 rounded-full bg-gradient-to-tr from-purple-400 to-pink-400 p-[3px]">
                                    <img src={MEMORIES[4].url} alt="Divyanka" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl" />
                                </div>
                                <span className={`block text-5xl md:text-6xl ${THEME.fontCursive} ${THEME.accent} drop-shadow-md relative`}>Divyanka Mishra</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                {phase === 'done' && <ActionButton onClick={() => setStep(3)} label="Continue" delay={0.5} />}
            </motion.div>
        );
    };

    // Step 3: Milestone
    const Step3 = () => (
        <motion.div variants={fadeVariant} initial="hidden" animate="visible" exit="exit" className="flex flex-col items-center justify-center h-full text-center px-6 space-y-6 z-10">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-lg text-purple-400 font-semibold tracking-widest uppercase">
                10 January 2008
            </motion.p>

            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.2, type: "spring", bounce: 0.5 }} className="py-6 relative">
                <div className="absolute inset-0 bg-yellow-200/30 blur-[40px] rounded-full animate-pulse"></div>
                <h1 className={`text-6xl md:text-7xl ${THEME.fontCursive} text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 relative leading-tight`}>
                    Happy 18th<br />Birthday
                </h1>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="text-xl text-slate-500 italic">
                From a girl to a Goddess.
            </motion.p>
            <ActionButton onClick={() => setStep(4)} label="See her growth" delay={3} />
        </motion.div>
    );

    // Step 4: Growth Journey (Integrated 5 Photos)
    const Step4 = () => {
        const [index, setIndex] = useState(0);
        const isLast = index === MEMORIES.length - 1;

        return (
            <motion.div variants={fadeVariant} initial="hidden" animate="visible" exit="exit" className="flex flex-col items-center justify-center h-full text-center px-6 z-10">
                <h3 className={`text-2xl ${THEME.fontElegant} text-purple-800 mb-6`}>Beautiful Inside & Out</h3>

                <div className="relative w-64 h-80 perspective-1000">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 50, rotate: 5 }}
                            animate={{ opacity: 1, x: 0, rotate: index % 2 === 0 ? 2 : -2 }}
                            exit={{ opacity: 0, x: -50, rotate: -5 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white p-3 shadow-2xl rounded-lg absolute inset-0 border border-purple-100 transform origin-bottom"
                        >
                            <img src={MEMORIES[index].url} className="w-full h-56 object-cover rounded-md mb-4 bg-purple-50" alt="Memory" />
                            <p className="text-purple-600 font-bold font-serif">{MEMORIES[index].caption}</p>
                            <p className="text-slate-600 text-sm italic">{MEMORIES[index].message}</p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="mt-12 flex gap-4 z-20">
                    {!isLast ? (
                        <button onClick={() => setIndex(prev => prev + 1)} className="px-6 py-2 bg-purple-100 text-purple-700 rounded-full font-medium hover:bg-purple-200 transition shadow-sm">
                            Next Memory
                        </button>
                    ) : (
                        <ActionButton onClick={() => setStep(5)} label="Continue" />
                    )}
                </div>
            </motion.div>
        );
    };

    // Step 5: Emotional Build-up
    const Step5 = () => {
        const lines = [
            { text: "Some people just exist...", img: null },
            { text: "But you? You glow.", img: "/assets/divyanka/glow_1.jpg" },
            { text: "My favorite person.", img: "/assets/divyanka/glow_2.png" },
            { text: "The reason today is beautiful.", img: "/assets/divyanka/glow_3.png" }
        ];

        const currentContent = lines[subStep];
        const handleNext = () => subStep < lines.length - 1 ? setSubStep(p => p + 1) : setStep(6);

        return (
            <motion.div key={subStep} variants={fadeVariant} initial="hidden" animate="visible" exit="exit" className="flex flex-col items-center justify-center h-full text-center px-8 z-10 w-full">
                <p className={`text-3xl ${THEME.fontElegant} ${THEME.accent} leading-relaxed drop-shadow-sm mb-8`}>
                    {currentContent.text}
                </p>

                {currentContent.img && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        className="mb-8 p-1 rounded-2xl bg-white/30 backdrop-blur-sm border border-white/40 shadow-xl"
                    >
                        <img
                            src={currentContent.img}
                            alt="Beautiful Memory"
                            className="w-64 h-80 object-cover rounded-xl"
                        />
                    </motion.div>
                )}

                <ActionButton onClick={handleNext} label="Next" delay={0.2} />
            </motion.div>
        );
    };

    // Step 6: Cake (Updated with Music & Photo)
    const Step6 = () => {
        const [locked, setLocked] = useState(true);
        useEffect(() => { setTimeout(() => setLocked(false), 3000); }, []);

        return (
            <motion.div variants={fadeVariant} initial="hidden" animate="visible" exit="exit" className="flex flex-col items-center justify-center h-full text-center px-6 relative z-10">
                <Cake />
                <h1 className={`text-5xl ${THEME.fontCursive} ${THEME.accent} mb-6 mt-4`}>Happy Birthday,<br />My Star!</h1>

                {/* Final Emotional Photo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-6 rotate-1"
                >
                    <img
                        src="/assets/divyanka/glow_4.png"
                        alt="Birthday Girl"
                        className="w-48 h-48 object-cover rounded-full border-4 border-purple-200 shadow-lg mx-auto"
                    />
                </motion.div>

                {!locked && <ActionButton onClick={() => setStep(7)} label="A special note" />}
            </motion.div>
        );
    };

    // Step 7: Letter (Enhanced with Photo)
    const Step7 = () => (
        <motion.div variants={fadeVariant} initial="hidden" animate="visible" exit="exit" className="flex flex-col h-full bg-purple-50/50 z-10 relative">
            <div className="flex-1 overflow-y-auto px-6 py-12 pb-32">
                <div className="max-w-md mx-auto bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-purple-100">
                    {/* Sticker Photo */}
                    <div className="transform -rotate-2 mb-6 w-full flex justify-center">
                        <img src={MEMORIES[3].url} className="w-32 h-32 object-cover rounded-lg border-4 border-white shadow-md" alt="Sticker" />
                    </div>

                    <p className={`text-xl mb-6 ${THEME.fontElegant} text-purple-800`}>Dearest Divyanka,</p>
                    {/* Content Block */}
                    <div className={`space-y-6 text-lg leading-relaxed text-slate-700 font-light`}>
                        <p>Today, you turn eighteen — and honestly? The world just got a major upgrade.</p>
                        <p>Watching you grow has been a privilege. Your smile? It’s my favorite thing.</p>
                        <p>I hope you know how incredibly important you are. To me. To everyone.</p>
                        <p>Don't ever let anyone dull your sparkle. You were born to stand out, to lead, and to be loved.</p>
                    </div>
                    <p className={`mt-8 text-2xl ${THEME.fontCursive} text-purple-600`}>Love You,<br />Always.</p>
                </div>
            </div>
            <ActionButton onClick={() => setStep(8)} label="One last surprise" delay={1} />
        </motion.div>
    );

    // Step 8: Closure
    const Step8 = () => (
        <motion.div variants={fadeVariant} initial="hidden" animate="visible" exit="exit" className="flex flex-col items-center justify-center h-full text-center px-6 z-10 relative">
            <h2 className={`text-3xl ${THEME.fontElegant} text-slate-600 mb-16`}>Enjoy your day, Queen.</h2>

            <div className="relative mb-10 mt-4">
                {/* Crown positioned above the photo */}
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: -65, opacity: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-7xl z-20 filter drop-shadow-lg"
                >
                    👑
                </motion.div>

                {/* Photo with regal border */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="p-1.5 rounded-full bg-gradient-to-tr from-yellow-400 via-purple-500 to-pink-500 shadow-2xl"
                >
                    <img
                        src="/assets/divyanka/current_4.png"
                        alt="Queen Divyanka"
                        className="w-56 h-56 rounded-full object-cover border-4 border-white"
                    />
                </motion.div>
            </div>

            <p className="text-sm text-purple-600 uppercase tracking-widest font-semibold font-serif mt-4">Forever Yours</p>
        </motion.div>
    );

    return (
        <div className={`fixed inset-0 z-[9999] ${THEME.bg} overflow-hidden font-sans selection:bg-purple-200 selection:text-purple-900`}>
            <BackgroundMusic shouldPlay={playMusic} currentStep={step} />
            {!gateOpened && <GateTransition onOpen={() => setGateOpened(true)} onInteraction={() => setPlayMusic(true)} />}
            {gateOpened && (
                <>
                    <Balloons />
                    <Birds />
                    <FloatingHearts />
                    <FallingElements />
                    <AnimatePresence mode="wait">
                        {step === 1 && <Step1 key="s1" />}
                        {step === 2 && <Step2 key="s2" />}
                        {step === 3 && <Step3 key="s3" />}
                        {step === 4 && <Step4 key="s4" />}
                        {step === 5 && <Step5 key="s5" />}
                        {step === 6 && <Step6 key="s6" />}
                        {step === 7 && <Step7 key="s7" />}
                        {step === 8 && <Step8 key="s8" />}
                    </AnimatePresence>
                </>
            )}
        </div>
    );
};

export default Divyanka18;
