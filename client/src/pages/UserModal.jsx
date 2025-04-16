import React from "react";
import { Modal, Button } from "antd";
import UserForm from "./UserForm";

export default function UserModal({ visible, onClose, onSubmit, initialValues, usuarios }) {
  return (
    <Modal
      open={visible}
      footer={null}
      onCancel={onClose}
      destroyOnClose
      centered
      width={572}
      closable={false}
      styles={{
        body: {
          padding: 0,
        },
      }}
      style={{
        borderRadius: 8,
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#FFFFFF",
          borderBottom: "1px solid #F0F0F0",
          padding: "12px 24px",
        }}
      >
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>
          {initialValues ? "Editar Usuario" : "Agregar Usuario"}
        </h3>
        <Button type="text" onClick={onClose} style={{ fontSize: 16, lineHeight: 1 }}>
          ✕
        </Button>
      </div>

      {/* Content */}
      <div style={{ padding: "24px 24px 0 24px" }}>
        <UserForm
          initialValues={initialValues}
          onSubmit={onSubmit}
          usuarios={usuarios}
        />
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          background: "#FFFFFF",
          borderTop: "1px solid #F0F0F0",
          padding: "12px 24px",
        }}
      >
        <Button
          type="primary"
          htmlType="submit"
          form="user-form"
          style={{ minWidth: 140 }}
        >
          {initialValues ? "Editar Usuario" : "Agregar Usuario"}
        </Button>
      </div>
    </Modal>
  );
}
