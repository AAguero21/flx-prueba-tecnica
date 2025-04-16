import React, { useState, useEffect } from "react";
import {Form, Input, Select, Spin, InputNumber, Row, Col, message} from "antd";

const { Option } = Select;

export default function UserForm({ initialValues, onSubmit, usuarios }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Validación personalizada para el username
  const validateUsername = async (_, value) => {
    if (!value) return Promise.resolve();

    const normalizedValue = value.trim().toLowerCase();

    if (usuarios && Array.isArray(usuarios)) {
      const usernameExists = usuarios.some(
        (user) =>
          user.username.trim().toLowerCase() === normalizedValue &&
          (!initialValues || user.id !== initialValues.id)
      );
      if (usernameExists) {
        return Promise.reject("El nombre de usuario ya existe");
      }
    }

    return Promise.resolve();
  };

  // Reglas para nombre y apellido
  const nameRules = [
    { required: true, message: "Este campo es obligatorio" },
    {
      pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/,
      message: "Solo letras y espacios",
    },
  ];

  // Envío del formulario
  const handleFinish = (values) => {
    console.log("Formulario enviado con valores:", values);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSubmit(values);
      message.success("Usuario guardado correctamente");
      form.resetFields();
    }, 1000);
  };

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  return (
    <Spin spinning={loading}>
      <Form
        id="user-form"
        layout="vertical"
        form={form}
        initialValues={initialValues || { status: "inactive" }}
        onFinish={handleFinish}
        onFinishFailed={() => setLoading(false)}
        style={{ padding: "12px 6px" }}
        disabled={loading}
      >
        <Row gutter={[24, 16]}>
          <Col span={12}>
            <Form.Item
              label="Nombre de usuario"
              name="username"
              rules={[
                { required: true, message: "Por favor ingresa el Nombre de usuario" },
                { validator: validateUsername },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>

            <Form.Item label="Nombre" name="name" rules={nameRules}>
              <Input
                placeholder="Nombre"
                onKeyPress={(e) => {
                  const char = e.key;
                  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/.test(char)) {
                    e.preventDefault();
                  }
                }}
                onPaste={(e) => {
                  const pastedText = e.clipboardData.getData("text");
                  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(pastedText)) {
                    e.preventDefault();
                  }
                }}
              />
            </Form.Item>

            <Form.Item
              label="Edad"
              name="age"
              rules={[
                { required: true, message: "Por favor ingresa la edad" },
                {
                  type: "number",
                  min: 0,
                  max: 100,
                  message: "Edad debe ser entre 0 y 100",
                },
              ]}
            >
              <InputNumber
                min={0}
                max={100}
                style={{ width: "100%" }}
                controls={false}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Correo"
              name="email"
              rules={[
                { required: true, message: "Por favor ingresa el correo" },
                { type: "email", message: "Correo no válido" },
              ]}
            >
              <Input placeholder="ejemplo@gmail.com" />
            </Form.Item>

            <Form.Item label="Apellido" name="lastname" rules={nameRules}>
              <Input
                placeholder="Apellido"
                onKeyPress={(e) => {
                  const char = e.key;
                  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]$/.test(char)) {
                    e.preventDefault();
                  }
                }}
                onPaste={(e) => {
                  const pastedText = e.clipboardData.getData("text");
                  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(pastedText)) {
                    e.preventDefault();
                  }
                }}
              />
            </Form.Item>

            <Form.Item
              label="Estado"
              name="status"
              rules={[{ required: true, message: "Selecciona un estado" }]}
            >
              <Select>
                <Option value="active">Activo</Option>
                <Option value="inactive">Inactivo</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
}
