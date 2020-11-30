import React, { useContext } from 'react';
import { Form, Button, Input, Select } from 'antd';
import CharacterContext from '../../pages/Characters/Context';
import { charactersAPI } from '../../api';

import './styles.scss';
import { useForm } from 'antd/lib/form/Form';

const { Option } = Select;

type Props = {
  onSearch: (value: boolean) => void;
  loading: boolean;
};

const CharacterSearch: React.FC<Props> = ({ onSearch, loading }) => {
  const [form] = useForm();

  const { setCharacters, setPages } = useContext(CharacterContext);

  const handleSearch = () => {
    onSearch(true);

    setTimeout(() => {
      // For demo purpouses
      const execute = async () => {
        try {
          const { name, status } = form.getFieldsValue();
          const response = await charactersAPI.getByParameters({
            name,
            status,
          });

          const { next, prev } = response.info;

          setPages({ next, prev });
          setCharacters(response.results);
        } catch (err) {
          setCharacters([]);
          setPages({ next: null, prev: null });
        }

        onSearch(false);
      };

      execute();
    }, 1200);
  };

  return (
    <div id="character-search">
      <Form
        className="form"
        form={form}
        name="search"
        onFinish={handleSearch}
        initialValues={{
          name: '',
          status: '',
        }}
      >
        <Form.Item
          name="name"
          style={{
            width: '65%',
          }}
        >
          <Input
            className="input__name"
            size="large"
            placeholder="Which character are you searching?"
          />
        </Form.Item>

        <Form.Item
          name="status"
          style={{
            width: '25%',
          }}
        >
          <Select size="large" className="select">
            <Option value=""> Todos </Option>
            <Option value="Alive">Alive</Option>
            <Option value="Dead">Dead</Option>
            <Option value="unknown">unknown</Option>
          </Select>
        </Form.Item>

        <Button
          style={{
            width: '10%',
            borderTopLeftRadius: '0',
            borderBottomLeftRadius: '0',
          }}
          type="primary"
          size="large"
          htmlType="submit"
        >
          {loading ? '...' : 'Search'}
        </Button>
      </Form>
    </div>
  );
};

export default CharacterSearch;
