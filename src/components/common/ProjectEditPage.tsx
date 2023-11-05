'use client'

import React, {useState, useEffect} from 'react';
import type {FormInstance} from 'antd';
import {Form, Input, Space, Button} from "antd";
import {getAllProjects, getProject, updateProject} from "@/services/getProjects";
import useSWR from "swr";
import {useRouter} from 'next/navigation'
import {MinusCircleOutlined, PlusOutlined, ArrowLeftOutlined} from "@ant-design/icons";
import {ProjectEditPageProps} from "@/app/project/[id]/page";

const SubmitButton = ({form}: { form: FormInstance }) => {
    const [submittable, setSubmittable] = useState(false);

    // Watch all values
    const values = Form.useWatch([], form);

    useEffect(() => {
        form.validateFields({validateOnly: true}).then(
            () => {
                setSubmittable(true);
            },
            () => {
                setSubmittable(false);
            },
        );
    }, [form, values]);

    return (
        <Button htmlType="submit" disabled={!submittable}>
            Submit
        </Button>
    );
};

export default function ProjectEditPage({params: {id}}: ProjectEditPageProps) {
    const {data: projects} = useSWR("projects", getAllProjects);
    const {mutate} = useSWR("projects");
    const router = useRouter()
    const [form] = Form.useForm();

    const {data: project} = useSWR(["projects", id], () => getProject(id));
    const onFinish = async (values: any) => {
        const projectsUpdated = projects || [];
        const projectId = projectsUpdated.findIndex((p) => p.id === project?.id);
        if (projectId) {
            projectsUpdated[projectId] = {...project, ...values}
        }
        await updateProject(projectsUpdated[projectId]);
        await mutate([...projectsUpdated])
        await router.push('/projects')
    };

    return (project &&
        <Form form={form} name="validateOnly" layout="vertical" autoComplete="off" onFinish={onFinish}
              className="max-w-[500px]" initialValues={project || {}}>
            <Form.Item name="title" label="Name" rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item label="Tasks">
                <Form.List name="tasks">
                    {(fields, {add, remove}) => (
                        <>
                            {fields.map(({key, name, ...restField}) => (
                                <Space key={key} style={{display: 'flex', marginBottom: 8}} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'task']}
                                        style={{width: '100%'}}
                                        rules={[{required: true, message: 'Missing task'}]}
                                    >
                                        <Input placeholder="The task..."/>
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)}/>
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                    Add task
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form.Item>
            <Form.Item>
                <Space>
                    <SubmitButton form={form}/>
                    <Button htmlType="reset">Reset</Button>
                </Space>
            </Form.Item>
        </Form>
    );
}