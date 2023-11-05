import React, {useState, useEffect} from 'react';
import type {FormInstance} from 'antd';
import {Form, Input, Space, Button} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {ProjectEditFormProps} from "@/types/ProjectTypes";

const SubmitButton = ({form}: { form: FormInstance }) => {
    const [submittable, setSubmittable] = useState(false);

    const values = Form.useWatch([], form);

    useEffect(() => {
        form.validateFields({validateOnly: true}).then(
            () => {
                setSubmittable(!!form.getFieldValue('tasks')?.length);
            },
            () => {
                setSubmittable(false);
            },
        );
    }, [form, values]);

    return (
        <Button type='primary' htmlType="submit" disabled={!submittable}>
            Submit
        </Button>
    );
};

export default function ProjectEditForm({ onFinish, project }: ProjectEditFormProps) {
    const [form] = Form.useForm();

    return (
        <Form form={form} name="validateOnly" layout="vertical" autoComplete="off" onFinish={onFinish}
              className="w-full max-w-[500px]" initialValues={project || {}}>
            <Form.Item name="title" label="Name" rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item required label="Tasks">
                <Form.List name="tasks">
                    {(fields, {add, remove}) => (
                        <>
                            {fields.map(({key, name, ...restField}) => (
                                <Space key={key} style={{ width: '100%'}} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'title']}
                                        rules={[{required: true, message: 'Missing task'}]}
                                        required
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
                    <SubmitButton form={form} />
                    <Button htmlType="reset">Reset</Button>
                </Space>
            </Form.Item>
        </Form>
    );
}