import {
    NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList,
} from "@/components/ui/navigation-menu.tsx";
import logo from "@/assets/logo.svg"
import symbol from "@/assets/symbol.svg"

function NavBar() {
    return (
        <>
            <div className="flex justify-between bg-white mb-6">
                <div className="flex gap-10">
                    <img src={logo} alt="Nullam logo" className="h-12" />
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink><strong>AVALEHT</strong></NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink><strong>ÜRITUSE LISAMINE</strong></NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <img src={symbol} alt="Nullam symbol" className="h-12" />
            </div>
        </>
    )
}

export default NavBar
