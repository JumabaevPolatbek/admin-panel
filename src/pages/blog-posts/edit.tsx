import { Edit, useForm as useFormAnt } from '@refinedev/antd';
import MDEditor from '@uiw/react-md-editor';
import { useForm } from '@refinedev/react-hook-form';
// import { Edit, useForm, useSelect } from '@refinedev/antd';
import { Form, Input, Radio, RadioChangeEvent, Select } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Attributes, Post } from 'interfaces/post';
import { useState } from 'react';
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
export const BlogPostEdit: React.FC = () => {
    const [value3, setValue3] = useState(optionsTitle[0].label);
    const [value4, setValue4] = useState(optionsContent[0].label);

    const { formProps, queryResult, saveButtonProps } =
        useFormAnt<Attributes>();
    const postData = queryResult?.data?.data;

    const {
        register,
        handleSubmit,
        refineCore: { onFinish, formLoading, queryResult: queryAsResult },
    } = useForm<Partial<Attributes>>();
    const onChangeTitle = ({ target: { value } }: RadioChangeEvent) => {
        setValue3(value);
    };
    const onChangeContent = ({ target: { value } }: RadioChangeEvent) => {
        setValue4(value);
    };
    const { form } = formProps;
    console.log(formProps);
    console.log(postData);
    return (
        <Edit
            saveButtonProps={saveButtonProps}
            resource={`post id: ${postData?.id}`}
        >
            <Form {...formProps} onFinish={onFinish} layout="vertical">
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
                    // name={for}
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
                    name="status"
                    // {...register('type')}
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
                {/* <button type="submit">Save</button> */}
            </Form>
        </Edit>
    );
};
