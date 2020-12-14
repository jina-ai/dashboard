/**
 * @file
 * returns a string representation of DOM elements to be injected into the tour guide
 */

import { TourGuide } from "./tour.types";
import githubIcon from "./github-svgrepo-com.svg";

type TourProps = {
  text: string;
  badge: number;
  currentItem: TourGuide;
  tourGuideReferenceArray: TourGuide[];
};

export const HTMLTourContent = ({
  text,
  badge,
  currentItem,
  tourGuideReferenceArray,
}: TourProps) =>
  `
     <span class='tour-badge'>${badge}</span>
     <button id='close' class='tour-close-button'>
        <svg viewBox='0 0 9.1 9.1'>
            <path fill='currentColor' d='M5.9 4.5l2.8-2.8c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L4.5 3.1 1.7.3C1.3-.1.7-.1.3.3c-.4.4-.4 1 0 1.4l2.8 2.8L.3 7.4c-.4.4-.4 1 0 1.4.2.2.4.3.7.3s.5-.1.7-.3L4.5 6l2.8 2.8c.3.2.5.3.8.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L5.9 4.5z'>
            </path>
        </svg>
     </button>
     <div class='tour-content'>
       <p>${text}</p>
       <div class='tour-github-documentation'>
           <img src=${githubIcon} alt='github-icon'>
           <a href='https://github.com/jina-ai/dashboard' target='blank'>More guides on github</a>
       </div>
       <div class='tour-data-row'>
          <div class='tour-left-svg'>
              <button id='prev' class='tour-svg' data-tour-elem='left-arrow'>
                  <svg viewBox='0 0 18.4 14.4'>
                      <path d='M1.4 7.2h16M7.6 1L1.4 7.2l6.2 6.2' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10'>
                      </path>
                  </svg>
              </button>
          </div>
          <div class='tour-elements-feedback'>
              ${tourGuideReferenceArray
                .map((item) => {
                  if (item.position === currentItem.position) {
                    return "<button data-tour-elem='dot' class='tour-highlight-selected tour-highlight'></button>";
                  }
                  return "<button data-tour-elem='dot' class='tour-highlight'></button>";
                })
                .join("")}
          </div>
          <div class='tour-right-svg'>
              <button id='next' class='tour-svg' data-tour-elem='right-arrow'>
                  <svg viewBox='0 0 18.4 14.4'>
                      <path d='M17 7.2H1M10.8 1L17 7.2l-6.2 6.2' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10'>
                      </path>
                  </svg>
              </button>
          </div>
       </div>
     </div>
  `;
export default HTMLTourContent;
