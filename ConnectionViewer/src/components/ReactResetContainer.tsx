import * as React from 'react';
import { IButtonStyles, PrimaryButton, getTheme, mergeStyleSets } from '@fluentui/react';
import { ConnectionViewer } from '../ConnectionViewer';

export interface IReactResetContainerProps {
  hideModal: () => void;
}

export const ReactResetContainer: React.FunctionComponent<IReactResetContainerProps> = (props: IReactResetContainerProps) => {
  const onClick = () => {
    setTimeout(() => ConnectionViewer.cv.resetConnectionViewer(), 200); // Reload after a short pause. While it feels good.
    props.hideModal();
  };

  return (
    <div className={contentStyles.body}>
      <ul className={contentStyles.resetContainer}>
        <li className={contentStyles.li} key='li-0'>
          <PrimaryButton
            text={ConnectionViewer.cv.resStr('ResetAndShowAgain')}
            styles={iconButtonStyles}
            onClick={onClick} />
        </li>
      </ul>
    </div>
  );
};

const contentStyles = mergeStyleSets({
  body: {
    margin: '10px',
    fontSize: '1.0em',
    textAlign: 'left',
  },
  resetContainer: {
    margin: 0,
    padding: '10px',
    listStyleType: 'none',
  },
  li: {
    display: 'block',
    position: 'relative',
    overflow: 'visible',
  },
});

const theme = getTheme();
const iconButtonStyles: Partial<IButtonStyles> = {
  root: {
    color: theme.palette.neutralPrimary,
    backgroundColor: theme.palette.themeLighter,
    maxWidth: '',
    maxHeight: '',
    margin: '4px',
    padding: '0px',
    textAlign: 'left',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
    backgroundColor: theme.palette.themeLighterAlt,
  }
};
