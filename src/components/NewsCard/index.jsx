import { Card, Tag, Row, Col, Typography, Space } from 'antd';
import { LikeOutlined, EyeOutlined, MessageOutlined } from '@ant-design/icons';
import styles from './NewsCard.module.css';

const { Title, Text, Paragraph } = Typography;

const NewsCard = ({ post }) => {
  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Card className={styles.card} hoverable>
      <Space direction="vertical" size="middle" className={styles.spaceVertical}>
        <Title level={4} className={styles.title}>
          {post.title}
        </Title>

        <Paragraph className={styles.paragraph}>
          {truncateText(post.body)}
        </Paragraph>

        <Space wrap>
          {post.tags.map((tag, index) => (
            <Tag key={index} color="blue" className={styles.tag}>
              {tag}
            </Tag>
          ))}
        </Space>

        <Row justify="space-between" align="middle">
          <Col>
            <Space size="large">
              <Space>
                <LikeOutlined className={styles.iconLike} />
                <Text strong>{post.reactions?.likes || 0}</Text>
              </Space>
              <Space>
                <MessageOutlined className={styles.iconDislike} />
                <Text strong>{post.reactions?.dislikes || 0}</Text>
              </Space>
              <Space>
                <EyeOutlined className={styles.iconView} />
                <Text strong>{post.views || 0}</Text>
              </Space>
            </Space>
          </Col>
          <Col>
            <Text type="secondary" className={styles.postId}>
              ID: {post.id}
            </Text>
          </Col>
        </Row>
      </Space>
    </Card>
  );
};

export default NewsCard;
