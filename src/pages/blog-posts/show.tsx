import { Show, MarkdownField } from '@refinedev/antd';
import { Badge, Card, Col, Row, Typography } from 'antd';
import { useShow, useOne } from '@refinedev/core';
import { Attributes } from 'interfaces/post';
import { ClockCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export const BlogPostShow: React.FC = () => {
    const { queryResult } = useShow<Attributes>();
    const { data, isLoading } = queryResult;
    const record = data?.data;
    const date = new Date(record?.createdAt || '');
    return (
        <Show isLoading={isLoading}>
            <Row gutter={[8, 12]}>
                <Col span={12}>
                    <Card
                        title="Qaraqalpaq tilinde"
                        bordered={false}
                        style={{ width: 500 }}
                        hoverable={true}
                    >
                        {/* <Title level={5}>Id</Title>
                <Text type="success" keyboard>
                    {record?.id}
                </Text> */}

                        <Title level={5}>Title</Title>
                        <Text type="success" keyboard>
                            {record?.title_kk}
                        </Text>

                        <Title level={5}>Content</Title>
                        <Badge.Ribbon
                            text={<div>{date.toLocaleDateString()}</div>}
                            color="pink"
                        >
                            {record?.content_kk}
                        </Badge.Ribbon>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card
                        title="O'zbek tilida"
                        bordered={false}
                        style={{ width: 500 }}
                        hoverable={true}
                    >
                        {/* <Title level={5}>Id</Title>
                <Text type="success" keyboard>
                    {record?.id}
                </Text> */}

                        <Title level={5}>Title</Title>
                        <Text type="success" keyboard>
                            {record?.title_uz}
                        </Text>

                        <Title level={5}>Content</Title>
                        <Badge.Ribbon
                            text={<div>{date.toLocaleDateString()}</div>}
                            color="pink"
                        >
                            {record?.content_uz}
                        </Badge.Ribbon>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card
                        title="Русский язык"
                        bordered={false}
                        style={{ width: 500 }}
                        hoverable={true}
                    >
                        {/* <Title level={5}>Id</Title>
                <Text type="success" keyboard>
                    {record?.id}
                </Text> */}

                        <Title level={5}>Title</Title>
                        <Text type="success" keyboard>
                            {record?.title_ru}
                        </Text>

                        <Title level={5}>Content</Title>
                        <Badge.Ribbon
                            text={<div>{date.toLocaleDateString()}</div>}
                            color="pink"
                        >
                            {record?.content_ru}
                        </Badge.Ribbon>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card
                        title="English"
                        bordered={false}
                        style={{ width: 500 }}
                        hoverable={true}
                    >
                        {/* <Title level={5}>Id</Title>
                <Text type="success" keyboard>
                    {record?.id}
                </Text> */}

                        <Title level={5}>Title</Title>
                        <Text type="success" keyboard>
                            {record?.title_en}
                        </Text>

                        <Title level={5}>Content</Title>
                        <Badge.Ribbon
                            text={<div>{date.toLocaleDateString()}</div>}
                            color="pink"
                        >
                            {record?.content_en}
                        </Badge.Ribbon>
                    </Card>
                </Col>
            </Row>
        </Show>
    );
};
