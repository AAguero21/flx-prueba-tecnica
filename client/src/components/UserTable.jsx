import { Table, Button, Tag } from "antd";
import React, { useState, useEffect, useCallback, useRef } from 'react';

export default function UserTable({ usuarios, onEdit, onDelete }) {
  const [sortedData, setSortedData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const lastSorterRef = useRef({}); // Referencia para mantener el ordenamiento actual

  // Función para comparar los valores numéricos dentro de las cadenas
  const extractNumbers = (str) => {
    const numbers = [];
    const regex = /(\d+)/g;
    let match;
    while ((match = regex.exec(str)) !== null) {
      numbers.push(parseInt(match[0], 10));
    }
    return numbers;
  };

  // Maneja el cambio en la tabla, tanto para ordenar como para paginar
  const handleTableChange = useCallback((pagination, filters, sorter) => {
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });

    lastSorterRef.current = sorter; // Guardamos el último sorter usado

    let data = [...usuarios];

    // Ordenamiento del campo "username" con comparación de números
    if (sorter?.columnKey === "username") {
      data.sort((a, b) => {
        const usernameA = a.username.toLowerCase();
        const usernameB = b.username.toLowerCase();

        const numsA = extractNumbers(usernameA);
        const numsB = extractNumbers(usernameB);

        // Comparar números primero, luego las cadenas
        for (let i = 0; i < Math.min(numsA.length, numsB.length); i++) {
          if (numsA[i] !== numsB[i]) {
            return numsA[i] - numsB[i];
          }
        }

        return usernameA.localeCompare(usernameB);
      });

      if (sorter.order === "descend") {
        data.reverse();
      }
    }

    // Ordenamiento del campo "status" por orden alfabético
    if (sorter?.columnKey === "status") {
      data.sort((a, b) =>
        sorter.order === "ascend"
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status)
      );
    }

    // Aplicamos la paginación en base al offset
    const { current, pageSize } = pagination;
    const offset = (current - 1) * pageSize;
    const limit = pageSize;
    const paginatedData = data.slice(offset, offset + limit);

    setSortedData(paginatedData);
  }, [usuarios]); 

  useEffect(() => {
    // los datos se van a cagar correctamente cuando se inicia el componente 
    handleTableChange(
      { current: pagination.current, pageSize: pagination.pageSize },
      {},
      lastSorterRef.current || {}
    );
  }, [usuarios, handleTableChange, pagination]);
   
  // Definición de las columnas de la tabla
  const columns = [
    {
      title: "Nombre de Usuario",
      dataIndex: "username",
      key: "username",
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Apellido",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      sorter: true,
      showSorterTooltip: false,
      render: (status) =>
        status === "active" ? (
          <Tag color="green">Activo</Tag>
        ) : (
          <Tag color="red">Inactivo</Tag>
        ),
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => onEdit(record)}
            style={{ marginRight: 8 }}
          >
            Editar
          </Button>
          <Button type="link" danger onClick={() => onDelete(record)}>
            Eliminar
          </Button>
        </>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      dataSource={sortedData}
      columns={columns}
      onChange={handleTableChange}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: usuarios.length,
        showSizeChanger: false,
        onChange: (page, pageSize) => {
          setPagination({ current: page, pageSize });
        },
      }}
    />
  );
}
