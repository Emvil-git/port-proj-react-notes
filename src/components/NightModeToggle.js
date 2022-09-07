import { useBEM } from "../hooks/useBEM";
import { SunFill, MoonFill } from 'react-bootstrap-icons';

const NightModeToggle = () => {
    // CONSTANTS
    const [B,E] = useBEM('NightToggle')
    
    return(
        <div className={B()}>
            <div className={E('switch')}>

            </div>

            <section className={E('icons-cont')}>
                <MoonFill/>
                <SunFill/>
            </section>
        </div>
    )
}

export default NightModeToggle;