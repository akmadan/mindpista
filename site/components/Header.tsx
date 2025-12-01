import Link from "next/link";
// Button component import removed as we are using standard button for now


export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-bold text-brand-orange tracking-tight">
                            <span className="text-brand-orange">Mind</span>
                            <span className="text-brand-blue">Pista</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <Link href="#therapy" className="text-gray-600 hover:text-brand-blue font-medium transition-colors">
                            Therapy
                        </Link>
                        <Link href="#yoga" className="text-gray-600 hover:text-brand-yellow font-medium transition-colors">
                            Yoga
                        </Link>
                        <Link href="#meditation" className="text-gray-600 hover:text-brand-teal font-medium transition-colors">
                            Meditation
                        </Link>
                        <Link href="#about" className="text-gray-600 hover:text-brand-pink font-medium transition-colors">
                            About
                        </Link>
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium">
                            Log in
                        </Link>
                        <button className="bg-brand-orange hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                            Get Started
                        </button>
                    </div>

                    {/* Mobile menu button (placeholder) */}
                    <div className="md:hidden flex items-center">
                        <button className="text-gray-600 hover:text-gray-900 focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
