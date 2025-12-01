"use client";

import { motion } from "framer-motion";
import { Heart, Sun, Brain } from "lucide-react";

const features = [
    {
        id: "therapy",
        title: "Therapy",
        description: "Connect with licensed therapists for personalized sessions. Talk through your feelings in a safe, confidential space.",
        icon: Heart,
        color: "bg-brand-pink",
        textColor: "text-brand-pink",
        delay: 0,
    },
    {
        id: "yoga",
        title: "Yoga",
        description: "Flow through guided yoga sessions for all levels. Strengthen your body and calm your mind with expert instruction.",
        icon: Sun,
        color: "bg-brand-yellow",
        textColor: "text-brand-yellow",
        delay: 0.2,
    },
    {
        id: "meditation",
        title: "Meditation",
        description: "Find stillness with our library of guided meditations. Reduce stress, improve focus, and sleep better.",
        icon: Brain,
        color: "bg-brand-teal",
        textColor: "text-brand-teal",
        delay: 0.4,
    },
];

export default function FeatureSection() {
    return (
        <section id="features" className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Holistic Wellness for <span className="text-brand-blue">Every Mind</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Choose the path that feels right for you today. Mix and match to create your perfect wellness routine.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <motion.div
                            key={feature.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: feature.delay }}
                            className="bg-soft-gray rounded-3xl p-8 hover:shadow-xl transition-shadow duration-300 border border-transparent hover:border-gray-100 group"
                        >
                            <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {feature.description}
                            </p>
                            <a href={`#${feature.id}`} className={`font-bold ${feature.textColor} hover:opacity-80 flex items-center`}>
                                Learn more <span className="ml-2">→</span>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
