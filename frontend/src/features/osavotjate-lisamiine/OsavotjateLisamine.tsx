import SmallIntroBlock from "@/components/standard/SmallIntroBlock.tsx";
import grass from "@/assets/libled.jpg"
import AddGuestForm from "@/features/osavotjate-lisamiine/AddGuestForm.tsx";

function OsavotjateLisamine() {

    return (
        <div className="flex flex-col gap-7">
            <SmallIntroBlock imageLink={grass} name={"Osavõtjate Lisamine"} />
            <AddGuestForm />
        </div>
    )
}
export default OsavotjateLisamine;
