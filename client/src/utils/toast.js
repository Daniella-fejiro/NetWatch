import toast from "react-hot-toast";
import React from "react";
import {
  FiCheckCircle,
  FiXCircle,
  FiAlertTriangle,
  FiInfo,
} from "react-icons/fi";

const baseStyle = {
  background: "#083138",
  color: "#ffffff",
  padding: "14px 18px",
};

export const showSuccess = (message) => {
  toast.success(message, {
    icon: React.createElement(FiCheckCircle, {
      className: "text-green-500 text-xl",
    }),
    style: {
      ...baseStyle,
      borderLeft: "4px solid #22C55E",
    },
  });
};

export const showError = (message) => {
  toast.error(message, {
    icon: React.createElement(FiXCircle, {
      className: "text-red-500 text-xl",
    }),
    style: {
      ...baseStyle,
      borderLeft: "4px solid #EF4444",
    },
  });
};

export const showWarning = (message) => {
  toast(message, {
    icon: React.createElement(FiAlertTriangle, {
      className: "text-amber-500 text-xl",
    }),
    style: {
      ...baseStyle,
      borderLeft: "4px solid #F59E0B",
    },
  });
};

export const showInfo = (message) => {
  toast(message, {
    icon: React.createElement(FiInfo, {
      className: "text-cyan-500 text-xl",
    }),
    style: {
      ...baseStyle,
      borderLeft: "4px solid #00D9FF",
    },
  });
};