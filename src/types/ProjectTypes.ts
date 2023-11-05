export type ProjectEditPageProps = {
    params: {
        id: string;
    }
}

export type CommentType = {
    author: string;
    avatar: string;
    content: string;
    datetime: string;
}

export type TaskType = {
    title: string;
    done: boolean;
}

export type ProjectType = {
    id: string;
    comments: CommentType[];
    title: string;
    tasks: TaskType[];
}

export type ProjectEditFormProps = {
    onFinish: (values: any) => Promise<void>;
    project?: ProjectType;
}