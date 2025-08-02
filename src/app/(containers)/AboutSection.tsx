import About from "@/app/about/page";
import AboutWidget from "@/app/(containers)/AboutWidget";

const AboutSection = () => {
    return (
        <section className='relative flex w-screen h-screen justify-center items-center p-10'>
            <AboutWidget/>
        </section>
    );
}

export default AboutSection;