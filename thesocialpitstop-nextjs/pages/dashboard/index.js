import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import SettingsDrawer from "../../components/dashboard/settings_drawer";

const SettingsPage = () => {
    return (
        <>
            <SettingsDrawer />
        </>
    )
}

export default withPageAuthRequired(SettingsPage);