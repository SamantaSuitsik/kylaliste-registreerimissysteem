import SmallIntroBlock from "@/components/standard/SmallIntroBlock.tsx";
import grass from "@/assets/libled.jpg"
import AddEventForm from "@/features/yrituse-lisamine/components/AddEventForm.tsx";

function YrituseLisamine() {
    return (
        <div className="flex flex-col gap-7">
            <SmallIntroBlock imageLink={grass} name={"Ürituse lisamine"} />
            <div className="flex justify-center items-center ">
                <AddEventForm />
            </div>
        </div>
    )
}
export default YrituseLisamine;
