import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

const Quiz = () => {
    const questions = [
        {
            question: "What is the primary surfactant used for foaming in this liquid soap recipe?",
            options: ["Glycerol", "SLS", "NaOH", "Castor Oil"],
            answer: 1,
            explanation: "SLS (Sodium Lauryl Sulfate) is the primary surfactant responsible for the rich foaming action."
        },
        {
            question: "Which chemical is responsible for the saponification reaction?",
            options: ["Distilled Water", "Glycerol", "NaOH (Sodium Hydroxide)", "SLS"],
            answer: 2,
            explanation: "NaOH is the strong base that reacts with fats/oils to produce soap (saponification)."
        },
        {
            question: "Why is Glycerol added to the liquid soap?",
            options: ["To increase foam", "As a humectant for skin moisture", "To heat the mixture", "To filter impurities"],
            answer: 1,
            explanation: "Glycerol (Glycerine) is a humectant that prevents the soap from drying out the skin."
        },
        {
            question: "What should you NEVER do when handling Sodium Hydroxide (NaOH)?",
            options: ["Wear goggles", "Add NaOH to water", "Add water to NaOH", "Store in plastic"],
            answer: 2,
            explanation: "Adding water to NaOH can cause an explosive exothermic reaction. Always add NaOH to water slowly."
        }
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const handleOptionSelect = (idx) => {
        if (selectedOption !== null) return;
        
        setSelectedOption(idx);
        const correct = idx === questions[currentQuestion].answer;
        setIsCorrect(correct);
        if (correct) setScore(score + 1);

        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedOption(null);
                setIsCorrect(null);
            } else {
                setShowResult(true);
            }
        }, 2000);
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setSelectedOption(null);
        setIsCorrect(null);
    };

    return (
    <section id="quiz" className="section-padding relative">
        <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-[10px] font-bold tracking-[0.3em] text-lab-orange uppercase mb-3 px-1">Knowledge Check</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 font-labfont uppercase tracking-tight">Interactive Quiz</h3>
                    <div className="h-1 w-16 bg-lab-orange rounded-full mx-auto" />
                </motion.div>
            </div>

            <div className="glass-card rounded-[2.5rem] p-8 md:p-10 min-h-[450px] flex flex-col justify-center relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        {!showResult ? (
                            <motion.div
                                key={currentQuestion}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="flex justify-between items-center text-sm font-bold text-slate-400 uppercase tracking-widest">
                                    <span>Question {currentQuestion + 1} / {questions.length}</span>
                                    <span className="text-lab-orange">Score: {score}</span>
                                </div>

                                <h4 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-8 transition-colors leading-tight">
                                    {questions[currentQuestion].question}
                                </h4>

                                <div className="grid grid-cols-1 gap-3">
                                    {questions[currentQuestion].options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleOptionSelect(idx)}
                                            disabled={selectedOption !== null}
                                            className={`w-full p-4 text-left rounded-2xl border transition-all duration-300 font-medium text-base flex justify-between items-center ${
                                                selectedOption === idx
                                                    ? idx === questions[currentQuestion].answer
                                                        ? 'bg-green-500 text-white border-green-600 shadow-xl shadow-green-100'
                                                        : 'bg-red-500 text-white border-red-600 shadow-xl shadow-red-100'
                                                    : selectedOption !== null && idx === questions[currentQuestion].answer
                                                        ? 'bg-green-500/20 border-green-500 text-green-700 dark:text-green-400'
                                                        : 'glass-panel border-transparent text-slate-600 dark:text-slate-300 hover:border-lab-orange/30 hover:bg-white dark:hover:bg-slate-800'
                                            }`}
                                        >
                                            {option}
                                            {selectedOption === idx && (
                                                idx === questions[currentQuestion].answer 
                                                ? <CheckCircle2 className="text-green-500" />
                                                : <XCircle className="text-red-500" />
                                            )}
                                        </button>
                                    ))}
                                </div>

                                <AnimatePresence>
                                    {selectedOption !== null && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`p-6 rounded-2xl text-sm leading-relaxed ${isCorrect ? 'bg-green-100/50 text-green-800' : 'bg-red-100/50 text-red-800'}`}
                                        >
                                            <p className="font-bold mb-1">{isCorrect ? 'Correct!' : 'Knowledge Note:'}</p>
                                            {questions[currentQuestion].explanation}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center space-y-8"
                            >
                                <div className="inline-flex items-center justify-center w-24 h-24 bg-lab-orange/10 rounded-full text-lab-orange mb-4">
                                    <HelpCircle size={64} />
                                </div>
                                <h4 className="text-4xl font-bold text-slate-900 dark:text-white">Quiz Completed!</h4>
                                <div className="text-6xl font-black text-lab-orange">
                                    {Math.round((score / questions.length) * 100)}%
                                </div>
                                <p className="text-xl text-slate-500 dark:text-slate-400">
                                    You got {score} out of {questions.length} questions correct.
                                </p>
                                <button
                                    onClick={resetQuiz}
                                    className="inline-flex items-center gap-2 bg-slate-900 dark:bg-lab-orange text-white px-8 py-4 rounded-full font-bold hover:bg-lab-orange dark:hover:bg-orange-600 transition-all shadow-xl"
                                >
                                    <RotateCcw size={20} />
                                    Try Again
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Quiz;
