import {Metadata} from "next";
import ProfilePage from "@/components/common/ProfilePage";

export const metadata: Metadata = {
    title: 'Profile | OUT Project',
}

export default function Profile() {
    return <ProfilePage />
}