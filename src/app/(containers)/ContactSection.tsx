'use client'
import GitHubIcon from '@/assets/github-icon.png';
import LinkedInIcon from '@/assets/linkedin-icon.png';
import Image from "next/image";
import React from "react";
import { useRouter } from 'next/navigation'

const ContactSection = () => {
    const router = useRouter();

    return (
        <section className='relative flex flex-col w-screen p-6'>
            <div
                className='absolute bottom-0 w-full h-full bg-radial-[at_50%_75%] from-white from-0% to-black/5 opacity-20 to-75% pointer-events-none'/>

            {/* Head */}
            <div className=''>
                <h2 className='text-[3rem]'>Contact</h2>
                <p>
                    If you a question to ask, some feedback to share or an exciting opportunity to explore, let’s
                    connect!
                </p>
            </div>

            <div className='border border-[#555] my-10'/>

            {/*Connect Section*/}
            <div className='flex w-full px-10 justify-between'>
                <div className='flex gap-10 justify-center items-center'>
                    <h3 className='text-[1.25rem]'>Connect</h3>
                    <p className='w-fit max-w-[25rem]'>If you would like to know what I’m up to, you can do that via the
                        following links.</p>
                </div>

                <div className='flex gap-6 justify-center items-center select-auto'>
                    <button
                        className='flex gap-2 border border-white rounded-full px-4 py-2 bg-white/10 hover:bg-white/20'
                        onClick={() => window.open('https://github.com/LefKour')}
                    >
                        <Image src={GitHubIcon} alt={'GitHub Icon'}/>
                        GitHub
                    </button>
                    <button
                        className='flex gap-2 border border-white rounded-full px-4 py-2 bg-white/10 hover:bg-white/20'
                        onClick={() => window.open('https://www.linkedin.com/in/eleftherios-kourkopoulos-b27b32b8/')}
                    >
                        <Image src={LinkedInIcon} alt={'LinkedIn Icon'}/>
                        LinkedIn
                    </button>
                </div>
            </div>

            <div className='border border-[#555] my-10'/>

            {/*Contact Section*/}

            <div className='flex w-full px-10 justify-between'>
                <div className='flex gap-10 justify-center items-center'>
                    <h3 className='text-[1.25rem]'>Get in touch</h3>
                    <p className='w-fit max-w-[25rem]'>Don’t hesitate to get in touch. Always open to making new connections.</p>
                </div>

                <div className='flex gap-6 justify-center items-center select-auto'>
                    <button
                        className='flex gap-2 w-fit border border-white rounded-full bg-white/20 px-4 py-1
                                    justify-self-end self-end '
                        onClick={() => router?.push('/contact')}
                    >
                        <p>get in touch</p>
                        <div className='fill-white scale-[100%]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                                <path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z"/>
                            </svg>
                        </div>
                    </button>
                </div>
            </div>

            <div className='border border-[#555] my-10'/>

        </section>
    );
}

export default ContactSection;