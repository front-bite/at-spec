import { LeftCircleOutlined } from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';

import { Button, Result } from 'antd';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Result
      status="404"
      title="Ошибка 404"
      subTitle="Не нашли такую страничку."
      extra={
        <Button icon={<LeftCircleOutlined />} onClick={handleBack} type="primary">
          Вернуться назад
        </Button>
      }
    />
  );
};
