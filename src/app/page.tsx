"use client"; // Required for React hooks (useState, useEffect, useRouter)

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'; // As you had in your original code

// --- SVG Icons ---
// Using inline components for icons is clean and fast.

const FileIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
);

const EditIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 20h9"></path>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
    </svg>
);

const TemplateIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
        <line x1="3" y1="9" x2="21" y2="9"></line>
        <line x1="9" y1="21" x2="9" y2="9"></line>
    </svg>
);

const AiIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M15 18c.3-3 .3-6 0-9m-3 9c.3-3 .3-6 0-9m-3 9c.3-3 .3-6 0-9M6 21c.3-3 .3-6 0-9m12-9c-3 0-6 0-9 0m9 3c-3 0-6 0-9 0m9 3c-3 0-6 0-9 0m9 3c-3 0-6 0-9 0"></path>
    </svg>
);

// --- Page Components ---

const Header = ({ onCtaClick }: { onCtaClick: (e: React.MouseEvent<HTMLAnchorElement>) => void }) => (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-lg">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                <a href="#" className="flex items-center space-x-2">
                    <FileIcon className="text-blue-400" />
                    <span className="font-bold text-xl text-white">ResumePro</span>
                </a>
                <a href="#" onClick={onCtaClick} className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-white rounded-lg shadow-sm transition-transform duration-200 hover:bg-gray-200 hover:scale-105">
                    Get Started
                </a>
            </div>
        </nav>
    </header>
);

const Hero = ({ onCtaClick }: { onCtaClick: (e: React.MouseEvent<HTMLAnchorElement>) => void }) => (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        {/* NOTE: Add 'float' animation to your tailwind.config.js */}
        {/* theme: {
            extend: {
                keyframes: {
                    float: {
                        '0%, 100%': { transform: 'translateY(0)' },
                        '50%': { transform: 'translateY(-10px)' },
                    },
                },
                animation: {
                    float: 'float 6s ease-in-out infinite',
                }
            }
        }
        */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-950 opacity-50"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] rounded-full bg-gradient-to-tr from-blue-600/20 to-purple-600/20 blur-3xl opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="text-center md:text-left">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-300 bg-blue-900/50 rounded-full mb-4">
                        Powered by AI
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
                        Create your job-winning resume in minutes.
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-lg mx-auto md:mx-0">
                        Our AI-powered builder helps you craft a professional resume that stands out to recruiters and lands you the interview.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <a href="#" onClick={onCtaClick} className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-blue-500/50">
                            Build My Resume
                        </a>
                        <a href="#features" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-base font-medium text-gray-100 bg-gray-800/60 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-gray-800">
                            Learn More
                        </a>
                    </div>
                </div>

                <div className="hidden md:block">
                    <div className="relative w-full max-w-md mx-auto p-6 bg-white/10 rounded-2xl shadow-2xl backdrop-blur-md border border-white/10 animate-float">
                        <div className="p-6 bg-gray-900 rounded-lg shadow-inner">
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
                                <div>
                                    <div className="h-4 bg-gray-700 rounded-md w-32 mb-2"></div>
                                    <div className="h-3 bg-gray-700 rounded-md w-48"></div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-3 bg-gray-700/50 rounded-md w-full"></div>
                                <div className="h-3 bg-gray-700/50 rounded-md w-11/12"></div>
                                <div className="h-3 bg-gray-700/50 rounded-md w-full"></div>
                                <div className="h-3 bg-gray-700/50 rounded-md w-3/4"></div>
                                <div className="h-3 bg-gray-700/50 rounded-md w-full"></div>
                                <div className="h-3 bg-gray-700/50 rounded-md w-5/6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// --- Custom Hook for fade-in ---
// This hook encapsulates the IntersectionObserver logic
const useFadeIn = (ref: React.RefObject<HTMLElement>) => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref]);
};

// A component to apply the fade-in effect
const FadeInCard = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef(null);
    useFadeIn(ref);
    return (
        <div ref={ref} className="p-8 bg-gray-900 border border-gray-800 rounded-xl shadow-lg opacity-0 transform translate-y-5 transition-all duration-700 ease-out">
            {children}
        </div>
    );
};

