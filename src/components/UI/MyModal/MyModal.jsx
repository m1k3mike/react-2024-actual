import React from "react";
import cl from "./MyModal.module.css";
import { CSSTransition } from "react-transition-group";

const MyModal = ({ children, visible, setVisible }) => {
  const rootClasses = [cl.myModal];
  if (visible) {
    rootClasses.push(cl.active);
  }

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <CSSTransition in={visible} timeout={500} classNames="modal" unmountOnExit>
      <div className={rootClasses.join(" ")} onClick={closeModal}>
        <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </CSSTransition>
  );
};

export default MyModal;
