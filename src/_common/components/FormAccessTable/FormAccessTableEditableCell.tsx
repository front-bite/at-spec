import type { ReactNode } from 'react';
import type React from 'react';

import { Form, Select } from 'antd';
import type { IFormAccessTableRow } from 'src/_common/components/FormAccessTable/FormAccessTableSlice';
import { ACTIONS_ON_FORM_OPTIONS, PERMISSOON_CODE_OPTIONS } from 'src/_common/components/FormAccessTable/consts';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  record: IFormAccessTableRow;
  index: number;
}

const inputElements: { [key: string]: ReactNode } = {
  actionsOnForm: <Select options={ACTIONS_ON_FORM_OPTIONS} size="small" showSearch allowClear />,
  permissionCode: <Select options={PERMISSOON_CODE_OPTIONS} size="small" showSearch allowClear />,
};

export const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  children,
  ...restProps
}) => {
  const inputElement = inputElements[dataIndex];

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Заполните поле "${title}"`,
            },
          ]}
        >
          {inputElement}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
