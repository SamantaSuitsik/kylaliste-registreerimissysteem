interface SmallIntroBlockProps {
    imageLink: string;
}

function SmallIntroBlock(props: SmallIntroBlockProps) {
    return (
        <>
            <div className="flex bg-primary items-center">
                <div>
                    <h1 className="text-nowrap w-70 text-3xl text-primary-foreground">Ürituse lisamine</h1>
                </div>
                <div className="flex-1 overflow-hidden">
                    <img src={props.imageLink} alt="Grass close up" className="h-20 w-full object-cover"/>
                </div>
            </div>
        </>
    )
}
export default SmallIntroBlock
