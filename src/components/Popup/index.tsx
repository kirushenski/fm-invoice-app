import React from 'react'
import Modal, { Props as ReactModalProps } from 'react-modal'

export interface PopupProps extends ReactModalProps {
  heading: React.ReactNode
  children: React.ReactNode
  isSidebar?: boolean
}

// TODO Fix component inside Storybook (id conflict)

const Popup = ({ heading, children, isSidebar = false, id = 'popup', ...props }: PopupProps) => {
  return (
    <Modal
      bodyOpenClassName={null}
      overlayClassName={{
        base: `popup-overlay${isSidebar ? ' popup-overlay--sidebar' : ''}`,
        beforeClose: 'popup-overlay--before-close',
        afterOpen: 'popup-overlay--after-open',
      }}
      className={{
        base: `popup-content${isSidebar ? ' popup-content--sidebar' : ''}`,
        beforeClose: 'popup-content--before-close',
        afterOpen: 'popup-content--after-open',
      }}
      aria={{ labelledby: id }}
      closeTimeoutMS={isSidebar ? 1000 : 300}
      {...props}
    >
      <div
        className={`${isSidebar ? 'max-w-sidebar-mobile lg:max-w-sidebar pt-8 md:pt-14' : 'max-w-popup p-8 md:p-12'}`}
      >
        <div id={id} className={`text-popup font-bold ${isSidebar ? 'mb-6 md:mb-12 sidebar-paddings' : 'mb-3'}`}>
          {heading}
        </div>
        {children}
      </div>
    </Modal>
  )
}

Modal.setAppElement('#___gatsby')

export default Popup
