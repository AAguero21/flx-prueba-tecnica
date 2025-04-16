import React, { useEffect, useState } from "react";
import {Button, Space, message, Input, Select, Breadcrumb} from "antd";
import UserTable from "../components/UserTable";
import UserModal from "./UserModal";
import DeleteUserModal from "./DeleteUserModal";

import {
  getUsuarios,
  deleteUsuario,
  createUsuario,
  updateUsuario,
} from "../services/userService";

const { Search } = Input;
const { Option } = Select;

export default function UserList() {
  const [usuarios, setUsuarios] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const fetchUsuarios = async () => {
    const data = await getUsuarios();
    setUsuarios(data);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleEdit = async (user) => {
    setEditingUser(user);
    setOpenModal(true);
  };

  const handleCreate = () => {
    setEditingUser(null);
    setOpenModal(true);
  };

  const handleSave = async (values) => {
    try {
      if (editingUser) {
        await updateUsuario(editingUser.id, values);
        message.success("Usuario actualizado con éxito");
      } else {
        await createUsuario(values);
        message.success("Usuario creado con éxito");
      }
      setOpenModal(false);
      fetchUsuarios();
    } catch (error) {
      message.error("Hubo un problema al guardar el usuario");
    }
  };

  const filteredUsuarios = usuarios.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.lastname.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter ? user.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ maxWidth: 1088, margin: "0 auto", padding: "15px" }}>
      <Breadcrumb style={{ marginBottom: 16, marginLeft: 2 }}>
        <Breadcrumb.Item>Usuarios</Breadcrumb.Item>
        <Breadcrumb.Item>Listado de usuarios</Breadcrumb.Item>
      </Breadcrumb>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 20,
        }}
      >
        <Space>
          <Search
            placeholder="Buscar por nombre o apellido"
            allowClear
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 260 }}
          />
          <Select
            placeholder="Filtrar por estado"
            allowClear
            onChange={(value) => setStatusFilter(value)}
            style={{ width: 180 }}
          >
            <Option value="active">Activo</Option>
            <Option value="inactive">Inactivo</Option>
          </Select>
        </Space>

        <Button type="primary" onClick={handleCreate}>
          Agregar Usuario
        </Button>
      </div>

      <UserTable
        usuarios={filteredUsuarios}
        onEdit={handleEdit}
        onDelete={(user) => {
          setUserToDelete(user);
          setIsDeleteModalVisible(true);
        }}
      />

      <UserModal
        usuarios={usuarios}
        visible={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSave}
        initialValues={editingUser}
      />

      <DeleteUserModal
        visible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        onDelete={async () => {
          if (userToDelete) {
            await deleteUsuario(userToDelete.id);
            message.success("Usuario eliminado.");
            fetchUsuarios();
            setIsDeleteModalVisible(false);
            setUserToDelete(null);
          }
        }}
        username={userToDelete?.username}
      />
    </div>
  );
}
