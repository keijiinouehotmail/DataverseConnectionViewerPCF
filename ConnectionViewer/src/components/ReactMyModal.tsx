import { getTheme, mergeStyleSets } from '@fluentui/react';
import * as React from 'react';

export interface IReactMyModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  hideModal: () => void;
}

/**
 * Customized version of controle like the React standard "Modal". 
 * It is not a Modal that covers the entire page, but a Modal that covers only a certain div.
 */
export const ReactMyModal: React.FunctionComponent<IReactMyModalProps> = (props: IReactMyModalProps) => {
  const [isModalOpen, setIsModalOpen] = React.useState(props.isOpen);
  const outerClicked = () => {
    props.hideModal();
  };

  const innerClicked = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
  };

  React.useEffect(() => {
    if (props.isOpen) setIsModalOpen(true);
    else setIsModalOpen(false);
  }, [isModalOpen, props.isOpen]);

  return (
    (isModalOpen) && (
      <div className={contentStyles.outer} onClick={outerClicked} >
        <div className={contentStyles.inner} onClick={innerClicked} >
          {props.children}
        </div>
      </div>
    ) ||
    null
  );
};

const theme = getTheme();
const contentStyles = mergeStyleSets({
  outer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    pointerEvents: 'all',
    display: 'grid',
    placeItems: 'center',
    overflow: 'auto',
  },
  inner: {
    width: 'calc(100% - 80px)',
    minWidth: '600px',
    height: '80%',
    backgroundColor: theme.palette.white,
    margin: 'auto',
    overflowY: 'auto',
    boxShadow: 'rgba(0, 0, 0, 0.22) 0px 25.6px 57.6px 0px, rgba(0, 0, 0, 0.18) 0px 4.8px 14.4px 0px',
    borderRadius: '2px',
    boxSizing: 'border-box',
    borderTop: '4px solid ' + theme.palette.themePrimary,
  },
});