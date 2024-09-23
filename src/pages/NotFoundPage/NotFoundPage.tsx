import { LeftCircleOutlined } from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';

import { Button, Result } from 'antd';
import { ROUTES_MAP } from 'src/_common/routes/routesMap';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(ROUTES_MAP.HOME);
  };

  return (
    <Result
      status="404"
      title="Ошибка 404"
      subTitle="Не нашли такую страничку."
      extra={
        <Button icon={<LeftCircleOutlined />} onClick={handleBack} type="primary">
          На главную страницу
        </Button>
      }
    />
  );
};
