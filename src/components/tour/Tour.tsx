/**
 * @file ModalComponent this is a react implementation of portal
 * that creates a modal for the tour guide.
 */
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import tourGuideReferenceArray from "../../data/tourReference.json";
import "./tour.css";
import {
  removeAllModalDescendants,
  updateClassListWhenModalIsClosed,
  updateClassListWhenModalIsOpen,
  appendHighlightedElementToModal,
  MODAL_ROOT,
} from "./utils";

const HAS_VIEWED_TOUR = "viewed_tour";

type Props = {
  open: Boolean;
  toggleModal: () => void;
  children?: React.ReactNode;
};

function Tour(props: Props) {
  const { open, toggleModal } = props;
  if (!tourGuideReferenceArray || !tourGuideReferenceArray.length) {
    throw new Error(
      "You must provide a reference to the tour guide as a reference array this could be a json or a plain javascript array of objects"
    );
  }

  if (!toggleModal) {
    throw new Error(
      ' You must pass a callback method "toggleModal" that closes the modal when you hit the close button '
    );
  }

  const [currentItem, setSelectedItem] = useState(tourGuideReferenceArray[0]);

  const onNext = () => {
    if (currentItem.position + 1 < tourGuideReferenceArray.length) {
      setSelectedItem(tourGuideReferenceArray[currentItem.position + 1]);
    }
  };

  const onPrev = () => {
    if (currentItem.position - 1 >= 0) {
      setSelectedItem(tourGuideReferenceArray[currentItem.position - 1]);
    }
  };

  const onClose = () => {
    updateClassListWhenModalIsClosed();
    setSelectedItem(tourGuideReferenceArray[0]);
    toggleModal();
  };

  const preventDocumentScrollWhenModalIsOpen = () => {
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
  };

  const preserveDocumentScrollWhenModalIsClosed = () => {
    const scrollY = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  };

  // effect manages the opening and closing of the modal
  useEffect(() => {
    if (open) {
      localStorage.setItem(HAS_VIEWED_TOUR, String(true));
      updateClassListWhenModalIsOpen();
      preventDocumentScrollWhenModalIsOpen();
    } else {
      updateClassListWhenModalIsClosed();
      preserveDocumentScrollWhenModalIsClosed();
    }
  }, [open]); // Only run this effect when modal has just being toggled

  // effect manages the cloning and injection of the highlighted element into the DOM
  useEffect(() => {
    if (document.readyState === "complete") {
      const { nodeReference } = currentItem;
      let currentNode: HTMLElement;
      if (typeof nodeReference == "string") {
        currentNode = document.getElementById(nodeReference) as HTMLElement;
      } else {
        currentNode = nodeReference;
      }
      if (!currentNode) {
        return;
      }

      const cloned = currentNode.cloneNode(true) as HTMLElement;
      const rect = currentNode.getBoundingClientRect();
      currentNode &&
        appendHighlightedElementToModal(
          cloned,
          rect,
          MODAL_ROOT,
          onNext,
          onPrev,
          onClose,
          currentItem,
          tourGuideReferenceArray
        );
    }
    return () => {
      // clean up when component unMounts
      removeAllModalDescendants();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentItem, document.readyState, tourGuideReferenceArray]);

  // cleanUp Modal when component is unMounting
  useEffect(() => {
    return () => {
      let child = MODAL_ROOT.lastElementChild;
      // cleanup remove all event listeners
      const nextButton = document.getElementById("next");
      const prevButton = document.getElementById("prev");
      const closeButton = document.getElementById("close");

      nextButton && nextButton.removeEventListener("click", onNext);
      prevButton && prevButton.removeEventListener("click", onPrev);
      closeButton && closeButton.removeEventListener("click", onClose);

      while (child && child.id !== "dismiss") {
        MODAL_ROOT.removeChild(child);
        child = MODAL_ROOT.lastElementChild;
      }
      updateClassListWhenModalIsClosed();
      toggleModal();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return MODAL_ROOT && createPortal(props.children, MODAL_ROOT);
}

export default Tour;
