/**
 * @file utility files that manages DOM manipulation for the tour guide
 * React virtual DOM implementation is leveraged to inject the DOM into the Modal
 * However more low level DOM manipulation technique was leveraged for dynamically generating and copying highlighted
 * elements into the modal as a corresponding react implementation will be slower, more complex  and more memory intensive
 */

import HTMLTourContent from "./tourHTML";
import { TourGuide } from "./tour.types";

const APP_ROOT = document.getElementById("root") as HTMLElement;
const MODAL_ROOT = document.getElementById("modal-root") as HTMLElement;

type ElementRectangle = {
  top: number;
  bottom: number;
  left: number;
  height: number;
  width?: number;
};

/**
 * @function  modifyTourStyleToMatchHighlightedElement associate current tour with the current
 * highlighted element, the essence of this is to calculate the placement of the tour guide
 * @param { ElementRectangle } clonedElementRect the highlighted element rectangular position on the DOM
 * @param { HTMLElement } tour reference to the tour guide
 * @param { TourGuide } currentItem the current object of the tour
 * @param { TourGuide[] } tourGuideReferenceArray all the objects contained in the tour
 */
const modifyTourStyleToMatchHighlightedElement = (
  clonedElementRect: ElementRectangle,
  tour: HTMLElement,
  currentItem: TourGuide,
  tourGuideReferenceArray: TourGuide[]
) => {
  const { top, bottom, left, height } = clonedElementRect;

  const modalHeight = MODAL_ROOT.scrollHeight;
  const tourHeight = tour.offsetHeight + 20;
  const tourWidth = tour.offsetWidth + 20;
  const windowWidth = Math.max(
    window.innerWidth,
    document.documentElement.clientWidth,
    document.body.clientWidth
  );

  let tourPlacementTop, tourPlacementLeft;

  // Prevent tour guide from overflowing at the top of the page
  if (top - tourHeight <= 10) {
    tourPlacementTop = bottom + 20;
  }
  // prevent tour guide from overflowing into really long dom element
  if (top + 5 + tourHeight <= top + height) {
    tourPlacementTop = bottom + 20;
  } else {
    tourPlacementTop = top + height + 20;
  }

  // check to see if the tour will overflow at the bottom and make corrections
  if (tourHeight + height + top >= modalHeight - 100) {
    tourPlacementTop = top - (tourHeight + 220);
  }

  if (tourWidth + left >= windowWidth) {
    tourPlacementLeft = left - tourWidth / 2;
    while (
      tourPlacementLeft + tourWidth > windowWidth &&
      tourPlacementLeft > 0
    ) {
      tourPlacementLeft = tourPlacementLeft - 100;
    }
  } else {
    tourPlacementLeft = left;
  }

  if (left <= 10) {
    tourPlacementLeft = left + tourWidth / 2;
  }

  tour.innerHTML = HTMLTourContent({
    text: currentItem.content,
    badge: currentItem.position + 1,
    currentItem,
    tourGuideReferenceArray,
  });

  tour.style.cssText = `left: ${tourPlacementLeft}px; top: ${tourPlacementTop}px; `;
};

/**
 * @function AppendHighlightedElementToModal copy the element you want to highlight for tour
 * and then append it onto a modal and pass in a background color of white so it appears highlighted
 * @param { DONElement } clonedElement - the element to highlight
 * @param { Object } rect - the highlighted element rectangular position on the DOM
 * @param { DOMElement } MODAL_ROOT - reference to the Modal DOm element
 * @param { function } onNext - callback method to navigate to next tour item
 * @param { function } onPrev - callback method to navigate to previous tour item
 * @param { function } onClose - callback method to close the modal
 * @param { Object } currentItem - The current selected item on the tour guid
 * @param { Object[] } tourGuideReferenceArray - all the objects contained in the tour
 */
const appendHighlightedElementToModal = (
  clonedElement: HTMLElement,
  clonedElementRect: ElementRectangle,
  MODAL_ROOT: HTMLElement,
  onNext: () => void,
  onPrev: () => void,
  onClose: () => void,
  currentItem: TourGuide,
  tourGuideReferenceArray: TourGuide[]
) => {
  if (!clonedElement) {
    return;
  }
  const { top, left, width, height } = clonedElementRect;
  const element = document.createElement("div");
  const appReference = APP_ROOT.lastElementChild;
  const appClassList = appReference ? appReference.classList : [];

  // add the app class to any child of the modal to maintain the parent class relationship
  // in terms of defining inherited styles
  appClassList.forEach((className: string) => {
    element.classList.add(className);
  });

  // Reshape position the cloned element to fit exactly where its sibling was sitting on the DOM
  clonedElement.style.cssText = `overflow:hidden; cursor: disabled; top: ${top}px; left: ${left}px; width: ${width}px;  height:${height}px;  position:absolute;`;
  clonedElement.classList.add("tour-overlay-element");
  element.appendChild(clonedElement);

  MODAL_ROOT.appendChild(element);
  const tour = document.getElementById("tour") || document.createElement("div");
  tour.classList.add("tour-guide");
  tour.setAttribute("id", "tour");
  element.appendChild(tour);

  modifyTourStyleToMatchHighlightedElement(
    clonedElementRect,
    tour,
    currentItem,
    tourGuideReferenceArray
  );

  const nextButton = document.getElementById("next");
  const prevButton = document.getElementById("prev");
  const closeButton = document.getElementById("close");

  nextButton && nextButton.addEventListener("click", onNext);
  prevButton && prevButton.addEventListener("click", onPrev);
  closeButton && closeButton.addEventListener("click", onClose);
};

const updateClassListWhenModalIsOpen = () => {
  // when modal is toggled opened
  MODAL_ROOT.classList.add("tour-modal-open");
  MODAL_ROOT.classList.remove("tour-modal-close");
};

const updateClassListWhenModalIsClosed = () => {
  // when modal is toggled close
  MODAL_ROOT.classList.remove("tour-modal-open");
  MODAL_ROOT.classList.add("tour-modal-close");
};

/**
 * @function removeAllModalDescendants removes all descendants except the tour
 * we leave the tour so as to make sure our animation runs smooth
 */
const removeAllModalDescendants = () => {
  let child = MODAL_ROOT.lastElementChild;
  const tourElement = child && (child.id === "tour" || child.id === "dismiss");

  while (child && !tourElement) {
    MODAL_ROOT.removeChild(child);
    child = MODAL_ROOT.lastElementChild;
  }
};

export {
  removeAllModalDescendants,
  updateClassListWhenModalIsClosed,
  updateClassListWhenModalIsOpen,
  appendHighlightedElementToModal,
  APP_ROOT,
  MODAL_ROOT,
};
