import { Card, Tag, Row, Col, Typography, Space } from 'antd';
import { LikeOutlined, EyeOutlined, MessageOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const NewsCard = ({ post }) => {
  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Card
      style={{ 
        marginBottom: 16,
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
      hoverable
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>

        <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
          {post.title}
        </Title>
        
        <Paragraph 
          style={{ 
            margin: 0, 
            fontSize: '14px',
            lineHeight: '1.5',
            color: '#666'
          }}
        >
          {truncateText(post.body)}
        </Paragraph>
        
        <Space wrap>
          {post.tags.map((tag, index) => (
            <Tag 
              key={index} 
              color="blue"
              style={{ borderRadius: 12 }}
            >
              {tag}
            </Tag>
          ))}
        </Space>
        
        <Row justify="space-between" align="middle">
          <Col>
            <Space size="large">
              <Space>
                <LikeOutlined style={{ color: '#1890ff' }} />
                <Text strong>{post.reactions?.likes || 0}</Text>
              </Space>
              <Space>
                <MessageOutlined style={{ color: '#52c41a' }} />
                <Text strong>{post.reactions?.dislikes || 0}</Text>
              </Space>
              <Space>
                <EyeOutlined style={{ color: '#faad14' }} />
                <Text strong>{post.views || 0}</Text>
              </Space>
            </Space>
          </Col>
          <Col>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              ID: {post.id}
            </Text>
          </Col>
        </Row>
      </Space>
    </Card>
  );
};

export default NewsCard;