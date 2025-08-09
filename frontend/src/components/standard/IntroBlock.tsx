import pilt from "@/assets/pilt.jpg"

interface IntroBlockProps {
    introText: Array<any>;
}

function IntroBlock({ introText }: IntroBlockProps) {
    return (
        <>
            <div className="flex bg-primary items-center justify-center gap-2">
                <div className="flex-1/2 px-8 ">
                    <p className="text-primary-foreground text-2xl text-left">{introText}</p>
                </div>
                <div className="flex-1/2 align">
                    <img src={pilt} alt="A bench under a tree in a park" className="ml-auto"/>
                </div>
            </div>
        </>
    )
}

export default IntroBlock;
