'use client'

import React, {useState, useEffect} from 'react';
import type {FormInstance} from 'antd';
import {Form, Input, Space, Button} from "antd";
import {createProject, getAllProjects} from "@/services/getProjects";
import {useRouter} from "next/navigation";
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import useSWR from "swr";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'OUT Project',
}

const SubmitButton = ({form}: { form: FormInstance }) => {
    const [submittable, setSubmittable] = useState(false);

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

export default function ProjectPage() {
    const {data: projects, isLoading} = useSWR("projects", getAllProjects);
    const {mutate} = useSWR("projects");
    const router = useRouter()
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        const newProject = await createProject(values);
        await mutate([...(projects || []), {...values, id: newProject.id}])
        await router.push('/projects')
    };

    return (
        <Form form={form} name="validateOnly" layout="vertical" autoComplete="off" onFinish={onFinish}
              className="w-full max-w-[500px]">
            <Form.Item name="title" label="Name" rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item required className="w-full" label="Tasks">
                <Form.List name="tasks">
                    {(fields, {add, remove}) => (
                        <>
                            {fields.map(({key, name, ...restField}) => (
                                <Space key={key} style={{display: 'flex', marginBottom: 8}} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'title']}
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