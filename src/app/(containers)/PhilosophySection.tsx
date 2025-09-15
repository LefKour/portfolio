import AnimatedText from "@/app/(components)/AnimatedText";

const PhilosophySection = () => {
    return (
        <section className='relative flex w-screen h-screen justify-center items-center blcok'>

            {/* Glow */}
            <div
                className='absolute bottom-0 w-full h-[40%] bg-radial-[at_50%_75%] from-white from-0% to-black/5
                opacity-20 to-75%'
            />

            <div className='w-full p-60'>
                <AnimatedText
                    text="I am software developer working at the intersection of technology and design, with a creative twist. From XR development to investigating novel applications of technology with data-driven."
                    delay={150}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={() => {}}
                    className="text-2xl mb-8"
                />
            </div>



        </section>
    );
}

export default PhilosophySection;