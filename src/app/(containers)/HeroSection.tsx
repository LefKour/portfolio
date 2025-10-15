import {useRouter} from "next/navigation";
import HighlightSpan from "@/app/(components)/HighlighSpan";

const HeroSection = () => {
    const router = useRouter();

    return (
        // Banner
        <div className="flex flex-col gap-4 items-start">
            <section data-tag={"hero-section"}
                     className='relative flex flex-col items-center p-0 mt-35 text-wrap '>
                <p className={"w-full text-3xl font-medium text-neutral-400"}>
                    I'm a software <HighlightSpan>software developer</HighlightSpan>,
                    <HighlightSpan> researcher</HighlightSpan> and
                    <HighlightSpan> lecturer </HighlightSpan>
                    exploring the intersection of
                    <HighlightSpan> computer graphics for immersive media </HighlightSpan>,
                    <HighlightSpan> fullstack web development </HighlightSpan> and
                    <HighlightSpan> data-intensive applications </HighlightSpan>.
                </p>
            </section>

            <button className={"inline-flex border border-neutral-500 px-4 py-2 " +
                "rounded-sm text-lg hover:bg-white/20 transition cursor-pointer"}
                    onClick={() => {router.push("/about")}}>learn more</button>
        </div>
    );
};

export default HeroSection;

