import { useBEM } from "../hooks/useBEM";
import { animated, useSpring } from "react-spring";
import { SunFill, MoonFill } from 'react-bootstrap-icons';

const NightModeToggle = ({theme, toggleTheme}) => {
    // CONSTANTS
    const [B,E] = useBEM('NightToggle')

    // ANIMATION STUFF
    const nightToggleAnim = useSpring({
        marginLeft: (theme === "dark") ? "2rem" : "0"
    })
    
    // METHODS
    const bTheme = () => {
        if(theme === "dark") return B("dark");
        return B()
      }
    
    const eTheme = (classStr) => {
        if(theme === "dark") return E(classStr, "dark");
        return E(classStr)
    }

    return(
        <div className={bTheme()}>
            <animated.div onClick={() => toggleTheme()} style={nightToggleAnim} className={eTheme('switch')}>

            </animated.div>

            <section className={E('icons-cont')}>
                <SunFill/>
                <MoonFill/>
            </section>
        </div>
    )
}

export default NightModeToggle;