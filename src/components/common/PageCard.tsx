'use client'

import { Form, Input, Collapse, List, Avatar, Button, Dropdown, Modal, Progress, Checkbox, Typography } from "antd";
import { Comment } from '@ant-design/compatible';
import { SettingOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {useMemo, useState} from "react";
import useSWR from "swr";
import {deleteProject, getAllProjects, updateProject} from "@/services/getProjects";
import moment from 'moment';
import {useSession} from "next-auth/react";
import type { MenuProps } from 'antd';
import Link from "next/link";
import {CommentType, ProjectType} from "@/components/common/ProjectsPage";

const { TextArea } = Input;

const { Text } = Typography;

interface EditorProps {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: () => void;
    submitting: boolean;
    value: string;
}

interface CurrentComment {
    author: string;
    avatar: string;
    content: React.ReactNode;
    datetime: string;
}

const CommentList = ({ comments }: { comments: CurrentComment[] }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }: EditorProps) => (
    <>
        <Form.Item className="mb-1">
            <TextArea rows={2} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item className="mb-1">
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} >
                Add Comment
            </Button>
        </Form.Item>
    </>
);

export default function PageCard({project}: { project: ProjectType }) {
    const {data: projects, isLoading } = useSWR("projects", getAllProjects);
    const {mutate} = useSWR("projects");

    const projectsUpdated = useMemo(() => projects || [], [projects]) as ProjectType[];

    const onDelete = async (projectId: string) => {
        await deleteProject(projectId);
        const tempProjects = projectsUpdated.filter(p => p.id != projectId);
        await mutate(tempProjects)
    };

    const [openModalDelete, setOpenModalDelete] = useState(false);

    const showModal = () => {
        setOpenModalDelete(true);
    };

    const hideModal = () => {
        setOpenModalDelete(false);
    };

    const {data} = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');

    const handleSubmit = async () => {
        if (!value) return;

        setValue('');

        let newComments = [];

        const newComment = {
            author: data?.user?.name || '',
            avatar: data?.user?.image || '',
            content: value,
            datetime: moment().format(),
        };

        if (project.comments) {
            newComments = [
                ...project.comments,
                newComment
            ]
            project.comments.push()

        } else {
            newComments = [newComment]
        }

        const tempProjects = [...projectsUpdated];
        const tempProject = tempProjects.find(p => p.id === project.id);

        if (tempProject) {
            tempProject.comments = newComments;
        }

        await updateProject(tempProject);
        await mutate(tempProjects)
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };

    const currentComments = useMemo(() => {
        return project?.comments?.map((comment: CommentType) => ({...comment, content: <Text ellipsis={true}>{comment.content}</Text>, datetime: moment(comment.datetime).fromNow()})) || [];
    }, [project?.comments]) as CurrentComment[];


    const items: MenuProps['items'] = [
        {
            label: <Link key="edit" href={`/project/${project.id}`}>
                <EditOutlined  />
            </Link>,
            key: '0',
        },
        {
            label: <>
                <DeleteOutlined onClick={showModal} style={{color: 'red'}} key="delete" />
                <Modal
                    title="Warning"
                    open={openModalDelete}
                    onOk={() => {
                        onDelete(project.id);
                        hideModal();
                    }}
                    onCancel={hideModal}
                    okText="Yes"
                    cancelText="Cancel">
                    Do you Want to delete this Project?
                </Modal>
            </>,
            key: '1',
            danger: true
        },
    ];

    const [form] = Form.useForm();

    const percent = useMemo(() => {
        let percent = 0;
        if (project?.tasks?.length > 0) {
            percent = project.tasks.filter(task => task.done).length/project.tasks.length
        }

        return Math.round(percent * 100);
    }, [project?.tasks]);

    const onValuesChange = async (values: any) => {
        const tempProject = {...project};
        tempProject.tasks = project.tasks.map(task => ({...task, done: values.tasks.includes(task.title)}));
        const projectIndex = projectsUpdated.findIndex((p) => p.id === tempProject.id);
        projectsUpdated[projectIndex] = tempProject;
        await updateProject(tempProject);
        await mutate([...projectsUpdated])
    }

    const currentProject = {
        key: project.id,
        label: <Text ellipsis={true}>{project.title}</Text>,
        children: (
            <>
                {
                    project?.tasks?.length > 0 && (
                        <Form
                            form={form}
                            layout="vertical"
                            autoComplete="off"
                            onValuesChange={onValuesChange}
                        >
                            <Form.Item name="tasks" label="Tasks:">
                                <Checkbox.Group className="flex flex-col">
                                    {
                                        project?.tasks?.map((task) => (
                                            <div key={task.title}>
                                                <Checkbox value={task.title}>
                                                    <Text ellipsis={true}>{task.title}</Text>
                                                </Checkbox>
                                            </div>
                                        ))
                                    }
                                </Checkbox.Group>
                            </Form.Item>
                        </Form>
                    )
                }
                {currentComments?.length > 0 && <CommentList comments={currentComments} />}
                {data?.user?.image && data?.user?.name && <Comment
                    avatar={<Avatar src={data?.user?.image} alt={data?.user?.name}/>}
                    content={
                        <Editor
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />}
            </>
        ),
        extra: (
            <div className="flex gap-5">
                {(!!percent || project?.tasks) && <div className="w-[200px] max-sm:hidden">
                    <Progress status="active" percent={percent}/>
                </div>}
                <Dropdown menu={{ items }} trigger={['click']}>
                    <SettingOutlined />
                </Dropdown>
            </div>
        )
    }

    return (
        <Collapse collapsible="header" key={currentProject.key} items={[currentProject]} />
    )
}