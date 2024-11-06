import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to right, #ff6f61, #ff8a5c);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background: #2d2d2d;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
`;

export const Input = styled.input`
  padding: 12px;
  margin-bottom: 12px;
  border: none;
  border-radius: 4px;
  background-color: #fff;
  font-size: 16px;
`;

export const Button = styled.button`
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
`;

export const OptionGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

export const OptionInput = styled.input`
  margin-right: 8px;
`;

export const OptionLabel = styled.label`
  font-size: 16px;
  margin-right: 16px;
`;

export const PopupOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Popup = styled(motion.div)`
  background-color: #ff8a5c;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  color: white;
`;

export const PopupMessage = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
`;

export const PopupButton = styled.button`
  padding: 10px 20px;
  background-color: #ffffff;
  color: #ff6f61;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
`;


