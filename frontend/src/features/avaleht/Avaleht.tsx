import NavBar from "@/components/standard/NavBar.tsx";
import IntroBlock from "@/components/standard/IntroBlock.tsx";
import EventsTable from "@/features/avaleht/components/EventsTable.tsx";
import Footer from "@/components/standard/Footer.tsx";

function Avaleht() {
    return (
        <>
            <div className="min-h-screen flex flex-col justify-between">
                <NavBar />
                <IntroBlock introText={["Lorem ipsum dolor sit ", <strong key="strong1">amet</strong>, ", consectetur adipiscing elit. Sed dapibus, ", <strong key="strong2">felis eget dignissim fermentum </strong>, ", magna massa ", <strong key="strong3">pretium</strong>, " mauris, gravida varius ", <strong key="strong4">nunc sapien </strong>, " at libero. "]}/>
                <div className="flex gap-5 mt-7 flex-grow">
                    <div className="flex-1/2">
                        <EventsTable />
                    </div>
                    <div className="flex-1/2">
                        <EventsTable />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}
export default Avaleht;
