import { UploadOutlined } from '@ant-design/icons';

import type React from 'react';
import { useState } from 'react';

import { Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { v4 as uuidv4 } from 'uuid';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const MockupImageLoader: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: uuidv4(),
      name: 'img',
      status: 'done',
      url: 'https://i.pinimg.com/originals/16/d0/2b/16d02bef703bcdddeb21c59f133af05e.jpg',
    },
    {
      uid: uuidv4(),
      name: 'img',
      status: 'done',
      url: 'https://i.pinimg.com/originals/61/06/1d/61061dd7489744c0f1d0b5a9a5a1d6c9.png',
    },
    {
      uid: uuidv4(),
      name: 'img',
      status: 'done',
      url: 'https://i.pinimg.com/originals/eb/a6/5f/eba65f7f63340a688e2f7296107ba034.png',
    },
    {
      uid: uuidv4(),
      name: 'img',
      status: 'done',
      url: 'https://user-images.githubusercontent.com/507615/209472919-6f7e8561-be8c-4b0b-9976-eb3c692aa20a.png',
    },
  ]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: 'none', cursor: 'pointer' }} type="button">
      <UploadOutlined />
      <div style={{ marginTop: 8 }}>Загрузить макет</div>
    </button>
  );
  return (
    <>
      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};
