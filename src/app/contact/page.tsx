import DotGrid from "@/app/(components)/DotGrid";
import PressureText from "@/app/(components)/PressureText";

const Contact = () => {
    return (<>
        <div className='w-screen h-screen flex justify-center items-center'>

            <DotGrid />

            <div
                className='flex-col items-center justify-center relative z-10 pt-0 pb-2 pr-10 pl-10 bg-white/10 rounded-xl drop-shadow-xl backdrop-blur-md z-50'>
                <PressureText
                    text='Contact'
                    flex={false}
                    alpha={false}
                    stroke={false}
                    width={true}
                    weight={true}
                    italic={true}
                    strokeColor={'#ffffff'}
                />
            </div>

        </div>
    </>);
};

export default Contact;