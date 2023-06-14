import React, { useState } from 'react';
import { IResourceComponentsProps } from '@refinedev/core';

import { Create, useSelect } from '@refinedev/antd';

import { Form, Input, Radio, RadioChangeEvent, Select } from 'antd';

import MDEditor from '@uiw/react-md-editor';

import { Attributes, Post } from 'interfaces/post';
import FormItem from 'antd/es/form/FormItem';
import { useForm } from '@refinedev/react-hook-form';
const optionsTitle = [
    { label: 'Qaraqalpaq', value: 'title_kk' },
    { label: `O'zbek`, value: 'title_uz' },
    { label: 'Russian', value: 'title_ru' },
    { label: 'English', value: 'title_en' },
];
const optionsContent = [
    {
        label: 'Qaraqalpaq',
        value: 'content_kk',
    },
    { label: `O'zbek`, value: 'content_uz' },
    { label: 'Russian', value: 'content_ru' },
    { label: 'English', value: 'content_en' },
];
export const BlogPostCreate: React.FC<IResourceComponentsProps> = () => {
    const [value3, setValue3] = useState(optionsTitle[0].label);
    const [value4, setValue4] = useState(optionsContent[0].label);
    const {
        saveButtonProps,
        register,
        refineCore: { onFinish, formLoading, queryResult },
        handleSubmit,
        formState,
        getFieldState,
    } = useForm<Partial<Attributes>>();

    const { selectProps: categorySelectProps } = useSelect<Post>({
        resource: 'posts-plural',
    });
    const onChangeTitle = ({ target: { value } }: RadioChangeEvent) => {
        setValue3(value);
    };
    const onChangeContent = ({ target: { value } }: RadioChangeEvent) => {
        setValue4(value);
    };
    console.log(formLoading);
    return (
        <Form onFinish={onFinish} layout="vertical">
            <FormItem label="Title Language">
                <Radio.Group
                    options={optionsTitle}
                    onChange={onChangeTitle}
                    value={value3}
                    optionType="button"
                />
            </FormItem>

            <Form.Item
                label="Title"
                name={register(value3).name}
                // name="title"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input onChange={register(value3).onChange} />
            </Form.Item>
            <FormItem label="Content Language">
                <Radio.Group
                    options={optionsContent}
                    onChange={onChangeContent}
                    value={value4}
                    optionType="button"
                />
            </FormItem>

            <Form.Item
                label="Status"
                // name="status"
                {...register('type')}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select
                    options={[
                        {
                            label: 'Published',
                            value: 'published',
                        },
                        {
                            label: 'Draft',
                            value: 'draft',
                        },
                        {
                            label: 'Planned',
                            value: 'planned',
                        },
                    ]}
                />
            </Form.Item>
            <Form.Item
                label="Content"
                {...register(value4)}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <MDEditor data-color-mode="light" />
            </Form.Item>
            <button type="submit">Save</button>
        </Form>
    );
};
