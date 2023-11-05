import ProjectEditPage from "@/components/common/ProjectEditPage";
import {Metadata} from "next";
import {doc, getDoc} from "firebase/firestore";
import firestore from "@/config/firebase.config";
import {ProjectEditPageProps} from "@/types/ProjectTypes";


export async function generateMetadata({params: {id}}: ProjectEditPageProps): Promise<Metadata> {
    const docRef = doc(firestore, 'projects', id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    return {
        title: `${data?.title} | OUT Project`
    }
}


export default function ProjectEdit({params}: ProjectEditPageProps) {
    return <ProjectEditPage params={params}/>;
}