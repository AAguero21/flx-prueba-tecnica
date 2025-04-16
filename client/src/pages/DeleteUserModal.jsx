import React from "react";
import { Modal, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

export default function DeleteUserModal({ visible, onClose, onDelete, username }) {
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      closable={false}
      centered
      width={460}
      styles={{
        body: { padding: 0 }
      }}
      style={{ borderRadius: 8 }}
    >
      {/* Header */}
      <div style={{ borderBottom: "1px solid #f0f0f0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 24px",
          }}
        >
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Eliminar usuario</h3>
          <CloseOutlined onClick={onClose} style={{ cursor: "pointer", color: "#00000073" }} />
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "24px", fontSize: 14, color: "#595959" }}>
        ¿Está seguro que quiere eliminar el usuario{" "}
        <span style={{ color: "#d4380d", fontWeight: 500 }}>@{username}</span>?
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #f0f0f0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "10px 24px",
            gap: 8,
          }}
        >
          <Button onClick={onClose}>Cancelar</Button>
          <Button danger type="primary" onClick={onDelete}>
            Eliminar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
