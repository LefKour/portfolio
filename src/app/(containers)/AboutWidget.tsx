import React, { useState } from 'react';
import { useDeviceDetection } from "@/lib/hooks";
import Image from "next/image";
import ProfilePic from '@/assets/profile_pic.jpg';
import { useRouter } from 'next/navigation'
import ToggleMenu from "@/app/(components)/ToggleMenu";


const AboutWidget = () => {
    const router = useRouter();
    const [state, setActiveState ] = useState<'about' | 'expertise'>('about');
    const [topic, setTopic] = useState<'immersive-media' | 'full-stack' | 'data-driven'>('immersive-media');

    const { isMobile } = useDeviceDetection();

    return(<>
            <div className='w-full h-full flex flex-col items-center border border-[#555] p-6 gap-6
            backdrop-blur-md bg-linear-to-t from-black/5 to-white/5'>

                {/* State Switch */}
                <div className='flex rounded-lg overflow-hidden border'>
                    <button className={`border-r px-2 py-1
                    backdrop-blur-md bg-linear-to-t from-black/5 to-white/5
                    ${state === 'about' ?
                        'bg-linear-to-t from-black/5 to-white/20' :
                        'bg-linear-to-t from-black/5 to-white/5'}
                        hover:bg-white/20 transition`}
                            onClick={() => {
                                if (state !== 'about')
                                    setActiveState('about');
                            }}
                    >
                        about
                    </button>
                    <button className={`px-2 py-1
                    backdrop-blur-md bg-linear-to-t from-black/5 to-white/5
                    ${state === 'expertise' ?
                        'bg-linear-to-t from-black/5 to-white/20' :
                        'bg-linear-to-t from-black/5 to-white/5'}
                        hover:bg-white/20 transition`}
                            onClick={() => {
                                if (state !== 'expertise')
                                    setActiveState('expertise');
                            }}
                    >
                        expertise
                    </button>
                </div>

                {state === 'about' ?
                    <div className='flex justify-between items-start w-full h-full p-6 gap-10'>

                        {/* Profile Pic */}
                        <div className='relative h-full w-full border border-white'>
                            <Image src={ProfilePic} alt={'profile picture'} layout={'fill'} objectFit={'cover'} />
                        </div>

                        {/* About Section */}
                        <div className='flex flex-col h-full w-full gap-10'>
                            {/* Text */}
                            <div className='flex flex-col gap-6'>
                                <p className='text-[1.25rem]'>
                                    I’m Eleftherios Kourkopoulos, a software developer
                                    based in London. I leverage data to construct data-driven solution in the space of
                                    immersive media and full-stack web development.
                                </p>
                                <p className='text-[1.25rem]'>
                                    I work at the intersection of technology and creativity to bring ambitious projects
                                    to life. With a background in the AEC industry, I integrate structured thinking and
                                    spatial intelligence in my work.
                                </p>
                                <p className='text-[1.25rem]'>
                                    I’m currently engaged as:
                                </p>
                            </div>

                            {/* Tags */}
                            <div
                                className='flex flex-col gap-6'>
                                <div
                                    data-cursor-target
                                    className='w-fit flex justify-center items-center px-4 py-2 border border-white
                                backdrop-blur-md bg-linear-to-t from-white/5 to-white/10 transition
                                hover:from-white/10 hover:to-white/20
                                '>
                                    <p><strong>Design Systems Analyst</strong> @ Applied R+D | Foster + Partners</p>
                                </div>
                                <div
                                    data-cursor-target
                                    className='w-fit flex justify-center items-center px-4 py-2 border border-white
                                backdrop-blur-md bg-linear-to-t from-white/5 to-white/10 transition
                                hover:from-white/10 hover:to-white/20
                                '>
                                    <p><strong>Software Development Engineer</strong> @ McNeel Europe</p>
                                </div>
                                <div
                                    data-cursor-target
                                    className='w-fit flex justify-center items-center px-4 py-2 border border-white
                                backdrop-blur-md bg-linear-to-t from-white/5 to-white/10 transition
                                hover:from-white/10 hover:to-white/20
                                '>
                                    <p><strong>Associate Lecturer</strong> @ Creative Computing Institute | UAL</p>
                                </div>

                                <button
                                    className='flex gap-2 w-fit border border-white rounded-full bg-white/20 px-4 py-1
                                    justify-self-end self-end mt-10'
                                    onClick={() => router?.push('/about')}
                                >
                                    <p>learn more</p>
                                    <div className='fill-white scale-[100%]'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                                            <path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z"/>
                                        </svg>
                                    </div>
                                </button>

                            </div>
                        </div>
                    </div> :
                    <div className='flex justify-between items-center w-full h-full'>
                        {/* Toggle Menu */}
                        <ToggleMenu buttons={[
                            {
                                title: 'immersive media + xr',
                                value: 'immersive-media'
                            },
                            {
                                title: 'full-stack web development',
                                value: 'full-stack'
                            },
                            {
                                title: 'data-driven solutions',
                                value: 'data-driven'
                            }]}
                            activeOption={topic}
                            onClick={(topic)=> setTopic(topic)}
                        />

                        {/* Content Box */}
                        <div className='h-full border border-[#555] w-[50%] flex flex-col justify-start items-center p-6
                        backdrop-blur-md bg-linear-to-t from-black/5 to-white/5'>
                            {topic === 'immersive-media' &&
                                <>
                                    <div className='max-w-[75%] mb-6'>
                                        <h3 className='text-[5rem] text-center'>immersive media + xr</h3>
                                    </div>
                                    <div className='border border-[#555] w-full' />
                                    <div className='p-6 text-center flex flex-col gap-6'>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ultrices
                                            iaculis lacus, eu ornare odio porttitor nec. Donec mauris ante, interdum
                                            varius tortor at, pellentesque vulputate leo. Vivamus faucibus diam est, a
                                            dapibus dolor dignissim tristique. Mauris vestibulum, augue eget faucibus
                                            sodales, ex nulla iaculis diam, ac cursus purus odio id risus. Nunc vel
                                            risus nisi. Donec at mollis orci. Phasellus hendrerit, odio eget finibus
                                            semper, nunc nisl vestibulum erat, a ultrices dolor nunc vitae nisl. Cras
                                            convallis pulvinar dolor, a rutrum enim. Vivamus eget enim posuere,
                                            tincidunt risus at, tincidunt ex.
                                        </p>

                                        <p>
                                            Phasellus euismod mattis porttitor. Nam lobortis ornare euismod. Morbi
                                            vehicula sit amet tortor gravida suscipit. Aenean euismod est sit amet
                                            congue faucibus. Nulla id urna at est vehicula ornare. Suspendisse maximus
                                            quis massa quis lobortis. Suspendisse sagittis eleifend cursus. Ut eu mi
                                            lacus. Donec vitae mattis odio, eu tincidunt urna. Mauris nisi erat,
                                            dignissim ac facilisis et, dignissim id ipsum.
                                        </p>

                                        <p>
                                            Nunc ut suscipit lacus. Aenean lobortis ante nibh, a finibus lacus consectetur sed. Donec iaculis a dui id sagittis. Suspendisse tortor libero, elementum sed consectetur et, egestas in odio. Mauris scelerisque purus eget lacinia sollicitudin. Nulla nunc est, commodo a ligula et, congue lacinia enim. Vestibulum et aliquet sem, ullamcorper cursus elit. Vivamus eget dignissim est. Cras ac interdum velit. Duis dolor neque, semper id congue id, pulvinar sit amet odio.
                                        </p>

                                    </div>
                                </>

                            }

                            {topic === 'full-stack' &&
                                <>
                                    <div className='max-w-[75%] mb-6'>
                                        <h3 className='text-[5rem] text-center'>full-stack web development</h3>
                                    </div>
                                    <div className='border border-[#555] w-full' />
                                    <div className='p-6 text-center flex flex-col gap-6'>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ultrices
                                            iaculis lacus, eu ornare odio porttitor nec. Donec mauris ante, interdum
                                            varius tortor at, pellentesque vulputate leo. Vivamus faucibus diam est, a
                                            dapibus dolor dignissim tristique. Mauris vestibulum, augue eget faucibus
                                            sodales, ex nulla iaculis diam, ac cursus purus odio id risus. Nunc vel
                                            risus nisi. Donec at mollis orci. Phasellus hendrerit, odio eget finibus
                                            semper, nunc nisl vestibulum erat, a ultrices dolor nunc vitae nisl. Cras
                                            convallis pulvinar dolor, a rutrum enim. Vivamus eget enim posuere,
                                            tincidunt risus at, tincidunt ex.
                                        </p>

                                        <p>
                                            Phasellus euismod mattis porttitor. Nam lobortis ornare euismod. Morbi
                                            vehicula sit amet tortor gravida suscipit. Aenean euismod est sit amet
                                            congue faucibus. Nulla id urna at est vehicula ornare. Suspendisse maximus
                                            quis massa quis lobortis. Suspendisse sagittis eleifend cursus. Ut eu mi
                                            lacus. Donec vitae mattis odio, eu tincidunt urna. Mauris nisi erat,
                                            dignissim ac facilisis et, dignissim id ipsum.
                                        </p>

                                        <p>
                                            Nunc ut suscipit lacus. Aenean lobortis ante nibh, a finibus lacus consectetur sed. Donec iaculis a dui id sagittis. Suspendisse tortor libero, elementum sed consectetur et, egestas in odio. Mauris scelerisque purus eget lacinia sollicitudin. Nulla nunc est, commodo a ligula et, congue lacinia enim. Vestibulum et aliquet sem, ullamcorper cursus elit. Vivamus eget dignissim est. Cras ac interdum velit. Duis dolor neque, semper id congue id, pulvinar sit amet odio.
                                        </p>

                                    </div>
                                </>
                            }

                            {topic === 'data-driven' &&
                                <>
                                    <div className='max-w-[75%] mb-6'>
                                        <h3 className='text-[5rem] text-center'>data-driven solutions</h3>
                                    </div>
                                    <div className='border border-[#555] w-full' />
                                    <div className='p-6 text-center flex flex-col gap-6'>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ultrices
                                            iaculis lacus, eu ornare odio porttitor nec. Donec mauris ante, interdum
                                            varius tortor at, pellentesque vulputate leo. Vivamus faucibus diam est, a
                                            dapibus dolor dignissim tristique. Mauris vestibulum, augue eget faucibus
                                            sodales, ex nulla iaculis diam, ac cursus purus odio id risus. Nunc vel
                                            risus nisi. Donec at mollis orci. Phasellus hendrerit, odio eget finibus
                                            semper, nunc nisl vestibulum erat, a ultrices dolor nunc vitae nisl. Cras
                                            convallis pulvinar dolor, a rutrum enim. Vivamus eget enim posuere,
                                            tincidunt risus at, tincidunt ex.
                                        </p>

                                        <p>
                                            Phasellus euismod mattis porttitor. Nam lobortis ornare euismod. Morbi
                                            vehicula sit amet tortor gravida suscipit. Aenean euismod est sit amet
                                            congue faucibus. Nulla id urna at est vehicula ornare. Suspendisse maximus
                                            quis massa quis lobortis. Suspendisse sagittis eleifend cursus. Ut eu mi
                                            lacus. Donec vitae mattis odio, eu tincidunt urna. Mauris nisi erat,
                                            dignissim ac facilisis et, dignissim id ipsum.
                                        </p>

                                        <p>
                                            Nunc ut suscipit lacus. Aenean lobortis ante nibh, a finibus lacus consectetur sed. Donec iaculis a dui id sagittis. Suspendisse tortor libero, elementum sed consectetur et, egestas in odio. Mauris scelerisque purus eget lacinia sollicitudin. Nulla nunc est, commodo a ligula et, congue lacinia enim. Vestibulum et aliquet sem, ullamcorper cursus elit. Vivamus eget dignissim est. Cras ac interdum velit. Duis dolor neque, semper id congue id, pulvinar sit amet odio.
                                        </p>

                                    </div>
                                </>
                            }
                        </div>
                    </div>}

            </div>
        </>
    );
};

export default AboutWidget;