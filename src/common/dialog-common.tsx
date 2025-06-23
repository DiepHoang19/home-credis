import type { DialogProps } from "@mui/material/Dialog";

import React, { useId } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import FormProvider from "./form-provider";
import ButtonCommon from "./button-common";
import LoadingButtonCommon from "./loading-button";

interface DialogCommonProps extends DialogProps {
  children?: any;
  onClose?: () => void;
  onSubmit?: () => void;
  title: string;
  content?: string;
  submitText?: string;
  closeText?: string;
  footerAction?: boolean;
  isLoading?: boolean;
  submitForm?: boolean;
  methods?: any;
  onSubmitForm?: any;
  color?:
    | "DEFAULT"
    | "PRIMARY"
    | "SECONDARY"
    | "INFO"
    | "SUCCESS"
    | "WARNING"
    | "ERROR";
}

function DialogCommon(props: Readonly<DialogCommonProps>) {
  const {
    onSubmit,
    onClose,
    title,
    content,
    children,
    footerAction,
    closeText,
    submitText,
    isLoading,
    submitForm,
    methods,
    onSubmitForm,
    open,
    color,
  } = props;

  const generateId = useId();

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 2,
          bgcolor: "background.paper",
          backgroundImage: "none",
          color: "text.primary",
          boxShadow: "rgba(0, 0, 0, 0.24) -40px 40px 80px -8px",
          transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          overflowY: "auto",
          m: 2,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          maxHeight: "calc(100% - 64px)",
          minWidth: "20%",
        },
      }}
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id={`alert-dialog-title${generateId}`}
        sx={{ fontWeight: "600" }}
      >
        {title}
      </DialogTitle>
      {submitForm ? (
        <FormProvider methods={methods} onSubmitForm={onSubmitForm}>
          <DialogContent>
            <DialogContentText
              id={`alert-dialog-description${generateId}`}
              sx={{ fontWeight: "500" }}
            >
              {children}
            </DialogContentText>
          </DialogContent>
          {footerAction && (
            <DialogActions sx={{ padding: "15px", mb: 1 }}>
              {closeText && (
                <ButtonCommon
                  variant="outlined"
                  title={closeText}
                  color="primary"
                  onClick={onClose}
                />
              )}
              {submitText && (
                <LoadingButtonCommon
                  title={submitText}
                  loading={isLoading}
                  onClick={onSubmit}
                />
              )}
            </DialogActions>
          )}
        </FormProvider>
      ) : (
        <>
          <DialogContent>
            <DialogContentText
              id={`alert-dialog-description${generateId}`}
              sx={{ fontWeight: "500" }}
            >
              {content || children}
            </DialogContentText>
          </DialogContent>
          {footerAction && (
            <DialogActions sx={{ padding: "15px", mb: 1 }}>
              {closeText && (
                <ButtonCommon
                  variant="outlined"
                  title={closeText}
                  color="error"
                  onClick={onClose}
                />
              )}
              {submitText && (
                <LoadingButtonCommon
                  title={submitText}
                  color={color}
                  loading={isLoading}
                  onClick={onSubmit}
                />
              )}
            </DialogActions>
          )}
        </>
      )}
    </Dialog>
  );
}

export default DialogCommon;
