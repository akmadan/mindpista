"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-yellow/20 rounded-full blur-3xl opacity-60 animate-blob"></div>
                <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-brand-blue/20 rounded-full blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-10%] left-[20%] w-[35%] h-[35%] bg-brand-pink/20 rounded-full blur-3xl opacity-60 animate-blob animation-delay-4000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6">
                        Find Your <span className="text-brand-orange">Inner Peace</span>
                        <br />
                        with <span className="text-brand-blue">MindPista</span>
                    </h1>
                    <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                        Your personal guide to mental wellness. Discover the power of therapy, yoga, and meditation in one beautiful space.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="bg-brand-blue hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Start Your Journey
                        </button>
                        <button className="bg-white text-gray-800 border-2 border-gray-200 hover:border-brand-orange hover:text-brand-orange px-8 py-4 rounded-full text-lg font-bold transition-all">
                            Learn More
                        </button>
                    </div>
                </motion.div>

                {/* Hero Image / Illustration Placeholder */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-16 relative mx-auto max-w-4xl"
                >
                    <div className="aspect-[16/9] bg-gradient-to-br from-brand-yellow/10 to-brand-teal/10 rounded-3xl border border-white/50 shadow-2xl flex items-center justify-center overflow-hidden">
                        {/* We can replace this with a real image later */}
                        <div className="text-center p-10">
                            <div className="w-24 h-24 bg-brand-orange rounded-full mx-auto mb-4 animate-bounce"></div>
                            <p className="text-gray-400 font-medium">MindPista App Preview</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
