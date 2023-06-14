import React from 'react';
import {
    IResourceComponentsProps,
    BaseRecord,
    HttpError,
} from '@refinedev/core';
import {
    useTable,
    List,
    EditButton,
    ShowButton,
    DeleteButton,
    DateField,
    TagField,
    useEditableTable,
    CreateButton,
} from '@refinedev/antd';
import { Table, Space, Form } from 'antd';
import { Data } from 'interfaces/post';

export const CategoryList: React.FC = () => {
    const { tableProps } = useTable<Data, HttpError>({
        syncWithLocation: true,
    });
    const { formProps } = useEditableTable();
    return (
        <List resource="Posts" headerButtons={<CreateButton />}>
            <Form {...formProps}>
                {' '}
                <Table {...tableProps} rowKey="id">
                    <Table.Column dataIndex="id" title="Id" />
                    <Table.Column dataIndex="title_kk" title="Title KK" />
                    <Table.Column dataIndex="content_kk" title="Content KK" />
                    <Table.Column
                        dataIndex="type"
                        title="Status"
                        render={(value: string) => <TagField value={value} />}
                    />
                    <Table.Column
                        dataIndex={['createdAt']}
                        title="Created At"
                        render={(value: any) => <DateField value={value} />}
                    />
                    <Table.Column
                        title="Actions"
                        dataIndex="actions"
                        render={(_, record: BaseRecord) => (
                            <Space>
                                <EditButton
                                    hideText
                                    size="small"
                                    recordItemId={record.id}
                                />
                                <ShowButton
                                    hideText
                                    size="small"
                                    recordItemId={record.id}
                                />
                                <DeleteButton
                                    hideText
                                    size="small"
                                    recordItemId={record.id}
                                />
                            </Space>
                        )}
                    />
                </Table>
            </Form>
        </List>
    );
};
