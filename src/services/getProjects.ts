'use client'

import {addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc} from 'firebase/firestore';
import firestore from '@/config/firebase.config';
import useSWR from "swr";
import {useRouter} from "next/navigation";

export const getAllProjects = async () => {
    const querySnapshot = await getDocs(collection(firestore, 'projects'));

    return querySnapshot.docs.map((doc) => {
        return {
            id: doc.id,
            ...doc.data()
        };
    });

}

export const getProject = async (projectId: string) => {
    const docRef = doc(firestore, 'projects', projectId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

export const updateProject = async (data: any) => {
    console.log('here data', data)
    return await updateDoc(doc(firestore, 'projects', data.id), data)
}

export const createProject = async (data: any) => {
    return await addDoc(collection(firestore, 'projects'), data)
}

export const deleteProject = async (projectId: string) => {
    return await deleteDoc(doc(firestore, 'projects', projectId));
}


export function useProjects() {
    const {data: projects, isLoading} = useSWR("projects", getAllProjects);
    const {mutate} = useSWR("projects");

    return {
        projects,
        mutate,
        isLoading
    }
}