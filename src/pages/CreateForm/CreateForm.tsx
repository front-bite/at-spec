import { Alert, Card, Divider, Flex, Typography } from 'antd';
import { DragDropEditDrawer } from 'src/_common/components/DragDropEdit/DragDropEditDrawer';
import { EditDrawer } from 'src/_common/components/EditDrawer/EditDrawer';
import { FormAccessTable } from 'src/_common/components/FormAccessTable/FormAccessTable';
import { FrontendTable } from 'src/_common/components/FrontendTable/FrontendTable';
import { HintTag } from 'src/_common/components/HintTag/HintTag';
import { LoadingScreenForm } from 'src/_common/components/ListWithConditions/LoadingScreenForm';
import { MockupImageLoader } from 'src/_common/components/MockupImageLoader/MockupImageLoader';

const { Title, Text } = Typography;

/** Страница формы создания операции */
export const CreateOperationForm = () => {
  return (
    <>
      <Card
        title="Платёж со счёта Эскроу (Создание/Редактирование)"
        extra={<HintTag tagText="UI SPEC" hintText="Спецификация предназначенная для Fronend разработки" />}
      >
        <Title level={4}>Основное положение</Title>
        <Title level={5}>1.1 Назначение</Title>
        <Text>Служит для отображения факта осуществления платежа со счёта эскроу</Text>
        <Title level={5}>1.2 Доступ</Title>
        <FormAccessTable />
        <Divider />
        <Title level={4}>2. Нефункциональные требования</Title>
        <Title level={5}>2.1 Макет экранной формы</Title>
        <MockupImageLoader />
        <Divider />
        <Title level={4}>3. Функциональные требования</Title>
        <Title level={5}>3.1 Загрузка экранной формы</Title>
        <LoadingScreenForm />
        <Divider />
        <Title level={4}>3.2 Заполнение экранной формы данными</Title>
        <Card
          size="small"
          title="EscrowPaymentOperation"
          extra={
            <Flex>
              <HintTag tagText="CREATE/EDIT FORM" hintText="Форма создания/редактирования Платежа со счёта эскроу" />
              <HintTag
                tagText="FRONTEND TABLE FORM"
                hintText="Таблица формы создания/редактирования предназначенная для Frontend разработки. Правила заполнения, компоновка UI элементов, логика, доступность. Карточки форм разделены на табы."
              />
            </Flex>
          }
        >
          <Flex gap={16} vertical>
            <Alert message="Заполнение экранной формы данными происходит с помощью сервиса get" type="info" showIcon />
            <FrontendTable />
          </Flex>
        </Card>
      </Card>
      <EditDrawer />
      <DragDropEditDrawer />
    </>
  );
};