const Features = () => (
    <section id="features" className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                    Why build with ResumePro?
                </h2>
                <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                    We provide the tools you need to build a resume that opens doors.
                </p>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <FadeInCard>
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-900/50 text-blue-400 rounded-lg mb-4">
                        <EditIcon />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Intuitive Editor</h3>
                    <p className="mt-2 text-gray-400">
                        Our simple, step-by-step editor makes building a resume effortless. No more fighting with Word templates.
                    </p>
                </FadeInCard>

                <FadeInCard>
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-900/50 text-purple-400 rounded-lg mb-4">
                        <TemplateIcon />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Professional Templates</h3>
                    <p className="mt-2 text-gray-400">
                        Choose from a library of ATS-friendly templates, designed by experts to impress any recruiter.
                    </p>
                </FadeInCard>

                <FadeInCard>
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-pink-900/50 text-pink-400 rounded-lg mb-4">
                        <AiIcon />
                    </div>
                    <h3 className="text-xl font-semibold text-white">AI Assistant</h3>
                    <p className="mt-2 text-gray-400">
                        Get AI-powered suggestions, rephrase bullet points, and auto-generate summaries to make your resume shine.
                    </p>
                </FadeInCard>
            </div>
        </div>
    </section>
);

const DownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
);


// --- Page Components ---

// ... (Header, Hero components remain the same) ...

// --- Custom Hook for fade-in ---
// ... (useFadeIn hook remains the same) ...

// ... (FadeInCard component remains the same) ...

// ... (Features component remains the same) ...

// [NEW] This is the replacement for the Testimonial component
const HowItWorks = () => (
    <section className="py-20 sm:py-28 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                    Get your resume in 3 simple steps
                </h2>
                <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                    Our process is fast, easy, and designed to get you results.
                </p>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Step 1 */}
                <FadeInCard>
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-900/50 text-purple-400 rounded-lg mb-4">
                        <TemplateIcon />
                    </div>
                    <h3 className="text-xl font-semibold text-white">1. Select a Template</h3>
                    <p className="mt-2 text-gray-400">
                        Choose from dozens of professionally-designed, ATS-friendly templates.
                    </p>
                </FadeInCard>

                {/* Step 2 */}
                <FadeInCard>
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-900/50 text-blue-400 rounded-lg mb-4">
                        <EditIcon />
                    </div>
                    <h3 className="text-xl font-semibold text-white">2. Fill Your Details</h3>
                    <p className="mt-2 text-gray-400">
                        Our intuitive editor and AI assistant help you fill in your experience, skills, and summary.
                    </p>
                </FadeInCard>

                {/* Step 3 */}
                <FadeInCard>
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-900/50 text-green-400 rounded-lg mb-4">
                        <DownloadIcon />
                    </div>
                    <h3 className="text-xl font-semibold text-white">3. Download & Share</h3>
                    <p className="mt-2 text-gray-400">
                        Instantly download your new resume as a PDF and start applying for jobs.
                    </p>
                </FadeInCard>
            </div>
        </div>
    </section>
);


const FinalCta = ({ onCtaClick }: { onCtaClick: (e: React.MouseEvent<HTMLAnchorElement>) => void }) => (
    <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                    Ready to land your dream job?
                </h2>
                <p className="mt-4 text-lg text-gray-300">
                    Start building your resume for free. No credit card required.
                </p>
                <a href="#" onClick={onCtaClick} className="mt-8 w-full sm:w-auto inline-flex items-center justify-center px-10 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-blue-500/50">
                    Start Building Now
                </a>
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-gray-950 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center space-x-2 mb-4 md:mb-0">
                    <FileIcon className="text-blue-400 w-5 h-5" />
                    <span className="font-semibold text-white">ResumePro</span>
                </div>
                <div className="flex space-x-6">
                    <a href="#" className="text-sm text-gray-400 hover:text-white">Privacy</a>
                    <a href="#" className="text-sm text-gray-400 hover:text-white">Terms</a>
                    <a href="#" className="text-sm text-gray-400 hover:text-white">Contact</a>
                </div>
                <p className="mt-4 md:mt-0 text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} ResumePro. All rights reserved.
                </p>
            </div>
        </div>
    </footer>
);

// --- The Main Page Component ---
export default function Page() {
    const router = useRouter();
    const [showMessage, setShowMessage] = useState(false);

    const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setShowMessage(true);

        console.log("Redirecting to /resume...");
        
        // This is where you'd redirect
        setTimeout(() => {
            router.push('/resume'); // Uncomment this to enable redirection
            setShowMessage(false);
        }, 1500);
        
        // For now, just log and show message
        setTimeout(() => setShowMessage(false), 3000);
    };

    return (
        <div className="bg-gray-950 text-gray-100 font-sans antialiased overflow-x-hidden">
            <Header onCtaClick={handleCtaClick} />
            <main>
                <Hero onCtaClick={handleCtaClick} />
                <Features />
                <HowItWorks />
                <FinalCta onCtaClick={handleCtaClick} />
            </main>
            <Footer />

            {/* Message Box */}
            <div 
                className={`fixed bottom-4 right-4 z-50 p-4 bg-green-600 text-white rounded-lg shadow-lg transition-all duration-300 ${
                    showMessage ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                }`}
            >
                <p>Redirecting to the resume builder...</p>
            </div>
        </div>
    );
}