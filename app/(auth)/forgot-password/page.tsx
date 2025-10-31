"use client";
import React from "react";

export default function ForgotPasswordPage() {
  const containerStyle: React.CSSProperties = {
    maxWidth: 400,
    margin: "0 auto",
    padding: 20,
    height: "100vh",
    backgroundColor: "#f9f9f9",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
     position: "relative",
  };

  const inputStyle: React.CSSProperties = {
    width: "80%",
    padding: "10px",
    fontSize: "16px",
    marginBottom: "12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    color:"black",
  };

  const buttonStyle: React.CSSProperties = {
    width: "80%",
    padding: "12px",
    fontSize: "16px",
    color: "white",
    backgroundColor: "#ffce00",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  };


   const backButtonStyle: React.CSSProperties = {
    position: "absolute",
    top: 20,
    left: 20,
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    color:"black",
  };

  const handleBack = () => {
    window.history.back();
  };
  return (
    <div style={containerStyle}>
      <h1>パスワードを変更</h1>
      <button style={backButtonStyle} onClick={handleBack}>
        ←
      </button>
      <input type="email" placeholder="メールアドレス" style={inputStyle} />
      <button style={buttonStyle}>送信</button>
    </div>
  );
}