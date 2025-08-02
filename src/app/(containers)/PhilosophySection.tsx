const PhilosophySection = () => {
    return (
        <section className='relative flex w-screen h-screen justify-center items-center blcok'>

            {/* Glow */}
            <div
                className='absolute bottom-0 w-full h-[40%] bg-radial-[at_50%_75%] from-white from-0% to-black/5 opacity-20 to-75%'/>

            <div className='flex justify-center items-center border border-[#555]
            backdrop-blur-md bg-linear-to-t from-black/5 to-white/5
            m-10 px-4 py-6 max-w-[80rem]'>
                <p className='text-[3rem]'>I am software developer working at the intersection of technology and design,
                    with a creative twist. From XR development to investigating novel applications of technology with
                    data-driven.</p>
            </div>
        </section>
    );
}

export default PhilosophySection;