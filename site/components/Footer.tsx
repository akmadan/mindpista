import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="text-2xl font-bold tracking-tight">
                            <span className="text-brand-orange">Mind</span>
                            <span className="text-brand-blue">Pista</span>
                        </Link>
                        <p className="mt-4 text-gray-500 text-sm">
                            Making mental wellness accessible, colorful, and part of your daily life.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Product</h3>
                        <ul className="space-y-3">
                            <li><Link href="#therapy" className="text-gray-500 hover:text-brand-orange transition-colors">Therapy</Link></li>
                            <li><Link href="#yoga" className="text-gray-500 hover:text-brand-yellow transition-colors">Yoga</Link></li>
                            <li><Link href="#meditation" className="text-gray-500 hover:text-brand-teal transition-colors">Meditation</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Company</h3>
                        <ul className="space-y-3">
                            <li><Link href="#" className="text-gray-500 hover:text-brand-blue transition-colors">About Us</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-brand-blue transition-colors">Careers</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-brand-blue transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Legal</h3>
                        <ul className="space-y-3">
                            <li><Link href="#" className="text-gray-500 hover:text-gray-900 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="text-gray-500 hover:text-gray-900 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-100 pt-8 text-center">
                    <p className="text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} MindPista. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
