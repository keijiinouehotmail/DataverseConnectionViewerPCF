import * as React from 'react';
import {
  getTheme,
  mergeStyleSets,
  IIconProps,
  FontWeights,
  IStackStyles,
} from '@fluentui/react';
import { IconButton, IButtonStyles } from '@fluentui/react/lib/Button';
import { ReactOptionsPivot } from './ReactOptionsPivot';
import { ReactMyModal } from './ReactMyModal';
import { ConnectionViewer } from '../ConnectionViewer';

export interface IReactOptionsModalProps {
  userLanguageId: number;
  isModalOpen: boolean;
  hideModal: () => void;
}

export const ReactOptionsModal: React.FunctionComponent<IReactOptionsModalProps> = (props: IReactOptionsModalProps) => {

  return (
    <ReactMyModal
      isOpen={props.isModalOpen}
      hideModal={props.hideModal}
    >
      <div className={contentStyles.header}>
        {ConnectionViewer.cv.resStr('UserOptions')}
        <IconButton
          styles={iconButtonStyles}
          iconProps={cancelIcon}
          ariaLabel="Close modal"
          onClick={props.hideModal}
        />
      </div>
      <ReactOptionsPivot userLanguageId={props.userLanguageId} hideModal={props.hideModal} />
    </ReactMyModal>
  );
};

const cancelIcon: IIconProps = { iconName: 'Cancel' };

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    width: '80%',
  },
  header: {
    display: 'flex',
    fontWeight: FontWeights.bold,
    margin: '10px',
    fontSize: '1.5em',
  },
});
const iconButtonStyles: Partial<IButtonStyles> = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: 'auto',
    marginTop: '4px',
    marginRight: '2px',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};
const stackStyles: IStackStyles = {
  root: {
    height: 150,
  },
};
