import {
    NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList,
} from "@/components/ui/navigation-menu.tsx";
import logo from "@/assets/logo.svg"
import symbol from "@/assets/symbol.svg"
import {NavLink} from "react-router-dom";

function NavBar() {
    return (
        <div className="flex justify-between bg-white mb-6 p-3 rounded-sm">
            <div className="flex gap-10">
                <img src={logo} alt="Nullam logo" className="h-12" />
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavLink to="/" className={({ isActive }) => isActive ? "bg-primary rounded-sm text-primary-foreground" : ""}>
                            <NavigationMenuItem>
                                <NavigationMenuLink>
                                    <strong>AVALEHT</strong>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavLink>
                        <NavLink to="/yrituse-lisamine" className={({ isActive }) => isActive ? "bg-primary rounded-sm text-primary-foreground" : ""}>
                            <NavigationMenuItem>
                                <NavigationMenuLink>
                                    <strong>ÜRITUSE LISAMINE</strong>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavLink>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <img src={symbol} alt="Nullam symbol" className="h-12" />
        </div>
    )
}

export default NavBar
